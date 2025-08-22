import Joi from 'joi';

/**
 * A generic middleware that validates the request body, params, and query
 * against a provided Joi schema.
 * @param {object} schema - The Joi validation schema.
 * @returns {function} - An Express middleware function.
 */
export const validate = (schema) => (req, res, next) => {
  // Create a schema that includes body, params, and query validation
  const fullSchema = Joi.object({
    body: Joi.object(),
    params: Joi.object(),
    query: Joi.object(),
  }).concat(schema); // Merge the provided schema with our base

  // Pick only the parts of the request that we need to validate
  const requestData = {
    body: req.body,
    params: req.params,
    query: req.query,
  };

  // Validate the request data against the full schema
  const { error, value } = fullSchema.validate(requestData, {
    abortEarly: false, // Report all errors, not just the first one
    allowUnknown: true, // Allow properties not defined in the schema
    stripUnknown: true, // Remove unknown properties from the validated object
  });

  if (error) {
    // If validation fails, format the error messages and send a 400 Bad Request response
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ message: errorMessage });
  }

  // --- FIX ---
  // If validation is successful, replace the original request body
  // with the sanitized and validated body. We only modify req.body
  // as req.params and req.query can be read-only.
  req.body = value.body;
  
  // Proceed to the next middleware or controller
  return next();
};
