import mongoose from 'mongoose';

// Open one connection to MongoDB for the whole server process.
// MONGODB_URI comes from .env, e.g. mongodb://localhost:27017/zero-to-shipped
export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env.');
  }
  await mongoose.connect(uri);
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
}
