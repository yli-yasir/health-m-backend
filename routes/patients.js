const router = require("express").Router();
const patientRepo = require('../db/patientRepo');
const prettyLogger = require('../utils/prettyLogger');

router.post("/", async (req, res, next) => {
  const patient = req.body;
  try{
      await patientRepo.addPatient(patient);
      res.sendStatus(201);
  }
  catch(e){
      prettyLogger.logError(e.message);
      res.sendStatus(500);
  }

});

module.exports = router;
