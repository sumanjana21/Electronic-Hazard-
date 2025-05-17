import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Coupon, ICoupon } from '@/models/Coupon';
import User from '@/models/User'; 
import mongoose from 'mongoose';

interface CouponData {
  code: string;
  discountType: string;
  discountValue: number;
  expiryDate: Date;
  maxUsageLimit: number;
  isActive: boolean;
  createdBy: string; 
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log('Received Coupon Data:', body);

    // Find or create a default admin user
    let adminUser = await User.findOne({ role: 'admin' });
    
    // If no admin user exists, create a default system admin
    if (!adminUser) {
      adminUser = new User({
        name: 'System Admin',
        email: 'system.admin@example.com',
        role: 'admin'
      });
      await adminUser.save();
    }

    // Validate input
    if (!body.code || !body.discountType || !body.discountValue || !body.expiryDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: body.code });
    if (existingCoupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon code already exists' },
        { status: 409 }
      );
    }

    // Prepare coupon data
    const couponData: Partial<ICoupon> = {
      code: body.code,
      discountType: body.discountType,
      discountValue: body.discountValue,
      expirationDate: new Date(body.expiryDate),
      usageLimit: body.maxUsageLimit || 100,
      minPurchaseAmount: body.minPurchaseAmount || 0,
      createdBy: adminUser._id,
      status: body.isActive ? 'active' : 'disabled'
    };

    // Create new coupon
    const newCoupon = new Coupon(couponData);

    // Save coupon
    await newCoupon.save();

    return NextResponse.json(
      { 
        success: true, 
        coupon: {
          ...newCoupon.toObject(),
          _id: newCoupon._id.toString() // Convert ObjectId to string for JSON serialization
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Coupon creation error:', error);
    
    // More detailed error handling
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation Error',
          errors: Object.values(error.errors).map(err => err.message)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Fetch all coupons
export async function GET(request: Request) {
  try {
    await connectDB();

    // Fetch all coupons and populate the createdBy field
    const coupons = await Coupon.find({}).populate('createdBy', 'name email');

    return NextResponse.json(
      { 
        success: true, 
        coupons: coupons.map(coupon => ({
          ...coupon.toObject(),
          _id: coupon._id.toString(),
          createdBy: coupon.createdBy ? {
            _id: coupon.createdBy._id.toString(),
            name: coupon.createdBy.name,
            email: coupon.createdBy.email
          } : null
        }))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch coupons error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Update a coupon
export async function PUT(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Coupon ID is required' },
        { status: 400 }
      );
    }

    // Find and update coupon
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedCoupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, coupon: updatedCoupon },
      { status: 200 }
    );
  } catch (error) {
    console.error('Coupon update error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Delete a coupon
export async function DELETE(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Coupon ID is required' },
        { status: 400 }
      );
    }

    // Delete coupon
    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Coupon deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Coupon deletion error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}