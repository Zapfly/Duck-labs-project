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

//Basic auth is cheching user email and password
async function basicAuth(request, response, next) {
  // check for basic auth header
  // const noAuth = !request.headers.authorization;
  // if (noAuth || request.headers.authorization.indexOf("Basic ") === -1) {
  // 	return response
  // 		.status(401)
  // 		.json({ message: "Missing Authorization Header" });
  // }
  // // decode user name and password
  // const base64Credentials = request.headers.authorization.split(" ")[1];
  // const credentials = Buffer.from(base64Credentials, "base64").toString(
  // 	"ascii"
  // );
  // const [username, password] = credentials.split(":");

  // check username and password against database
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).json({
      errors: [{ msg: "Authentication failed: Invalid username or password." }],
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid username or password");
      return res.status(400).json({
        errors: [
          { msg: "Authentication failed: Invalid username or password." },
        ],
      });
    } else {
      console.log("user checked from basic auth");
      createJWT(user);
    }
  }
}

// function jwtAuth(request, response, next) {
//   // check for jwt auth header
//   const noAuth = !request.headers.authorization;
//   if (noAuth || request.headers.authorization.indexOf("Bearer ") === -1) {
//     return response
//       .status(401)
//       .json({ message: "Missing Authorization Header" });
//   }

//   // pull out the jwt
//   const token = request.headers.authorization.split(" ")[1];

//   // verify the jwt
//   const payload = jwt.verify(token, config.get("jwtSecret"));
//   const user = database.getUserById(payload.userId);
//   if (user) {
//     request.user = user;
//     return next();
//   } else {
//     return response.status(401).json({
//       message: "JWT Authentication failed: Invalid username or password.",
//     });
//   }
// }

// function verifyUserToken(request, response, next) {
//   //Get token from header
//   const token = request.header("x-auth-token");

//   //check if not token
//   if (!token) {
//     return response
//       .status(401)
//       .json({ message: "No token, authorization denieded" });
//   }

//   //verify token
//   try {
//     const decodedToken = jwt.verify(token, config.get("jwtSecret"));
//     request.user = decodedToken.user;
//     next();
//   } catch (error) {
//     return response.status(401).json({ message: "Invalid token" });
//   }
// }

function createJWT(request, response) {
  console.log("from create jwt");

  console.log(user);
  // create JWT and send it back
  const payload = {
    user: {
      id: request.user.id,
    },
  };
  const token = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 1440, // expeires in 24 hours
  });

  console.log(token);

  return response.json({
    message: "login success",
    token: token,
  });
}

module.exports = {
  basicAuth,
  // jwtAuth,
  createJWT,
};
