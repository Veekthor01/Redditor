import mongoose from 'mongoose';

const connection = {};

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB () {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};