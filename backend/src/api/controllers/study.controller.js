import asyncHandler from 'express-async-handler';
import { studyService } from '../../service/study.service.js';

/**
 * @desc    Get the quiz for a specific material
 * @route   GET /api/v1/study/:materialId/quiz
 * @access  Private
 */
export const getQuizByMaterial = asyncHandler(async (req, res) => {
  const { materialId } = req.params;
  const userId = req.user.id;
  const quiz = await studyService.getQuiz(userId, materialId);
  res.status(200).json(quiz);
});

/**
 * @desc    Submit answers for a quiz
 * @route   POST /api/v1/study/quiz/submit
 * @access  Private
 */
export const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId, answers } = req.body;
  const userId = req.user.id;
  const results = await studyService.submitQuizAnswers(userId, quizId, answers);
  res.status(200).json(results);
});

/**
 * @desc    Get all flashcards for a specific material
 * @route   GET /api/v1/study/:materialId/flashcards
 * @access  Private
 */
export const getFlashcardsByMaterial = asyncHandler(async (req, res) => {
  const { materialId } = req.params;
  const userId = req.user.id;
  const flashcards = await studyService.getFlashcards(userId, materialId);
  res.status(200).json(flashcards);
});

/**
 * @desc    Ask a question to the AI tutor
 * @route   POST /api/v1/study/tutor/ask
 * @access  Private
 */
export const askTutor = asyncHandler(async (req, res) => {
  // The request body has already been validated
  const { materialId, question } = req.body;
  const userId = req.user.id;

  // Call the service to handle the business logic
  const answer = await studyService.getTutorAnswer(userId, materialId, question);

  res.status(200).json({ answer });
});
