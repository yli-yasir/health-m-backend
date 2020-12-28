var mongoose = require("mongoose");

function validateId(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }
  //The id is invalid, there is no use to search for it. No resource with the id exists.
  res.sendStatus(404);
}

module.exports = {validateId};