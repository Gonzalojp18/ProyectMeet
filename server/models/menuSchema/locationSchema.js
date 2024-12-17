import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nameId: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export default locationSchema;
