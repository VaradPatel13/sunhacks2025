import asyncHandler from 'express-async-handler';
import { dashboardService } from '../../service/dashboard.service.js'; // We will create this next

/**
 * @desc    Get overall statistics for the user's dashboard
 * @route   GET /api/v1/dashboard/stats
 * @access  Private
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id; // The user object is attached by the 'protect' middleware

  // Call the service to handle the business logic
  const stats = await dashboardService.getStats(userId);

  res.status(200).json(stats);
});
