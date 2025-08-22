import express from 'express';
import { protect } from '../../middlewares/auth.middleware.js';
import { getDashboardStats } from '../controllers/dashboard.controller.js'; // We will create this

const router = express.Router();

// Protect all dashboard routes
router.use(protect);

// @route   GET /api/v1/dashboard/stats
// @desc    Get overall statistics for the user's dashboard
router.get('/stats', getDashboardStats);

export default router;
