import express from 'express';

// Import controller functions
import { register, login } from '../controllers/auth.controller.js';

// Import validation schemas and middleware
import { validate } from '../../middlewares/validator.middleware.js'; // <-- This line was likely missing or incorrect
import { authValidation } from '../../validators/auth.validator.js';

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  validate(authValidation.register), // 1. Validate the incoming data first
  register                             // 2. If validation passes, proceed to the controller
);

// @route   POST /api/v1/auth/login
// @desc    Authenticate a user
// @access  Public
router.post(
  '/login',
  validate(authValidation.login), // 1. Validate
  login                           // 2. Proceed
);

export default router;
