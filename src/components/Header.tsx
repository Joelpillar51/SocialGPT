
import React from 'react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GetXPilot</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Clear Chat
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
