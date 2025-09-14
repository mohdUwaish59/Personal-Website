'use client';

import { Message as MessageType } from '@/lib/chatbot/types';
import { Avatar, AvatarFallback, AvatarImage  } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageProps {
  message: MessageType;
  isBot: boolean;
}

export default function Message({ message, isBot }: MessageProps) {
  const formatTime = (timestamp: Date | string) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      console.warn('Invalid timestamp format:', timestamp);
      // Fallback to current time if timestamp is invalid
      return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 animate-in fade-in-0 slide-in-from-bottom-2',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      {isBot && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="/favicon/favicon.png" alt="Bot" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          'flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]',
          isBot ? 'items-start' : 'items-end'
        )}
      >
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm break-words',
            isBot
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary text-primary-foreground'
          )}
        >
          {message.type === 'typing' ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
              </div>
              <span className="ml-2 text-xs opacity-70">Typing...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {!isBot && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}