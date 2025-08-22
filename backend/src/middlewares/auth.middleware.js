import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * Middleware to protect routes by verifying the JWT from the request cookie.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if the token cookie exists in the request
  if (req.cookies.token) {
    try {
      // Get token directly from the cookie
      token = req.cookies.token;

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID encoded in the token
      // and attach the user object to the request, excluding the password
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or the route handler
      next();
    } catch (error) {
      console.error('Authentication Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the cookie
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
