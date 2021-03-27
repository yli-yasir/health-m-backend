const mongoose = require("mongoose");

const {trimmedString} = require("./schemaTypes");

const userSchema = new mongoose.Schema({
 email: trimmedString,
 password: trimmedString
});

module.exports = mongoose.model('user',userSchema);