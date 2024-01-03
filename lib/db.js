import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB () {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};