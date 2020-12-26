require("dotenv").config();
const express = require("express");
const dbManager = require("./db/dbManager");
const prettyLogger = require('./utils/prettyLogger');

const app = express();
app.use(express.json);

dbManager.configureDb();
// dbManager.connectToDb();

const listener = app.listen(process.env.PORT, () =>
  prettyLogger.logInfo(
    `Server has started! Listening at port ${listener.address().port}.`
  )
);
