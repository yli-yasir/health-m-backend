require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbManager = require("./db/dbManager");
const prettyLogger = require("./utils/prettyLogger");
const patientsRouter = require("./routes/patients");
const usersRouter = require("./routes/users");
const errorHandlers = require("./middleware/errorHandlers");
const bearerToken = require('express-bearer-token');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(bearerToken())
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    exposedHeaders: "Location",
  })
);

dbManager.configureDb();
dbManager.connectToDb(process.env.DB_CONNECTION_URI);

app.use("/patients", patientsRouter);
app.use(usersRouter);

app.use(errorHandlers);


const listener = app.listen(process.env.PORT, () =>
  prettyLogger.logInfo(
    `Server has started! Listening at port ${listener.address().port}.`
  )
);
