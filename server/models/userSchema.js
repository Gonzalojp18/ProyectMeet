import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field can't be empty"]
    },
    email: {
      type: String,
      required: [true, "This field can't be empty"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "This field can't be empty"],
    },
    role: {
      type: String,
      enum: ['admin', 'manager'],
      default: 'manager'
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.users || mongoose.model('users', userSchema);