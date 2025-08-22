import Material from '../../models/material.model.js';

/**
 * @desc    Upload a new study material
 * @route   POST /api/materials/upload
 * @access  Private
 */
export const uploadMaterial = async (req, res) => {
  // --- THIS IS A PLACEHOLDER ---
  // In a real application, this is where you would handle the file upload
  // to a cloud storage service (like AWS S3 or Firebase Storage).
  // 1. Receive the file from the request (using a library like 'multer').
  // 2. Upload the file to your cloud storage provider.
  // 3. Get the public URL of the uploaded file.

  // For now, we will simulate this process.
  const { fileName } = req.body; // Assume fileName is sent for now

  if (!fileName) {
    return res.status(400).json({ message: 'File name is required' });
  }

  try {
    const newMaterial = await Material.create({
      user: req.user.id, // The user ID is attached by the 'protect' middleware
      fileName: fileName,
      fileUrl: `https://fake-storage.com/${fileName}`, // This would be the real URL
      status: 'processing',
    });

    // --- TRIGGER AI SERVICE (Placeholder) ---
    // Here you would make an async HTTP request to your Python AI service
    // to start processing the file at 'fileUrl'.
    // e.g., await axios.post('http://localhost:5002/api/process', { fileUrl: newMaterial.fileUrl });

    res.status(201).json({
      message: 'Material uploaded and processing has started.',
      material: newMaterial,
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
};

/**
 * @desc    Get all materials for the logged-in user
 * @route   GET /api/materials
 * @access  Private
 */
export const getAllMaterials = async (req, res) => {
  try {
    // Find all materials that belong to the currently logged-in user
    
    const materials = await Material.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    console.error('Get All Materials Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get a single material by its ID
 * @route   GET /api/materials/:materialId
 * @access  Private
 */
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.materialId);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Ensure the material belongs to the user making the request
    if (material.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to view this material' });
    }

    res.status(200).json(material);
  } catch (error) {
    console.error('Get Material By ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Delete a material
 * @route   DELETE /api/materials/:materialId
 * @access  Private
 */
export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.materialId);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Ensure the material belongs to the user making the request
    if (material.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this material' });
    }

    await material.deleteOne();

    // --- CLEANUP (Placeholder) ---
    // Here you would also delete the actual file from your cloud storage.

    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Delete Material Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
