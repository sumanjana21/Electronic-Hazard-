// models/EWasteItem.ts
import mongoose from 'mongoose';

const EWasteItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deviceType: {
    type: String,
    required: true,
    enum: ['smartphone', 'laptop', 'tablet', 'desktop', 'other', 'electrical-wire' ]
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'good', 'fair', 'poor'],
    required: true
  },
  estimatedPrice: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['pending', 'listed', 'sold', 'removed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.EWasteItem || mongoose.model('EWasteItem', EWasteItemSchema);