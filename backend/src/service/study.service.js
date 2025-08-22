import Quiz from '../models/quiz.model.js';
import Material from '../models/material.model.js';
import Flashcard from '../models/flashcard.model.js';
import Progress from '../models/progress.model.js'; // <-- Import the new Progress model
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

// getQuiz function remains the same...
const getQuiz = async (userId, materialId) => {
  const material = await Material.findOne({ _id: materialId, user: userId });
  if (!material) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Material not found or you do not have permission to access it');
  }
  const quiz = await Quiz.findOne({ material: materialId });
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found for this material. It may still be processing.');
  }
  return quiz;
};

/**
 * Submits, evaluates, and logs a user's answers for a quiz.
 * @param {string} userId - The ID of the user submitting the quiz.
 * @param {string} quizId - The ID of the quiz being submitted.
 * @param {Array} answers - An array of answer objects ({ questionId, selectedOption }).
 * @returns {Promise<object>} The results of the quiz.
 */
const submitQuizAnswers = async (userId, quizId, answers) => {
  const quiz = await Quiz.findOne({ _id: quizId, user: userId });
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found or you do not have permission to submit to it.');
  }

  let score = 0;
  const results = [];
  const progressEntries = []; // Array to hold new progress documents

  const correctAnswersMap = new Map(
    quiz.questions.map(q => [q._id.toString(), q.correctAnswer])
  );

  for (const answer of answers) {
    const isCorrect = correctAnswersMap.get(answer.questionId) === answer.selectedOption;
    if (isCorrect) {
      score++;
    }
    results.push({
      questionId: answer.questionId,
      isCorrect,
      correctAnswer: correctAnswersMap.get(answer.questionId),
    });

    // --- Create a new progress entry for each answer ---
    progressEntries.push({
      user: userId,
      quiz: quizId,
      question: answer.questionId,
      material: quiz.material, // Get the material ID from the quiz object
      isCorrect,
    });
  }

  // Save all the new progress entries to the database
  await Progress.insertMany(progressEntries);

  return {
    quizId,
    score,
    totalQuestions: quiz.questions.length,
    results,
  };
};

// getFlashcards function remains the same...
const getFlashcards = async (userId, materialId) => {
  const material = await Material.findOne({ _id: materialId, user: userId });
  if (!material) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Material not found or you do not have permission to access it');
  }
  const flashcards = await Flashcard.find({ material: materialId });
  if (!flashcards || flashcards.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No flashcards found for this material. They may still be processing.');
  }
  return flashcards;
};

// getTutorAnswer function remains the same...
const getTutorAnswer = async (userId, materialId, question) => {
  const material = await Material.findOne({ _id: materialId, user: userId });
  if (!material) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Material not found or you do not have permission to access it');
  }
  return `This is a simulated AI answer for your question about "${question}" regarding the material "${material.fileName}".`;
};


export const studyService = {
  getQuiz,
  submitQuizAnswers,
  getFlashcards,
  getTutorAnswer,
};
