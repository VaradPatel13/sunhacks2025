// Import necessary packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import configurations and routes
import connectDB from './config/db.config.js';
import authRoutes from './api/routes/auth.routes.js';
import materialRoutes from './api/routes/material.routes.js'; // <-- Import material routes

// Load environment variables from a .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// --- API Routes ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy and running!' });
});

// Mount the authentication routes
app.use('/api/auth', authRoutes);

// Mount the material routes
app.use('/api/materials', materialRoutes); // <-- Tell the app to use the material routes


// Define the port
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});