
import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Search, Users, Crown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatHistory {
  id: string;
  title: string;
  category: string;
}

export const ModernSidebar = () => {
  const [chatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'LinkedIn post about AI trends', category: 'Today' },
    { id: '2', title: 'X thread about startup funding', category: 'Today' },
    { id: '3', title: 'Professional networking tips', category: 'Yesterday' },
    { id: '4', title: 'Tech industry insights thread', category: 'Previous 7 days' },
    { id: '5', title: 'Remote work productivity tips', category: 'Previous 7 days' },
    { id: '6', title: 'Social media marketing strategy', category: 'Previous 7 days' },
    { id: '7', title: 'Personal branding for developers', category: 'Previous 7 days' },
    { id: '8', title: 'LinkedIn company culture post', category: 'Previous 30 days' },
    { id: '9', title: 'X thread about career advice', category: 'Previous 30 days' },
    { id: '10', title: 'Thought leadership content', category: 'Previous 30 days' },
    { id: '11', title: 'Industry conference insights', category: 'Previous 30 days' },
    { id: '12', title: 'Professional development tips', category: 'Previous 30 days' },
    { id: '13', title: 'Networking event follow-up', category: 'Previous 30 days' },
    { id: '14', title: 'Tech skills discussion', category: 'Previous 30 days' },
    { id: '15', title: 'Innovation in workplace', category: 'Previous 30 days' },
    { id: '16', title: 'Career transition story', category: 'Previous 30 days' },
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
    <Sidebar className="border-none bg-white text-gray-900 h-screen" side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-3 md:p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-base md:text-lg font-medium text-gray-900 group-data-[collapsible=icon]:hidden">SocialGPT</span>
          </div>
        </div>
        
        <div className="relative mb-3 md:mb-4 group-data-[collapsible=icon]:hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>

        <Button className="w-full bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-900 text-sm py-2 px-3 rounded-lg flex items-center justify-center space-x-2 group-data-[collapsible=icon]:hidden">
          <Plus className="w-4 h-4" />
          <span>New Content</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="flex-1 min-h-0">
        <ScrollArea className="h-full px-2">
          <SidebarMenu>
            {categories.map((category) => (
              <div key={category} className="mb-4">
                {groupedChats[category] && (
                  <>
                    <h3 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                      {category}
                    </h3>
                    {groupedChats[category].map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton className="w-full p-2 md:p-3 text-left hover:bg-gray-100 rounded-lg text-xs md:text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                          <div className="flex items-center space-x-2 md:space-x-3 w-full">
                            <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate group-data-[collapsible=icon]:hidden">{chat.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </>
                )}
              </div>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-3 md:p-4 flex-shrink-0">
        <div className="flex items-center space-x-2 md:space-x-3 text-gray-400 group-data-[collapsible=icon]:justify-center">
          <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 rounded-full"></div>
          <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 rounded-full group-data-[collapsible=icon]:hidden"></div>
          <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 rounded-full group-data-[collapsible=icon]:hidden"></div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
