// Import Mongoose for MongoDB interaction
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Asynchronously connects to the MongoDB database using the URI
 * from the environment variables.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the connection string
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message if the connection is established
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any errors that occur during connection and exit the process
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

// Export the function to be used in other parts of the application
export default connectDB;
