import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  // Link to the user who answered the question
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  // Link to the quiz the question belongs to
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz',
  },
  // Link to the specific question that was answered
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // Link to the material this progress is related to
  material: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Material',
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true, // This will automatically add an 'createdAt' field
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
