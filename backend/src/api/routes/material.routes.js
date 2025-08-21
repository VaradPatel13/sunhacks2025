import express from 'express';

// Import controller functions (we will create these next)
import { uploadMaterial, getAllMaterials, getMaterialById, deleteMaterial } from '../controllers/material.controller.js';

// Import authentication middleware (we will create this next)
import { protect } from '../middlewares/auth.middleware.js';

// Initialize the Express router
const router = express.Router();

// --- Route Definitions ---

// Apply the 'protect' middleware to all routes in this file
// This ensures that only authenticated users can access these endpoints
router.use(protect);

// @route   POST /api/materials/upload
// @desc    Upload a new study material
router.post('/upload', uploadMaterial);

// @route   GET /api/materials
// @desc    Get all materials for the logged-in user
router.get('/', getAllMaterials);

// @route   GET /api/materials/:materialId
// @desc    Get a single material by its ID
router.get('/:materialId', getMaterialById);

// @route   DELETE /api/materials/:materialId
// @desc    Delete a material
router.delete('/:materialId', deleteMaterial);


// Export the router
export default router;
