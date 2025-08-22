import asyncHandler from 'express-async-handler'; // <-- Imported only ONCE
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { authService } from '../../service/auth.service.js'; // Assuming this service exists
import User from '../../models/user.model.js';
import ApiError from '../../utils/ApiError.js';

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  // The request body has already been validated by our middleware
  const { email, password } = req.body;

  // Call the service to handle the business logic
  const newUser = await authService.registerUser(email, password);

  res.status(httpStatus.CREATED).json({
    message: 'User registered successfully',
    userId: newUser._id,
  });
});

/**
 * @desc    Authenticate a user and set a cookie
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Call the service to handle the login logic
  const { user, token } = await authService.loginUser(email, password);

  // Set the secure, HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Send the response
  res.status(httpStatus.OK).json({
    message: 'Login successful',
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

/**
 * Middleware to protect routes by verifying the JWT from the request cookie.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach them to the request object (without the password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
      }

      next();
    } catch (error) {
      // This will catch JWT verification errors (e.g., expired, invalid)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized, token failed');
    }
  } else {
    // If no token was found in the cookies at all
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized, no token');
  }
});