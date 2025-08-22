import express from 'express';
import { protect } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validator.middleware.js';
import { studyValidation } from '../../validators/study.validator.js';
import { getQuizByMaterial, submitQuiz, getFlashcardsByMaterial, askTutor } from '../controllers/study.controller.js'; // <-- Import askTutor

const router = express.Router();

// Protect all study routes
router.use(protect);

// --- Quiz Routes ---
router.get(
  '/:materialId/quiz',
  validate(studyValidation.getQuiz),
  getQuizByMaterial
);

router.post(
  '/quiz/submit',
  validate(studyValidation.submitQuiz),
  submitQuiz
);

// --- Flashcard Routes ---
router.get(
  '/:materialId/flashcards',
  validate(studyValidation.getFlashcards),
  getFlashcardsByMaterial
);

// --- AI Tutor Routes ---
// @route   POST /api/v1/study/tutor/ask
// @desc    Ask a question to the AI tutor
router.post(
  '/tutor/ask',
  validate(studyValidation.askTutor), // <-- Add validation for the request
  askTutor // <-- Add the new controller function
);

export default router;
