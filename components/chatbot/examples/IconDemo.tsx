'use client';

import React from 'react';
import { ChatIcon, ChatBubbleIcon, ModernChatIcon } from '../ChatIcon';
import { Button } from '@/components/ui/button';

export default function IconDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Chat Icon Demo</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Icon Variants</h2>
        
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="text-center">
            <ChatIcon className="h-8 w-8 text-blue-600" />
            <p className="text-sm mt-2">ChatIcon</p>
          </div>
          
          <div className="text-center">
            <ChatBubbleIcon className="h-8 w-8 text-green-600" />
            <p className="text-sm mt-2">ChatBubbleIcon</p>
          </div>
          
          <div className="text-center">
            <ModernChatIcon className="h-8 w-8 text-purple-600" />
            <p className="text-sm mt-2">ModernChatIcon</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Different Sizes</h2>
        
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <ModernChatIcon className="h-4 w-4 text-blue-600" size={16} />
          <ModernChatIcon className="h-6 w-6 text-blue-600" size={24} />
          <ModernChatIcon className="h-8 w-8 text-blue-600" size={32} />
          <ModernChatIcon className="h-12 w-12 text-blue-600" size={48} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Button Examples</h2>
        
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white'
            }}
          >
            <ModernChatIcon 
              className="h-7 w-7 group-hover:scale-110 transition-transform duration-200"
              size={28}
            />
          </Button>
          
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white"
          >
            <ChatBubbleIcon 
              className="h-6 w-6"
              size={24}
            />
          </Button>
          
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
          >
            <ChatIcon 
              className="h-6 w-6"
              size={24}
            />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Dark Mode Test</h2>
        
        <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
          <ModernChatIcon className="h-8 w-8 text-white" size={32} />
          <ChatBubbleIcon className="h-8 w-8 text-gray-300" size={32} />
          <ChatIcon className="h-8 w-8 text-blue-400" size={32} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Animation Test</h2>
        
        <div className="flex items-center gap-4">
          <div className="animate-pulse">
            <ModernChatIcon className="h-8 w-8 text-blue-600" size={32} />
          </div>
          
          <div className="animate-bounce">
            <ChatBubbleIcon className="h-8 w-8 text-green-600" size={32} />
          </div>
          
          <div className="hover:rotate-12 transition-transform duration-200">
            <ChatIcon className="h-8 w-8 text-purple-600" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}