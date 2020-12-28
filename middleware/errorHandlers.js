const { ValidationError } = require("joi");

function handleValidationError(req, res, next, error) {
  if (error instanceof ValidationError) {
    prettyLogger.logError(error);
    res.sendStatus(400);
    return;
  }
  next(error);
}


module.exports = [handleValidationError];
