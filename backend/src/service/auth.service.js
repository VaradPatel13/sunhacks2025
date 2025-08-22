import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js'; // We will create this utility next

/**
 * Generates a JSON Web Token (JWT).
 * @param {string} userId - The user's ID.
 * @returns {string} The generated JWT.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * Register a new user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<User>} The created user object.
 */
const registerUser = async (email, password) => {
  // Check if email is already taken
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(httpStatus.CONFLICT, 'User with this email already exists');
  }

  // Create user in the database
  const user = await User.create({ email, password });
  return user;
};

/**
 * Login a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: User, token: string}>} An object containing the user and token.
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = generateToken(user._id);
  return { user, token };
};

// Export all functions as a single service object
export const authService = {
  registerUser,
  loginUser,
};
