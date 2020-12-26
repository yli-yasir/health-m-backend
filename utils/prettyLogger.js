const chalk = require("chalk");

const prettyLogger = {
    logError: (msg) => {
        console.error(chalk.red(msg));
    }
    ,
    logWarning : (msg) => {
        console.log(chalk.yellow(msg));
    },
    logInfo : (msg) => {
        console.log(chalk.blueBright(msg));
    },
    logDebug: (msg) => {
        console.log(chalk.green(msg));
    }
    
}


module.exports = prettyLogger;