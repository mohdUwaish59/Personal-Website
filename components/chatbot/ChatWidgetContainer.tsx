'use client';

import ChatWidget from './ChatWidget';
import { useChatWidget } from './ChatWidgetProvider';

export default function ChatWidgetContainer() {
  const { isOpen, toggleChat } = useChatWidget();

  return (
    <ChatWidget
      isOpen={isOpen}
      onToggle={toggleChat}
    />
  );
}