import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  // Link to the material this flashcard was generated from
  material: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Material',
  },
  // Link to the user who owns this flashcard
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  frontText: {
    type: String,
    required: true,
    trim: true,
  },
  backText: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;
