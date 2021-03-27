const mongoose = require('mongoose');
const prettyLogger = require('../utils/prettyLogger');

function configureDb(){
// Refer to https://mongoosejs.com/docs/deprecations.html for the reasoning behind below statements.
// In general they are due to deprecations.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
}

async function connectToDb(uri,onSuccess){
    try {
        await mongoose.connect(uri);
        prettyLogger.logInfo('Successfully connected to DB!');
        if (typeof onSuccess !== 'undefined'){
          onSuccess();
        }
      } catch (e) {
        prettyLogger.logError(e.stack);
      }
}

module.exports = {configureDb,connectToDb}
