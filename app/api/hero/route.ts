import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hero from '@/lib/models/Hero';

export async function GET() {
  try {
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
