
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ModernSidebar } from '@/components/ModernSidebar';
import { ModernHeader } from '@/components/ModernHeader';
import { ModernChatInterface } from '@/components/ModernChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <ModernSidebar />
          <div className="flex-1 flex flex-col">
            <ModernHeader />
            <ModernChatInterface />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
