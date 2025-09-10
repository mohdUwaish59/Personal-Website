import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Message from '../Message';
import { Message as MessageType } from '@/lib/chatbot/types';

describe('Message', () => {
  const mockUserMessage: MessageType = {
    id: '1',
    content: 'Hello, this is a user message',
    sender: 'user',
    timestamp: new Date('2024-01-01T12:00:00Z'),
    type: 'text'
  };

  const mockBotMessage: MessageType = {
    id: '2',
    content: 'Hello, this is a bot response',
    sender: 'bot',
    timestamp: new Date('2024-01-01T12:01:00Z'),
    type: 'text'
  };

  it('renders user message correctly', () => {
    render(<Message message={mockUserMessage} isBot={false} />);
    
    expect(screen.getByText('Hello, this is a user message')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });

  it('renders bot message correctly', () => {
    render(<Message message={mockBotMessage} isBot={true} />);
    
    expect(screen.getByText('Hello, this is a bot response')).toBeInTheDocument();
    expect(screen.getByText('12:01 PM')).toBeInTheDocument();
  });

  it('renders typing indicator for typing messages', () => {
    const typingMessage: MessageType = {
      id: '3',
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      type: 'typing'
    };

    render(<Message message={typingMessage} isBot={true} />);
    
    expect(screen.getByText('Typing...')).toBeInTheDocument();
  });

  it('applies correct styling for user vs bot messages', () => {
    const { rerender } = render(<Message message={mockUserMessage} isBot={false} />);
    
    // User message should be right-aligned
    expect(screen.getByText('Hello, this is a user message').closest('div')).toHaveClass('bg-primary');
    
    rerender(<Message message={mockBotMessage} isBot={true} />);
    
    // Bot message should be left-aligned
    expect(screen.getByText('Hello, this is a bot response').closest('div')).toHaveClass('bg-muted');
  });
});