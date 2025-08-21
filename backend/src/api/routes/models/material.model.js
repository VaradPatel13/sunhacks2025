import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  // Link to the user who uploaded this material
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Creates a reference to the User model
  },
  fileName: {
    type: String,
    required: true,
  },
  // This will be the URL to the file stored in a cloud service like S3 or Firebase Storage
  fileUrl: {
    type: String,
    required: true,
  },
  // Tracks the current state of AI processing
  status: {
    type: String,
    required: true,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
  },
  // The full text extracted from the document via OCR
  extractedText: {
    type: String,
  },
  // The AI-generated summary of the document
  summary: {
    type: String,
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' timestamps
  timestamps: true,
});

const Material = mongoose.model('Material', materialSchema);

export default Material;
