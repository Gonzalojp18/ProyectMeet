import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "This field can't be empty"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "This field can't be empty"],
    trim: true
  },
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
