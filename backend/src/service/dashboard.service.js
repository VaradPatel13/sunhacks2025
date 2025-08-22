import Progress from '../models/progress.model.js';

/**
 * Calculates and returns statistics for a given user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} An object containing user statistics.
 */
const getStats = async (userId) => {
  // --- Total Questions Answered ---
  const totalQuestionsAnswered = await Progress.countDocuments({ user: userId });

  // --- Overall Accuracy ---
  const correctAnswers = await Progress.countDocuments({ user: userId, isCorrect: true });
  const accuracy = totalQuestionsAnswered > 0 ? (correctAnswers / totalQuestionsAnswered) * 100 : 0;

  // --- Study Streak (Placeholder Logic) ---
  // A real implementation would involve more complex date logic to check for consecutive days.
  const studyStreak = 1; // Placeholder

  // --- Subject Performance (Placeholder Logic) ---
  // A real implementation would involve aggregating data by subject, which requires adding
  // a 'subject' field to the Material model.
  const subjectPerformance = [
    { subject: 'Physics', accuracy: 85 },
    { subject: 'History', accuracy: 92 },
  ]; // Placeholder

  return {
    totalQuestionsAnswered,
    accuracy: parseFloat(accuracy.toFixed(2)), // Format to 2 decimal places
    studyStreak,
    subjectPerformance,
  };
};

export const dashboardService = {
  getStats,
};
