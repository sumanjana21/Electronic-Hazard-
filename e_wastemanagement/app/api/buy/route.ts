import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import EWasteItem from '@/models/EWasteItem';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters for comprehensive filtering
    const deviceType = searchParams.get('deviceType') || undefined;
    const condition = searchParams.get('condition') || undefined;
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '1000000');
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Construct filter object
    const filter: any = {
      status: 'pending',
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

    // Add comprehensive search filter
    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { deviceType: { $regex: search, $options: 'i' } },
        { condition: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch total count for pagination
    const totalItems = await EWasteItem.countDocuments(filter);

    // Fetch paginated items with filtering
    const items = await EWasteItem.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ 
      items, 
      total: totalItems,
      page,
      totalPages: Math.ceil(totalItems / limit)
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching e-waste items:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch e-waste items',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}