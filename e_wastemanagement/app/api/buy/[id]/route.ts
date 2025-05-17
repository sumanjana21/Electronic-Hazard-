// app/api/buy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import EWasteItem from '@/models/EWasteItem';
import { connectDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const deviceType = searchParams.get('deviceType') || undefined;
    const condition = searchParams.get('condition') || undefined;
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '1000');
    const search = searchParams.get('search') || '';

    // Construct filter object
    const filter: any = {
      status: 'pending', // Only show available items
      estimatedPrice: { 
        $gte: minPrice, 
        $lte: maxPrice 
      }
    };

    // Add device type filter if specified
    if (deviceType) {
      filter.deviceType = deviceType;
    }

    // Add condition filter if specified
    if (condition) {
      filter.condition = condition;
    }

    // Add search filter
    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch items with filtering
    const items = await EWasteItem.find(filter)
      .sort({ createdAt: -1 }) // Sort by most recent first
      .limit(50); // Limit to 50 items to prevent overwhelming response

    return NextResponse.json({ 
      items, 
      total: items.length 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching e-waste items:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch e-waste items',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}