
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ModernSidebar } from '@/components/ModernSidebar';
import { ModernChatInterface } from '@/components/ModernChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-800">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <ModernSidebar />
          <div className="flex-1 flex flex-col">
            <ModernChatInterface />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
