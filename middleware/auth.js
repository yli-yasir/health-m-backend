const userManager = require("../db/userManager");
const jwt = require("jsonwebtoken");
const prettyLogger = require("../utils/prettyLogger");

const AUTH_COOKIE_NAME = "tkn";
const AUTH_COOKIE_SETTING = {
  httpOnly: true,
  secure: process.env.SECURE_COOKIES === "true" ? true : false,
};

async function authenticateUser(req, res, next) {
  let email = req.body.email;
  const password = req.body.password;

  // If a username and password are defined and of type string
  if (typeof email === "string" && typeof password === "string") {
    try {
      email = email.trim();
      const authResult = await userManager.authenticateUser(email, password);
      //If auth failed
      if (authResult.statusCode !== userManager.AUTH_SUCCESS) {
        return res.sendStatus(401);
      }
      //If auth succeeded pass control to next route after injecting req.user
      prettyLogger.logInfo('User authenticated!');
      req.user = { email: authResult.user.email };
      next();
    } catch (err) {
      next(err);
    }
  }
  //If email and password were not defined or not of type string
  else {
    res.sendStatus(400);
  }
}

function grantToken(req, res, next) {
  // Generate a token
  const token = jwt.sign(
    { id: req.user.id, name: req.user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1 day",
    }
  );

  // Set a cookie in the response with the token
  res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_SETTING);
  
  console.log('token granted.')
  // Pass control to the next route
  next();
}

function verifyToken(req, res, next) {
  const token = req.cookies["tkn"];
  console.log('verified', token);
  if (typeof token === "string") {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    res.sendStatus(401);
  }
}

function revokeToken(req, res, next) {
  res.clearCookie(AUTH_COOKIE_NAME, AUTH_COOKIE_SETTING);
  res.sendStatus(200);
}

module.exports = { authenticateUser, grantToken, verifyToken, revokeToken };
