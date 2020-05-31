const express = require("express");

const Router = express.Router;

const database = require("../database/database");

const setupV1Routes = (apiRouter) => {
  // Controller Functions
  function findAllPosts(request, response) {
    let allPosts = database.findAllPosts();
    response.send(allPosts);
  }

  function addNewPost(request, response) {
    console.log("saving post", request.body);
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

  // const textParser = bodyParser.json()

  // Routing
  const v1Router = Router();
  v1Router.get("/posts", findAllPosts);
  v1Router.post("/addPost", addNewPost);
  v1Router.post("/clear", clearAllPosts);
  v1Router.post("/delete", deletePost);
  v1Router.post("/updatePost", updatePost);
  

  apiRouter.use("/v1", v1Router);
};

const apiRouter = Router();
setupV1Routes(apiRouter);

module.exports = apiRouter;
