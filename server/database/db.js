import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.log(`Something went wrong ${error}`.red);
    process.exit(1);
  }
}

export default connectDB;