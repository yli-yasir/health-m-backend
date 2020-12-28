const userRepo = require("../db/userRepo");

const AUTH_COOKIE_NAME = "tkn";
const AUTH_COOKIE_SETTING = {
  httpOnly: true,
  secure: process.env.SECURE_COOKIES === "true" ? true : false,
};

async function authenticateUser(req, res, next) {
  let email = req.body.email;
  const password = req.body.password;
  // If a username and password are defined and of type string
  if (typeof email == "string" && typeof password !== "string") {
    try {
      email = email.trim();
      const authResult = userRepo.authenticateUser(email, password);
      //If auth failed
      if (authResult.statusCode !== userRepo.SUCCESS) {
        return res.sendStatus(401);
      }
      req.user = { email: authResult.user.email };
      next();
    } catch (err) {
      next(err);
    }
  }
  //If email and password were not defined and of type string
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
      expiresIn: "1h",
    }
  );

  // Set a cookie in the response with the token
  res.cookie(AUTH_COOKIE_NAME, AUTH_COOKIE_SETTING);

  // Pass control to the next route
  next();
}

function verifyToken(req, res, next) {
  const token = req.cookies["tkn"];
  if (typeof token === "string") {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    res.sendStatus(400);
  }
}

function revokeToken(req, res, next) {
  res.clearCookie(AUTH_COOKIE_NAME, AUTH_COOKIE_SETTING);
  res.sendStatus(200);
}

module.exports = { authenticateUser, grantToken, verifyToken, revokeToken };
