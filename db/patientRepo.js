const PatientModel= require("./models/patientModel");
const patientValidationSchema = require("./validation/patientValidationSchema");
const stringUtils = require("../utils/stringUtils");
const prettyLogger = require("../utils/prettyLogger");

async function addPatient(patient) {
  await patientValidationSchema.validateAsync(patient);
  await new PatientModel(patient).save();
  prettyLogger.logInfo("Added a new patient!");
}

async function getPatient(id) {
  await PatientModel.findById(id);
  prettyLogger.logInfo(`Retrieved patient with id: "${id}"!`);
}

async function searchPatients(fullName) {
  const pattern = `.*${fullName}.*`
  const results = await PatientModel.find({fullName: { $regex: pattern, $options: "i" }});
  prettyLogger.logInfo(`Search results for "${fullName}" found!`);
  return results;
}

async function deletePatient(id){
    await PatientModel.findByIdAndDelete(id)
   prettyLogger.logInfo(`Deleted patient with id: "${id}"!`);
}

async function updatePatient(id,update){
    await PatientModel.findByIdAndUpdate(id,update)
    prettyLogger.logInfo(`updated patient with id: "${id}"!`)

}

module.exports = {addPatient,getPatient,updatePatient,deletePatient,searchPatients};

