const mongoose = require('mongoose');
const prettyLogger = require('../utils/prettyLogger');

function configureDb(){
// Automatically configure the driver at the first import of this module.
// Subsequent imports will not run the configuration statements automatically again.
// Refer to https://mongoosejs.com/docs/deprecations.html for the reasoning behind below statements.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
}

async function connectToDb(uri){
    try {
        await mongoose.connect(uri);
        prettyLogger.logInfo('Successfully connected to DB!');
      } catch (e) {
        prettyLogger.logError('Failed to connect to DB!');
      }
}

module.exports = {configureDb,connectToDb}