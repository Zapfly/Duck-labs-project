const express = require("express");
const mongo = require("../inMongo");
const Post = require("../models/Posts");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Router = express.Router;
const database = require("../database/database");
const jwt = require("jsonwebtoken");

const setupV1Routes = (apiRouter) => {
  // Controller Functions
  function findAllPosts(request, response) {
    let allPosts = database.findAllPosts();
    response.send(allPosts);
  }

  async function addNewPost(request, response) {
    let post = new Post(request.body);
    console.log("saving post", request.body);
    // mongo.addPost(post);
    await post.save();
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
      return response
        .status(401)
        .json({
          message: "Basic Authentication failed: Invalid username or password.",
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
      return response
        .status(401)
        .json({
          message: "JWT Authentication failed: Invalid username or password.",
        });
    }
  }

  function createJWT(request, response) {
    // create JWT and send it back
    const payload = { userId: request.user.id };
    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 1440,
    });

    return response.json({
      message: "login success",
      token: token,
    });
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

  apiRouter.use("/v1", v1Router);
};

const apiRouter = Router();
setupV1Routes(apiRouter);

module.exports = apiRouter;
