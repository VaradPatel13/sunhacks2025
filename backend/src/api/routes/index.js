import express from 'express';
import authRoutes from './auth.routes.js';
import materialRoutes from './material.routes.js';

const router = express.Router();

// Health check route for the main router
router.get('/status', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Mount the specific routers
router.use('/auth', authRoutes);
router.use('/materials', materialRoutes);

// We will add other routes (study, dashboard) here later

export default router;
