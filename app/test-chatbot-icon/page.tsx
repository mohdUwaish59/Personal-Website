'use client';

import React from 'react';
import ChatWidget from '@/components/chatbot/ChatWidget';
import { ChatIcon, ChatBubbleIcon, ModernChatIcon, RobustChatIcon, FallbackChatIcon, LogoChatIcon, StyledLogoChatIcon } from '@/components/chatbot/ChatIcon';

export default function TestChatbotIconPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Chatbot Icon Test Page
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Icon Variants
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                <ChatIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ChatIcon</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full">
                <ChatBubbleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ChatBubbleIcon</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-purple-100 dark:bg-purple-900 rounded-full">
                <ModernChatIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ModernChatIcon</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <RobustChatIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">RobustChatIcon</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-full">
                <FallbackChatIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">FallbackChatIcon</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                <LogoChatIcon 
                  className="h-12 w-12" 
                  size={48}
                  logoSrc="/logo.png"
                  alt="Logo Chat Icon"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">LogoChatIcon</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <StyledLogoChatIcon 
                  className="h-12 w-12" 
                  size={48}
                  logoSrc="/logo.png"
                  alt="Styled Logo Chat Icon"
                  showBorder={true}
                  borderColor="rgba(255, 255, 255, 0.4)"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">StyledLogoChatIcon</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Button Examples
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white'
              }}
            >
              <RobustChatIcon 
                className="h-7 w-7 group-hover:scale-110 transition-transform duration-200"
                size={28}
              />
            </button>
            
            <button className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <ChatBubbleIcon className="h-6 w-6" />
            </button>
            
            <button className="w-14 h-14 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <ModernChatIcon className="h-6 w-6" />
            </button>
            
            <button className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <FallbackChatIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Live ChatWidget
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The actual ChatWidget component should appear in the bottom-right corner of the page.
            If you see a proper chat icon (not a black/white circle), then the fix is working!
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ✅ Icon should be visible and colorful<br/>
              ✅ Icon should have a gradient blue background<br/>
              ✅ Icon should scale on hover<br/>
              ✅ Icon should work in both light and dark modes
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Different Sizes Test
          </h2>
          
          <div className="flex items-center gap-4">
            <RobustChatIcon className="h-4 w-4 text-blue-600" size={16} />
            <RobustChatIcon className="h-6 w-6 text-blue-600" size={24} />
            <RobustChatIcon className="h-8 w-8 text-blue-600" size={32} />
            <RobustChatIcon className="h-12 w-12 text-blue-600" size={48} />
            <RobustChatIcon className="h-16 w-16 text-blue-600" size={64} />
          </div>
        </div>
      </div>

      {/* The actual ChatWidget */}
      <ChatWidget />
    </div>
  );
}