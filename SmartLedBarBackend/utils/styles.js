const chalk = require('chalk');

const infoMessage = (message = "", restMessage = "") => {
    console.log(`${chalk.yellow(message)} ${restMessage}`);
}

const successMessage = (message = "", restMessage = "") => {
    console.log(`${chalk.green(message)} ${restMessage}`);
}

const errorMessage = (message = "", restMessage = "") => {
    console.log(`${chalk.red(message)} ${restMessage}`);
}

module.exports = {
  infoMessage  ,
  successMessage,
  errorMessage
};