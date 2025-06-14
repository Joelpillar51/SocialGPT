
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
import { Plus, MessageSquare, Search, Activity } from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  category: string;
}

export const ModernSidebar = () => {
  const [chatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Improve Balance Reach.', category: 'Today' },
    { id: '2', title: 'Birthday wish for a friend.', category: 'Today' },
    { id: '3', title: 'UI Design feedback request', category: 'Yesterday' },
    { id: '4', title: 'UI Design feedback request', category: 'Previous 7 days' },
    { id: '5', title: 'Kafka topics', category: 'Previous 7 days' },
    { id: '6', title: 'Kafka messaging summary', category: 'Previous 7 days' },
    { id: '7', title: 'Kafka for Uber, Netflix', category: 'Previous 7 days' },
    { id: '8', title: 'New Chat', category: 'Previous 30 days' },
    { id: '9', title: 'New Chat', category: 'Previous 30 days' },
    { id: '10', title: 'Design Sprint Brief', category: 'Previous 30 days' },
    { id: '11', title: 'Design Invoice', category: 'Previous 30 days' },
    { id: '12', title: 'Employee Management app...', category: 'Previous 30 days' },
    { id: '13', title: 'New Chat', category: 'Previous 30 days' },
    { id: '14', title: 'Flutter', category: 'Previous 30 days' },
    { id: '15', title: 'Springboot Explained', category: 'Previous 30 days' },
    { id: '16', title: 'Resume Update', category: 'Previous 30 days' },
  ]);

  const groupedChats = chatHistory.reduce((acc, chat) => {
    if (!acc[chat.category]) {
      acc[chat.category] = [];
    }
    acc[chat.category].push(chat);
    return acc;
  }, {} as Record<string, ChatHistory[]>);

  const categories = ['Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days'];

  return (
    <Sidebar className="border-none bg-gray-900 text-white" side="left" variant="sidebar" collapsible="none">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-medium text-white">Activity</span>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
          />
        </div>

        <Button className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white text-sm py-2 px-3 rounded-lg flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {categories.map((category) => (
            <div key={category} className="mb-4">
              {groupedChats[category] && (
                <>
                  <h3 className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {category}
                  </h3>
                  {groupedChats[category].map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton className="w-full p-3 text-left hover:bg-gray-800 rounded-lg text-sm text-gray-300 hover:text-white transition-colors group">
                        <div className="flex items-center space-x-3 w-full">
                          <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{chat.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 text-gray-400">
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
