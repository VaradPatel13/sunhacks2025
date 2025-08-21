
import jwt from 'jsonwebtoken';
import User from '../routes/models/user.model.js';

/**
 * Middleware to protect routes that require authentication.
 * It verifies the JWT from the Authorization header.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID encoded in the token
      // Attach the user object to the request, excluding the password
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or the route handler
      next();
    } catch (error) {
      console.error('Authentication Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
