import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://root:sanguinario@localhost:27017/resto');
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Something went wrong ${error}`);
    process.exit(1);
  }
}

export default connectDB;