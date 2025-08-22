/**
 * Handles requests for routes that do not exist (404 Not Found).
 * This middleware is triggered when no other route matches the request.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware (our errorHandler)
};

/**
 * A centralized error handler for the entire application.
 * This middleware catches all errors passed to `next(error)`.
 * It provides a consistent JSON error response format.
 * @param {object} err - The error object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
export const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come in with a 200 status code; if so, default to 500 (Internal Server Error).
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Only show the detailed stack trace in development mode for debugging purposes.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
