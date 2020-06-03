const express = require("express");
const mongo = require("../inMongo");
const Post = require("../models/Posts");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Router = express.Router;
const database = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function saltHash(based64Credentials) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(based64Credentials, salt);
}

function basicAuth(request, response, next) {
	// check for basic auth header
	const noAuth = !request.headers.authorization;
	if (noAuth || request.headers.authorization.indexOf("Basic ") === -1) {
		return response
			.status(401)
			.json({ message: "Missing Authorization Header" });
	}
	// decode user name and password
	const base64Credentials = request.headers.authorization.split(" ")[1];
	const credentials = Buffer.from(base64Credentials, "base64").toString(
		"ascii"
	);
	const [username, password] = credentials.split(":");

	// check username and password against database
	const user = database.checkUserNameAndPassword(username, password);
	if (user) {
		request.user = user;
		return next();
	} else {
		return response.status(401).json({
			message:
				"Basic Authentication failed: Invalid username or password."
		});
	}
}

function jwtAuth(request, response, next) {
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
	const user = database.getUserById(payload.userId);
	if (user) {
		request.user = user;
		return next();
	} else {
		return response.status(401).json({
			message: "JWT Authentication failed: Invalid username or password."
		});
	}
}

function createJWT(request, response) {
	// create JWT and send it back
	const payload = { userId: request.user.id };
	const token = jwt.sign(payload, config.get("jwtSecret"), {
		expiresIn: 1440
	});

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
