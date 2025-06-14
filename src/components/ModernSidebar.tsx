
import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Trash2, Edit3 } from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export const ModernSidebar = () => {
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Twitter Thread about AI',
      lastMessage: 'Generate a Twitter thread about AI productivity tools...',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '2',
      title: 'LinkedIn Post Strategy',
      lastMessage: 'Create a LinkedIn post about remote work trends...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      title: 'Content Marketing Ideas',
      lastMessage: 'Help me brainstorm content ideas for tech startup...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs md:text-sm">X</span>
            </div>
            <span className="font-bold text-base md:text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              XPilot
            </span>
          </div>
        </div>
        <Button className="w-full mt-3 md:mt-4 bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 text-sm md:text-base">
          <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <div className="space-y-1">
          <h3 className="px-2 md:px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Recent Chats
          </h3>
          <SidebarMenu>
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton className="w-full p-2 md:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                  <div className="flex items-start space-x-2 md:space-x-3 w-full">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {chat.title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 md:ml-2 hidden sm:block">
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1 hidden md:block">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 hidden md:flex">
                      <Button variant="ghost" size="sm" className="h-5 w-5 md:h-6 md:w-6 p-0">
                        <Edit3 className="w-2 h-2 md:w-3 md:h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-5 w-5 md:h-6 md:w-6 p-0 text-red-500 hover:text-red-600">
                        <Trash2 className="w-2 h-2 md:w-3 md:h-3" />
                      </Button>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-3 md:p-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-2 md:p-3 border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 text-xs md:text-sm mb-1">
            ✨ Pro Tip
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-200">
            Be specific about your audience and platform for the best results!
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
