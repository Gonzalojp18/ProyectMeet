import mongoose from 'mongoose';

const menuSchema = mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
      }
    ],
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
  timestamps: true
  }
);

export default mongoose.model('Menu', menuSchema);
