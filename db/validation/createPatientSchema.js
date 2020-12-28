const Joi = require("joi");

module.exports = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  gender: Joi.string().valid("male", "female").required(),
  bodyWeight: Joi.number().max(1000).required(),
  birthDate: Joi.date().max(new Date()).required(),
  address: Joi.string().max(500).required(),
  phoneNumber: Joi.string().max(15).required(),
  pedigreeChart: Joi.string().required(),
  admissionDate: Joi.date().max(new Date()).required(),
  admittorName: Joi.string().min(2).max(100).required(),
  parentsSeparated: Joi.boolean().required(),
  parentsSeparatedDescription: Joi.string().max(2000).optional().allow(""),
  parentsDivorced: Joi.boolean().required(),
  parentsDivorcedDescription: Joi.string().max(2000).optional().allow(""),
  parentsDied: Joi.boolean().required(),
  parentsDiedDescription: Joi.string().max(2000).optional().allow(""),
  stepFamily: Joi.boolean().required(),
  stepFamilyDescription: Joi.string().max(2000).optional().allow(""),
  diagnosisTreatment: Joi.object().pattern(
    Joi.string().max(10),
    Joi.string().max(300)
  ),
  doctorNotes: Joi.string().max(10000).required(),
});
