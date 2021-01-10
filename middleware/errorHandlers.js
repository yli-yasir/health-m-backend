const { ValidationError } = require("joi");
const { JsonWebTokenError } = require("jsonwebtoken");
const prettyLogger = require("../utils/prettyLogger");

function handleValidationError(error, req, res, next) {
  if (error instanceof ValidationError) {
    prettyLogger.logError(error);
    res.sendStatus(400);
    return;
  }
  next(error);
}

function handleAuthError(error,req,res,next){
  if (error instanceof JsonWebTokenError){
    prettyLogger.logError(error);
    res.sendStatus(401)
    return;
  }
  next(error);
}


module.exports = [handleValidationError,handleAuthError];
