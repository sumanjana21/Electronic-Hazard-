import mongoose from 'mongoose';

// Coupon status types
export type CouponStatus = 'active' | 'expired' | 'disabled';

// Coupon type definition
export interface ICoupon extends mongoose.Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount?: number;
  startDate: Date;
  expirationDate: Date;
  usageLimit: number;
  currentUsageCount: number;
  status: CouponStatus;
  createdBy: mongoose.Types.ObjectId; // Admin who created the coupon
}

// Mongoose Schema for Coupon
const CouponSchema = new mongoose.Schema<ICoupon>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minPurchaseAmount: {
    type: Number,
    default: 0
  },
  maxDiscountAmount: {
    type: Number,
    default: null
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: 100 // Default usage limit
  },
  currentUsageCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'disabled'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Pre-save hook to update status based on dates and usage
CouponSchema.pre('save', function(next) {
  const now = new Date();
  
  // Check if coupon is expired
  if (now > this.expirationDate) {
    this.status = 'expired';
  }
  
  // Check if usage limit is reached
  if (this.currentUsageCount >= this.usageLimit) {
    this.status = 'expired';
  }
  
  next();
});

// Create and export the Coupon model
export const Coupon = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);