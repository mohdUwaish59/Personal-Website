'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatWidgetContextType {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
}

const ChatWidgetContext = createContext<ChatWidgetContextType | undefined>(undefined);

export function useChatWidget() {
  const context = useContext(ChatWidgetContext);
  if (context === undefined) {
    throw new Error('useChatWidget must be used within a ChatWidgetProvider');
  }
  return context;
}

interface ChatWidgetProviderProps {
  children: ReactNode;
}

export function ChatWidgetProvider({ children }: ChatWidgetProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatWidgetContext.Provider
      value={{
        isOpen,
        toggleChat,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
}