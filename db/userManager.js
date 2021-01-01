const UserModel = require('./models/userModel');
const prettyLogger = require('../utils/prettyLogger');
const bcrypt = require('bcryptjs');

const NO_SUCH_USER = 50;
const INVALID_PASSWORD = 51;
const AUTH_SUCCESS= 52;

class AuthResult{
    constructor(user,statusCode){
        this.user = user;
        this.statusCode = statusCode
    }
}

async function authenticateUser(email,password){
        // Try to find the user.
        const authTargetUser = await UserModel.findOne({email});
        // If there is no user then respond with appropriate status code
        if (!authTargetUser) {
            prettyLogger.logWarning(`User ${email} authentication attempt failed - no such user `);
            return new AuthResult(null,NO_SUCH_USER);
        }

        // If a user was found, then compare the passwords.
        const passwordMatch = await bcrypt.compare(password, authTargetUser.password);
        // If the password does not match
        if (!passwordMatch) {
          prettyLogger.logWarning(`User ${email} authentication attempt failed - Invalid Password`);
          return new AuthResult(null,INVALID_PASSWORD);
        }
        prettyLogger.logInfo(`User authentication attempt succeeded ${email}`);
        return new AuthResult(authTargetUser,AUTH_SUCCESS);
}

async function addUser(email,password){

    const existingUser = await UserModel.findOne({ email });

    // If a user with that email already exists
    if (existingUser) {
      prettyLogger.logError("User with given email already exists!");
        return ;
    }

    // If the user doesn't already exist
      let plainPassword = password;

      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      // Save the new user, and mongoose validators should handle the rest.
      await new UserModel({email,password:hashedPassword}).save();

      prettyLogger.logInfo('new User ' + email + ' has registered!')
}
                       
module.exports = {addUser,authenticateUser,AUTH_SUCCESS};
