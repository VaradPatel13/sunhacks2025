import express from 'express';
import authRoutes from './auth.routes.js';
import materialRoutes from './material.routes.js';
import studyRoutes from './study.routes.js';
import dashboardRoutes from './dashboard.routes.js'; // <-- Import the new dashboard routes

const router = express.Router();

// Health check route for the main router
router.get('/status', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Mount the specific routers
router.use('/auth', authRoutes);
router.use('/materials', materialRoutes);
router.use('/study', studyRoutes);
router.use('/dashboard', dashboardRoutes); // <-- Tell the router to use the dashboard routes

export default router;