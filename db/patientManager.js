const PatientModel = require("./models/patientModel");
const createPatientSchema = require("./validation/createPatientSchema");
const updatePatientSchema = require("./validation/updatePatientSchema");
const patientUtils = require("../utils/patientUtils");
const prettyLogger = require("../utils/prettyLogger");

async function addPatient(patient) {
  await createPatientSchema.validateAsync(patient);
  const savedPatient = await new PatientModel(patient).save();
  prettyLogger.logInfo("Added a new patient!");
  return savedPatient;
}

async function getPatient(id) {
  const foundPatient = await PatientModel.findById(id);
  if (foundPatient) {
    prettyLogger.logInfo(`Retrieved patient with id: "${id}"!`);
  } else {
    prettyLogger.logWarning(`Could not find patient with id: "${id}"!`);
  }
  return foundPatient;
}

async function deletePatient(id) {
  const deletedPatient = await PatientModel.findByIdAndDelete(id);
  if (deletedPatient) {
    prettyLogger.logInfo(`Deleted patient with id: "${id}"!`);
  } else {
    prettyLogger.logWarning(`Could not find patient with id: "${id}"!`);
  }
  return deletedPatient;
}

async function updatePatient(id, update) {
  await updatePatientSchema.validateAsync(update);
  const updatedPatient = await PatientModel.findByIdAndUpdate(id, update);
  if (updatedPatient) {
    prettyLogger.logInfo(`updated patient with id: "${id}"!`);
  } else {
    prettyLogger.logWarning(`Could not find patient with id: "${id}"!`);
  }
  return updatedPatient;
}

//searchTerm can be either part of patient full name or the patients email.
async function searchPatients(searchTerm,page,limit, options) {

  const filter ={};

  if(searchTerm){
  //Assume the searchTerm is the patients name and construct a pattern to match it
  const patientNamePattern = patientUtils.getPatientNameSearchPattern(searchTerm);
  
  //Assume the searchTerm is the patients email
  const patientEmail = searchTerm;

  filter.$or= [{fullName:  { $regex: patientNamePattern, $options: 'i' }},{email: patientEmail}]
  }

  const skip = limit * (page-1);
  // Skip and limit can accept NaN. In that case they have no effect.
  const results = await PatientModel.find(filter).skip(skip).limit(limit);

  prettyLogger.logInfo(`Search results found!`);

  return results;
}

module.exports = {
  addPatient,
  getPatient,
  updatePatient,
  deletePatient,
  searchPatients,
};
