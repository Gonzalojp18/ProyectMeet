import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  prices: {
    location1: { type: Number, required: true },
    location2: { type: Number, required: true }
  },
  image: { type: String },
  isAvailable: { type: Boolean, default: true }
});

const promotionSchema = new mongoose.Schema({
  type: { type: String, enum: ['featured-item', 'info-banner'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  image: String,
  backgroundColor: String,
  icon: String,
  action: {
    text: String,
    link: String
  },
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: String,
  style: { type: String, enum: ['default', 'compact', 'featured'], default: 'default' },
  image: {
    url: String,
    position: { type: String, enum: ['top', 'bottom', 'beside-title'] },
    alt: String
  },
  promotion: promotionSchema,
  items: [itemSchema],
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  qrCode: String,
  address: String,
  defaultLocation: { type: Boolean, default: false }
});

const menuSchema = new mongoose.Schema({
  categories: [categorySchema],
  locations: [locationSchema],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Menu', menuSchema);