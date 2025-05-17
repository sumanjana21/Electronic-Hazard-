import { NextRequest, NextResponse } from 'next/server';
import EWasteItem from '@/models/EWasteItem';
import { connectDB } from '@/lib/db';
import { estimateEWastePrice } from '@/lib/utils/price-estimator';
import { jwtVerify } from 'jose';

// Force dynamic route handling
export const dynamic = 'force-dynamic';

// Helper function remains the same
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

// Unified approach for all methods
export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET');
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE');
}

async function handleRequest(request: NextRequest, method: string) {
  await connectDB();
  
  try {
    // Extract ID from URL path
    const pathSegments = new URL(request.url).pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    const userId = await verifyToken(request);

    switch (method) {
      case 'GET':
        const item = await EWasteItem.findOne({ _id: id, userId });
        return item 
          ? NextResponse.json(item, { status: 200 })
          : NextResponse.json({ error: 'Item not found' }, { status: 404 });

      case 'PUT':
        const putData = await request.json();
        const updatedItem = await EWasteItem.findOneAndUpdate(
          { _id: id, userId },
          {
            ...putData,
            estimatedPrice: putData.deviceType 
              ? estimateEWastePrice(putData.deviceType, putData.condition)
              : undefined,
            updatedAt: new Date()
          },
          { new: true }
        );
        return NextResponse.json(updatedItem, { status: 200 });

      case 'DELETE':
        const deletedItem = await EWasteItem.findOneAndDelete({ _id: id, userId });
        return deletedItem
          ? NextResponse.json({ message: 'Item deleted' }, { status: 200 })
          : NextResponse.json({ error: 'Item not found' }, { status: 404 });

      default:
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: method === 'GET' ? 'Item not found' : `${method} failed` },
      { status: method === 'GET' ? 404 : 400 }
    );
  }
}