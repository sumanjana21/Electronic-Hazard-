import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, password, role } = body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Make sure JWT_SECRET is set
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });
    
    // Generate JWT token using jose
    const token = await new SignJWT({ 
      id: user._id.toString(), 
      email: user.email,
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(new TextEncoder().encode(secret));
    
    // Create the response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    
    // Set the cookie in the response
    response.cookies.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
    });
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}