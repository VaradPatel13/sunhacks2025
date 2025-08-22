import express from 'express';
import { protect } from '../../middlewares/auth.middleware.js'; // We need to create this middleware
import { validate } from '../../middlewares/validator.middleware.js';
import { materialValidation } from '../../validators/auth.validator.js'; // We will create this
import {
  uploadMaterial,
  getAllMaterials,
  getMaterialById,
  deleteMaterial,
} from '../controllers/material.controller.js'; // We will create this

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file.
// This ensures that a user must be authenticated to access any material endpoints.
router.use(protect);

// @route   POST /api/v1/materials/upload
// @desc    Upload a new study material
router.post(
  '/upload',
  validate(materialValidation.upload), // Validate the request
  uploadMaterial
);

// @route   GET /api/v1/materials
// @desc    Get all materials for the logged-in user
router.get('/', getAllMaterials);

// @route   GET /api/v1/materials/:materialId
// @desc    Get a single material by its ID
router.get(
  '/:materialId',
  validate(materialValidation.getMaterial), // Validate the URL parameter
  getMaterialById
);

// @route   DELETE /api/v1/materials/:materialId
// @desc    Delete a material
router.delete(
  '/:materialId',
  validate(materialValidation.deleteMaterial), // Validate the URL parameter
  deleteMaterial
);

export default router;
