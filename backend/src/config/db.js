import mongoose from 'mongoose';
mongoose.set('strictQuery', 'throw');
mongoose.set('runValidators', true);
export const connectDB = async (options = {}) => {
  if(!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
  await mongoose.connect(process.env.MONGO_URI, { autoIndex: options.autoIndex ?? process.env.NODE_ENV !== 'production', serverSelectionTimeoutMS: 10000 });
  console.log('MongoDB connected');
};
