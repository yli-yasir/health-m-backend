const Joi = require("joi");

module.exports = Joi.object({
  fullName: Joi
    .string()
    .min(2)
    .max(100)
    .required(),
  gender: Joi.string().valid("male", "female").required(),
  bodyWeight: Joi.number().max(1000).required(),
  birthDate: Joi
    .date()
    .max(new Date())
    .required(),  
  patientAddress: Joi.string().max(500).required(),
  patientPhoneNumber: Joi.string().max(15).required(),
  pedigreeChart: Joi.string().required(),
  parentsSeparated: Joi.boolean().required(),
  parentsSeparatedDescription: Joi.string().max(2000),
  parentsDivorced: Joi.boolean().required(),
  parentsDivorcedDescription: Joi.string().max(2000),
  parentsDied: Joi.boolean().required(),
  parentsDiedDescription: Joi.string().max(2000),
  stepFamily: Joi.boolean().required(),
  stepFamilyDescription: Joi.boolean().required(),
  diagnosisTreatment: Joi.object().pattern(Joi.string().max(10), Joi.string().max(300)),
  doctorNotes: Joi.string().max(10000).required()
});
