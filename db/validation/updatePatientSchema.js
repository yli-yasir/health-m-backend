const Joi = require("joi");

module.exports = Joi.object({
  fullName: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  gender: Joi.string().valid("male", "female").optional(),
  bodyWeight: Joi.number().max(1000).optional(),
  birthDate: Joi.date().max('now').optional(),
  address: Joi.string().max(500).optional(),
  phoneNumber: Joi.string().max(15).optional(),
  pedigreeChart: Joi.string().optional().allow(''),
  admissionDate: Joi.date().max('now').optional(),
  admittorName: Joi.string().min(2).max(100).optional(),
  parentsSeparated: Joi.boolean().optional(),
  parentsSeparatedDescription: Joi.string().max(2000).optional().allow(""),
  parentsDivorced: Joi.boolean().optional(),
  parentsDivorcedDescription: Joi.string().max(2000).optional().allow(""),
  parentsDied: Joi.boolean().optional(),
  parentsDiedDescription: Joi.string().max(2000).optional().allow(""),
  stepFamily: Joi.boolean().optional(),
  stepFamilyDescription: Joi.string().max(2000).optional().allow(""),
  diagnosisTreatment: Joi.object().pattern(
    Joi.string().max(10),
    Joi.string().max(300).allow('')
  ).optional(),
  doctorNotes: Joi.string().max(10000).optional(),
});
