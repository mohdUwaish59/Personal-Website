import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hero from '@/lib/models/Hero';

// Mark as dynamic to skip during build
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB not configured' },
        { status: 503 }
      );
    }

    await connectDB();
    // Get the first (and should be only) hero document
    const hero = await Hero.findOne();
    
    if (!hero) {
      return NextResponse.json(
        { error: 'Hero section not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero section' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB not configured' },
        { status: 503 }
      );
    }

    await connectDB();
    const body = await request.json();
    
    // Update or create the hero document
    const hero = await Hero.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error updating hero:', error);
    return NextResponse.json(
      { error: 'Failed to update hero section' },
      { status: 500 }
    );
  }
}
