import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true, // Good practice to trim whitespace
    lowercase: true, // Good practice to store emails in lowercase
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    private: true, // Ensure password is not returned in queries by default
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
});

/**
 * Mongoose pre-save middleware hook.
 * This function automatically runs before a user document is saved.
 * It hashes the user's password for security if it has been modified.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
