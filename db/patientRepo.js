const PatientModel= require("./models/patientModel");
const createPatientSchema = require("./validation/createPatientSchema");
const updatePatientSchema = require("./validation/updatePatientSchema");
const stringUtils = require("../utils/stringUtils");
const prettyLogger = require("../utils/prettyLogger");

async function addPatient(patient) {
  await createPatientSchema.validateAsync(patient);
  const savedPatient =  await new PatientModel(patient).save();
  prettyLogger.logInfo("Added a new patient!");
  return savedPatient;
}

async function getPatient(id) {
  const foundPatient =  await PatientModel.findById(id);
  if(foundPatient){
  prettyLogger.logInfo(`Retrieved patient with id: "${id}"!`);}
  else{
    prettyLogger.logWarning(`Could not find patient with id: "${id}"!`)
  }
  return foundPatient;
}

async function searchPatients(fullName) {
  const pattern = `.*${fullName}.*`
  const results = await PatientModel.find({fullName: { $regex: pattern, $options: "i" }});
  prettyLogger.logInfo(`Search results for "${fullName}" found!`);
  return results;
}

async function deletePatient(id){
  const deletedPatient = await PatientModel.findByIdAndDelete(id); 
  if (deletedPatient){
    prettyLogger.logInfo(`Deleted patient with id: "${id}"!`);
  }  
  else{
      prettyLogger.logWarning(`Could not find patient with id: "${id}"!`)
  }
  return deletedPatient;
}

async function updatePatient(id,update){
  await updatePatientSchema.validateAsync(update);
  const updatedPatient = await PatientModel.findByIdAndUpdate(id,update); 
  if (updatedPatient){
    prettyLogger.logInfo(`updated patient with id: "${id}"!`);
  }  
  else{
      prettyLogger.logWarning(`Could not find patient with id: "${id}"!`)
  }
  return updatedPatient;
}

module.exports = {addPatient,getPatient,updatePatient,deletePatient,searchPatients};

