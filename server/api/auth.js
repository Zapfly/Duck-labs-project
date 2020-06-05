const express = require("express");
//const mongo = require("../inMongo");
//const Post = require("../models/Posts");
const config = require("config");
//const { check, validationResult } = require("express-validator");
//const Router = express.Router;
//const database = require("../database/database");
const NodeCache = require("node-cache");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const accessToken = new NodeCache();

//Basic auth is cheching user email and password
async function basicAuth(request, response, next) {
	// check username and password against database
	const { email, password } = request.body;
	const user = await User.findOne({ email });
	if (!user) {
		return response.status(400).json({
			errors: [
				{ msg: "Authentication failed: Invalid username or password." }
			]
		});
	} else {
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return resquest.status(400).json({
				errors: [
					{
						msg:
							"Authentication failed: Invalid username or password."
					}
				]
			});
		} else {
			console.log("user checked from basic auth");
			next();
		}
	}
}

function jwtAuth(request, response, next) {
	console.log("from jwt function");

	// check for jwt auth header
	const noAuth = !request.headers.authorization;

	if (noAuth || request.headers.authorization.indexOf("Bearer ") === -1) {
		return response
			.status(401)
			.json({ message: "Missing Authorization Header" });
	}

	// pull out the jwt
	const token = request.headers.authorization.split(" ")[1];

	// verify the jwt
	const payload = jwt.verify(token, config.get("jwtSecret"));

	console.log(payload.user.id);
	//check if token was resently check
	if (accessToken.get(payload.user.id)) {
		if (accessToken.get(payload.user.id) == token) {
			return next();
		}
	} else {
		return response.status(401).json({
			message: "Your session has expired. Please sign up again."
		});
	}

	// const user = User.findById(payload.user.id);
	// console.log("*****73 do que ever see this?");
	// if (user) {
	// 	console.log("you are the user");
	// 	request.user = user;
	// 	return next();
	// } else {
	// 	return response.status(401).json({
	// 		message: "JWT Authentication failed: Invalid username or password."
	// 	});
	// }
}

async function createJWT(request, response) {
	console.log("from create jwt");
	const { email, password } = request.body;
	const user = await User.findOne({ email });

	// create JWT and send it back
	const payload = {
		user: {
			id: user.id
		}
	};
	const token = jwt.sign(payload, config.get("jwtSecret"), {
		expiresIn: 10800 // expeires in 3 hours
	});
	accessToken.set(user.id, token, 10800);

	return response.json({
		message: "login success",
		token: token
	});
}

module.exports = {
	basicAuth,
	jwtAuth,
	createJWT
};
