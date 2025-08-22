import Joi from 'joi';

// This custom validator checks if the value is a valid MongoDB ObjectId
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

export const studyValidation = {
  // Validation schema for getting a quiz
  getQuiz: Joi.object({
    params: Joi.object({
      materialId: Joi.string().custom(objectId).required(),
    }),
  }),

  // Validation schema for submitting quiz answers
  submitQuiz: Joi.object({
    body: Joi.object({
      quizId: Joi.string().custom(objectId).required(),
      answers: Joi.array().items(
        Joi.object({
          questionId: Joi.string().custom(objectId).required(),
          selectedOption: Joi.string().required(),
        })
      ).min(1).required(),
    }),
  }),

  // Validation schema for getting flashcards
  getFlashcards: Joi.object({
    params: Joi.object({
      materialId: Joi.string().custom(objectId).required(),
    }),
  }),

  // Validation schema for asking the AI tutor a question
  askTutor: Joi.object({
    body: Joi.object({
      materialId: Joi.string().custom(objectId).required(),
      question: Joi.string().min(3).required(), // Require a question with at least 3 characters
    }),
  }),
};
