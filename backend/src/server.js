import http from 'http';
import app from './app.js';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the HTTP server
const server = http.createServer(app);

const PORT = process.env.PORT || 5001;

/**
 * Starts the server after connecting to the database.
 */
const startServer = async () => {
  try {
    // Connect to the database first
    await connectDB();

    // Start listening for requests
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Call the function to start the server
startServer();
