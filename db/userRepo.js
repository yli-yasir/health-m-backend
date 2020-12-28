const UserModel = require('./userModel');
const prettyLogger = require('../utils/prettyLogger');
const bcrypt = require('bcryptjs');

const NO_SUCH_USER = 50;
const INVALID_PASSWORD = 51;
const SUCCESS= 52;

class AuthResult{
    constructor(user,statusCode){
        this.user = user;
        this.statusCode = statusCode
    }
}

function authenticateUser(email,password){
        // Try to find the user.
        const existingUser = await UserModel.findOne({email});
        // If there is no user then respond with appropriate status code
        if (!existingUser) {
            prettyLogger.logWarning(`User ${email} authentication attempt failed - no such user `);
            return new AuthResult(null,NO_SUCH_USER);
        }

        // If a user was found, then compare the passwords.
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        // If the password does not match
        if (!passwordMatch) {
          prettyLogger.logError(`User ${email} authentication attempt failed - Invalid Password`);
          return new AuthResult(null,INVALID_PASSWORD);
        }

    
        prettyLogger.logInfo(`User authentication attempt succeeded ${email}`);
        return new AuthResult(authenticateUser,SUCCESS);
}