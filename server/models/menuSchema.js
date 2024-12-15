import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field can't be empty"]
    },
    description: {
      type: String,
      required: [true, "This field can't be empty"],
    },
    prices: {
      location1: { type: Number, required: [true, "This field can't be empty"], },
      location2: { type: Number, required: [true, "This field can't be empty"], }
    },
    image: {
      type: String
    },
    isAvailable: {
      type: Boolean, default: true
    }
  }
);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field can't be empty"]
    },
    subtitle: String,
    style: {
      type: String,
      enum: ['default', 'compact', 'featured'],
      default: 'default'
    },
    image: {
      url: String,
      position: { type: String, enum: ['top', 'bottom', 'beside-title'] },
      alt: String
    },
    items: [itemSchema],
    order: {
      type: Number,
      required: [true, "This field can't be empty"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
);

const locationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  }
);

const menuSchema = mongoose.Schema(
  {
    categories: [categorySchema],
    locations: [locationSchema],
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model.menus || mongoose.model('menus', menuSchema);