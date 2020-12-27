require("dotenv").config();
const express = require("express");
const dbManager = require("./db/dbManager");
const prettyLogger = require("./utils/prettyLogger");
const patientsRouter = require("./routes/patients");

const app = express();
app.use(express.json());

dbManager.configureDb();
dbManager.connectToDb(process.env.DB_CONNECTION_URI);

app.use('/patients',patientsRouter);


const listener = app.listen(process.env.PORT, () =>
  prettyLogger.logInfo(
    `Server has started! Listening at port ${listener.address().port}.`
  )
);
