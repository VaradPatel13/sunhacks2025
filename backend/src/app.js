import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import routes and error handling middleware
import allRoutes from './api/routes/index.js'; // We will create this main router next
import { notFound, errorHandler } from './middlewares/errorHandler.middleware.js'; // We will create this next

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// --- Middleware ---

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    // In development, you might want to allow all origins or a whitelist.
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']; // Add your frontend dev ports
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- API Routes ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy!' });
});

// Mount all the API routes under a versioned path (e.g., /api/v1)
app.use('/api/v1', allRoutes);


// --- Centralized Error Handling ---
// Handle 404 errors for routes that don't exist
app.use(notFound);
// Handle all other errors
app.use(errorHandler);


// Export the configured app
export default app;
