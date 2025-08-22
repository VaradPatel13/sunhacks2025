import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  // Using a Map for options allows for flexible keys (e.g., 'a', 'b', 'c' or '1', '2', '3')
  options: {
    type: Map,
    of: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  // Link to the material this quiz was generated from
  material: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Material',
  },
  // Link to the user who owns this quiz
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  // Embed the questions directly within the quiz document
  questions: [questionSchema],
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
