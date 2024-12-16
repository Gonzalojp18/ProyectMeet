import mongoose from 'mongoose';
import locationSchema from './locationSchema.js';
import categorySchema from './categorySchema.js'

const menuSchema = mongoose.Schema(
  {
    categories: [categorySchema],
    locations: [locationSchema],
  },
  {
  timestamps: true
  }
);

export default mongoose.model('Menu', menuSchema);
