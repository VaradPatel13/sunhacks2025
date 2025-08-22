import Joi from 'joi';

// This custom validator checks if the value is a valid MongoDB ObjectId
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

// --- Authentication Validation ---
export const authValidation = {
  // Validation schema for the 'register' endpoint
  register: Joi.object({
    body: Joi.object({
      email: Joi.string()
        .email() // Must be a valid email format
        .required(), // This field is mandatory
      
      password: Joi.string()
        .min(6) // Must be at least 6 characters long
        .required(), // This field is mandatory
    }),
  }),

  // Validation schema for the 'login' endpoint
  login: Joi.object({
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      
      password: Joi.string()
        .required(), // For login, we just require a password
    }),
  }),
};


// --- Material Validation ---
const materialIdParam = Joi.object({
  params: Joi.object({
    materialId: Joi.string().custom(objectId).required(),
  }),
});

export const materialValidation = {
  // Validation schema for the 'upload' endpoint
  upload: Joi.object({
    body: Joi.object({
      fileName: Joi.string().required(),
      // In a real app, you would use Joi.any() for the file itself
      // and handle file validation in the controller/service with multer.
    }),
  }),

  // Reuse the same schema for both GET and DELETE operations
  getMaterial: materialIdParam,
  deleteMaterial: materialIdParam,
};
