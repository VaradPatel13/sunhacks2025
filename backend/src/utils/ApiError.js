/**
 * A custom error class for handling API errors in a structured way.
 * It extends the built-in Error class to include an HTTP status code.
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {number} statusCode - The HTTP status code (e.g., 404, 401).
   * @param {string} message - The error message.
   * @param {boolean} [isOperational=true] - A flag to indicate if this is an operational error (one we expect) vs. a programming error.
   * @param {string} [stack=''] - The error stack trace.
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
