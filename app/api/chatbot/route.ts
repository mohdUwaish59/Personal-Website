import { NextRequest, NextResponse } from 'next/server';
import { MessageHandler } from '@/lib/chatbot/services/message-handler';

// Initialize message handler
const messageHandler = new MessageHandler();

export async function POST(request: NextRequest) {
  try {
    const { message, clientId } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long' },
        { status: 400 }
      );
    }

    // Process message and get response
    const response = await messageHandler.processMessage(message, clientId || 'default');

    return NextResponse.json({
      success: true,
      message: response,
      context: messageHandler.getContext()
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Rate limit exceeded')) {
        return NextResponse.json(
          { error: 'Too many messages. Please wait before sending another.' },
          { status: 429 }
        );
      }
      
      if (error.message.includes('Invalid message content')) {
        return NextResponse.json(
          { error: 'Invalid message content' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get AI service status
    const aiStatus = messageHandler.getAIStatus();
    
    return NextResponse.json({
      success: true,
      status: {
        ai: aiStatus,
        rateLimits: {
          maxRequestsPerMinute: 10,
          windowMs: 60000
        }
      }
    });
  } catch (error) {
    console.error('Chatbot Status API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}