const express = require("express");
//const mongo = require("../inMongo");
const Post = require("../models/Posts");
//const config = require("config");
const { check, validationResult } = require("express-validator");
const Router = express.Router;
const database = require("../database/database");
const jwt = require("jsonwebtoken");

const { basicAuth, jwtAuth, createJWT } = require("./auth");
const createUserInputValidation = require("./users");

const setupV1Routes = apiRouter => {
	// Controller Functions
	function findAllPosts(request, response) {
		let allPosts = database.findAllPosts();
		response.send(allPosts);
	}

	function addNewPost(request, response) {
		let post = new Post(request.body);
		console.log("saving post", request.body);
		// mongo.addPost(post);
		// await post.save();
		database.addPost(request.body);
		response.sendStatus(200);
	}

	function clearAllPosts(request, response) {
		database.clearAllPosts();
		response.sendStatus(200);
	}

	function deletePost(request, response) {
		database.deletePost(request.body.uid);
		response.sendStatus(200);
	}

	function updatePost(request, response) {
		database.updatePost(request.body);
		response.sendStatus(200);
	}

	function createUserDB(request, response) {
		let message = createUserInputValidation(request.body);
		response.status(200).json({ message: message });
	}

	// const textParser = bodyParser.json()

	// Routing
	const v1Router = Router();
	v1Router.get("/posts", findAllPosts);
	v1Router.post("/addPost", addNewPost);
	//v1Router.post("/addPost", jwtAuth, addNewPost);
	v1Router.post("/clear", clearAllPosts);
	v1Router.post("/delete", deletePost);
	v1Router.post("/updatePost", updatePost);
	v1Router.post("/login", basicAuth, createJWT);
	v1Router.post("/createUser", createUserDB);

	apiRouter.use("/v1", v1Router);
};

const apiRouter = Router();
setupV1Routes(apiRouter);

module.exports = apiRouter;
