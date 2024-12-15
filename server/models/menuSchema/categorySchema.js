import mongoose from 'mongoose';
import itemSchema from './itemSchema.js';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field can't be empty"],
      trim: true
    },
    subtitle: {
      type: String,
      trim: true
    },
    style: {
      type: String,
      enum: ['default', 'compact', 'featured'],
      default: 'default'
    },
    image: {
      url: { type: String, trim: true },
      position: {
        type: String,
        enum: ['top', 'bottom', 'beside-title']
      },
      alt: { type: String, trim: true }
    },
    items: [itemSchema],
    order: {
      type: Number,
      required: [true, "This field can't be empty"],
      min: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
);

export default mongoose.model('Category', categorySchema);
