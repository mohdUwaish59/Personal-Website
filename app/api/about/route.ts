import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import About from '@/lib/models/About';

export async function GET() {
  try {
    await connectDB();
    // Get the first (and should be only) about document
    const about = await About.findOne();
    
    if (!about) {
      return NextResponse.json(
        { error: 'About section not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about section' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Update or create the about document
    const about = await About.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error updating about:', error);
    return NextResponse.json(
      { error: 'Failed to update about section' },
      { status: 500 }
    );
  }
}
