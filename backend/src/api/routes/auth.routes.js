import express from 'express';

// We will create these controller functions in the next step
import { register, login } from '../controllers/auth.controller.js';

// Initialize the Express router
const router = express.Router();

// --- Route Definitions ---

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate a user and get a token
// @access  Public
router.post('/login', login);

// Export the router to be used in the main app.js file
export default router;

