const router = require("express").Router();
const patientRepo = require("../db/patientRepo");
const { validateId } = require("../middleware/validators");

router.post("/", async (req, res, next) => {
  const patient = req.body;
  try {
    const savedPatient = await patientRepo.addPatient(patient);
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
    const foundPatient = await patientRepo.getPatient(id);
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
    const deletedPatient = await patientRepo.deletePatient(id);
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
    const updatedPatient = await patientRepo.updatePatient(id,update);
    if (updatedPatient) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});


module.exports = router;
