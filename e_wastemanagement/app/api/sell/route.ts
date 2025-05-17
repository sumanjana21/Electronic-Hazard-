import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import EWasteItem from '@/models/EWasteItem';
import { estimateEWastePrice } from '@/lib/utils/price-estimator';
import { connectDB } from '@/lib/db';
import { jwtVerify } from 'jose';

// Helper function to verify token
async function verifyToken(request: NextRequest) {
  let token: string | undefined;

  // First try to get token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } 
  // If not found, try to get from cookie
  else {
    const cookie = request.cookies.get('accessToken');
    token = cookie?.value;
  }

  if (!token) {
    throw new Error('Unauthorized: No token provided');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not defined');
  }

  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload.id as string;
}

// GET: Retrieve user's sell items
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const userId = await verifyToken(request);

    // Find all items for the user
    const items = await EWasteItem.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('Error retrieving sell items:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve sell items',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}

// POST: Create new sell item
export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const userId = await verifyToken(request);

    // Parse the incoming JSON data
    const data = await request.json();

    // Estimate price using your estimation function
    const estimatedPrice = estimateEWastePrice(data.deviceType, data.condition);

    // Create new e-waste item
    const newItem = new EWasteItem({
      ...data,
      userId,
      estimatedPrice,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Save the item
    const savedItem = await newItem.save();

    return NextResponse.json(savedItem, { status: 201 });
  } catch (error) {
    console.error('Error creating e-waste item:', error);
    return NextResponse.json({ 
      error: 'Failed to create e-waste item',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}

