import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  description: String,
  prices: {
    location1: {
      type: Number,
      required: [true, "This field can't be empty"],
      min: 0
    },
    location2: {
      type: Number,
      required: [true, "This field can't be empty"],
      min: 0
    },
    location3: {
      type: Number,
      min: 0
    }
  },
  image: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

export default itemSchema;
