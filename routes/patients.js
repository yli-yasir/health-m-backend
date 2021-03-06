const router = require("express").Router();
const patientManager = require("../db/patientManager");
const { verifyToken } = require("../middleware/auth");
const { validateId } = require("../middleware/validators");

router.use(verifyToken);
router.post("/", async (req, res, next) => {
  const patient = req.body;
  try {
    const savedPatient = await patientManager.addPatient(patient);
    res.location(
      `${req.protocol}://${req.get("host")}${req.originalUrl}/${
        savedPatient.id
      }`
    );
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundPatient = await patientManager.getPatient(id);
    if (foundPatient) {
      res.json(foundPatient);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedPatient = await patientManager.deletePatient(id);
    if (deletedPatient) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validateId, async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const updatedPatient = await patientManager.updatePatient(id, update);
    if (updatedPatient) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  const query = req.query;
  try {
    const results = await patientManager.searchPatients(
      query.q,
      parseInt(query.page),
      parseInt(query.limit),
      {
        gender: query.gender,
        parentsSeparated: query.parentsSeparated,
        parentsDivorced: query.parentsDivorced,
        parentsDied: query.parentsDied,
        stepFamily: query.stepFamily,
      }
    );
    res.send(results);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
