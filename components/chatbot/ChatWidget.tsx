'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message as MessageType, ConversationContext } from '@/lib/chatbot/types';
import { ClientAIService } from '@/lib/chatbot/services/client-ai-service';
import { ConversationManager } from '@/lib/chatbot/services/conversation-manager';
import ChatInterface from './ChatInterface';
import { Button } from '@/components/ui/button';
import { X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyledLogoChatIcon } from './ChatIcon';
import styles from './ChatWidget.module.css';

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export default function ChatWidget({
  isOpen: controlledIsOpen,
  onToggle,
  className
}: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clientAIService] = useState(() => new ClientAIService());
  const [context, setContext] = useState<ConversationContext>(() => 
    ConversationManager.createFreshContext()
  );

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  // Load conversation context on mount
  useEffect(() => {
    if (ConversationManager.isStorageAvailable()) {
      const resumedContext = ConversationManager.resumeOrStartConversation();
      setContext(resumedContext);
      setMessages(resumedContext.messages);
    }
  }, []);

  // Generate unique message ID
  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Handle sending messages
  const handleSendMessage = useCallback(async (content: string) => {
    try {
      // Create user message
      const userMessage: MessageType = {
        id: generateMessageId(),
        content,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      // Update messages and context with proper management
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      let updatedContext = ConversationManager.addMessageToContext(context, userMessage);
      
      // Handle context limits gracefully
      updatedContext = ConversationManager.handleContextLimits(updatedContext);
      setContext(updatedContext);

      setIsLoading(true);

      // Add typing indicator
      const typingMessage: MessageType = {
        id: generateMessageId(),
        content: '',
        sender: 'bot',
        timestamp: new Date(),
        type: 'typing'
      };

      setMessages(prev => [...prev, typingMessage]);

      // Send message to AI service and get response
      const { message: botResponse, context: updatedContextFromServer } = await clientAIService.sendMessage(content);

      // Remove typing indicator and add bot response
      setMessages(prev => prev.filter(msg => msg.type !== 'typing').concat(botResponse));
      
      // Update context with server response
      setContext(updatedContextFromServer);

      setIsLoading(false);
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Remove typing indicator and show error message
      let errorContent = "I'm sorry, I encountered an error processing your message. Please try again!";
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('Too many messages')) {
          errorContent = "You're sending messages too quickly! Please wait a moment before sending another message.";
        } else if (error.message.includes('Network error')) {
          errorContent = "Network error. Please check your connection and try again.";
        } else if (error.message.includes('Server error')) {
          errorContent = "Server error. Please try again in a moment.";
        }
      }
      
      const errorMessage: MessageType = {
        id: generateMessageId(),
        content: errorContent,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => prev.filter(msg => msg.type !== 'typing').concat(errorMessage));
      setIsLoading(false);
    }
  }, [messages, context, clientAIService]);

  // Reset conversation with proper session management
  const handleResetConversation = useCallback(() => {
    ConversationManager.clearContext();
    const newSessionContext = ConversationManager.startNewSession();
    setContext(newSessionContext);
    setMessages(newSessionContext.messages);
  }, []);

  return (
    <div className={cn('fixed bottom-4 right-4 z-50', className)}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-open"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-background border rounded-lg shadow-2xl w-80 sm:w-96 h-[500px] sm:h-[600px] flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium text-sm">Chat with Mohd Uwaish</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleResetConversation}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  title="Reset conversation"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggle}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              onClick={handleToggle}
              className={cn(styles.chatButton, "group")}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              }}
              aria-label="Open chat"
            >
              <StyledLogoChatIcon 
                className={cn(styles.chatIcon, "relative z-10")}
                size={32}
                logoSrc="/favicon/favicon.png" // Change this to your logo path
                alt="Mohd Uwaish - Chat"
                showBorder={true}
                borderColor="rgba(255, 255, 255, 0.3)"
              />
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            {/* Notification badge (optional - can be used for unread messages) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={styles.notificationBadge}
            >
              <span>💬</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm sm:hidden -z-10"
            onClick={handleToggle}
          />
        )}
      </AnimatePresence>
    </div>
  );
}