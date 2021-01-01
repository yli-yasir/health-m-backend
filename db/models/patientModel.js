const mongoose = require("mongoose");

const trimmedString = { type: String, trim: true };

const patientSchema = new mongoose.Schema({
  fullName: trimmedString,
  gender: trimmedString,
  bodyWeight: Number,
  birthDate: Date,
  address: trimmedString,
  phoneNumber: trimmedString,
  email: trimmedString,
  pedigreeChart: trimmedString,
  admissionDate: Date,
  admittorName:trimmedString,
  parentsSeperated: Boolean,
  parentsSeparatedDescription: trimmedString,
  parentsDivorced: Boolean,
  parentsDivorcedDescription: trimmedString,
  parentsDied: Boolean,
  parentsDiedDescription: trimmedString,
  stepFamily: Boolean,
  stepFamilyDescription: trimmedString,
  diagnosisTreatment:{
    type: Map,
    of: String
  },
  doctorNotes: trimmedString
});

module.exports = mongoose.model('patient',patientSchema);