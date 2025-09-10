import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatWidget from '../ChatWidget';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('ChatWidget', () => {
  it('renders chat button when closed', () => {
    render(<ChatWidget />);
    
    const chatButton = screen.getByRole('button');
    expect(chatButton).toBeInTheDocument();
  });

  it('opens chat interface when button is clicked', () => {
    render(<ChatWidget />);
    
    const chatButton = screen.getByRole('button');
    fireEvent.click(chatButton);
    
    expect(screen.getByText('Chat with Mohd Uwaish')).toBeInTheDocument();
  });

  it('displays welcome message when no messages', () => {
    render(<ChatWidget isOpen={true} />);
    
    expect(screen.getByText("Hi! I'm Mohd Uwaish")).toBeInTheDocument();
    expect(screen.getByText('Ask me anything about my skills, experience, or projects!')).toBeInTheDocument();
  });

  it('allows sending messages', () => {
    render(<ChatWidget isOpen={true} />);
    
    const input = screen.getByPlaceholderText('Ask me about my skills, experience, or projects...');
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});