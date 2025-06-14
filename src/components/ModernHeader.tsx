
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Moon, Sun, Sparkles } from 'lucide-react';

export const ModernHeader = () => {
  const [isDark, setIsDark] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <SidebarTrigger />
            <div className="hidden lg:flex items-center space-x-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                AI-powered content generation for social media
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white h-8 w-8 md:h-9 md:w-9"
            >
              {isDark ? <Sun className="w-3 h-3 md:w-4 md:h-4" /> : <Moon className="w-3 h-3 md:w-4 md:h-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm hidden sm:block">
              Clear Chat
            </Button>
            <Button size="sm" className="bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 text-xs md:text-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Upgrade Pro</span>
              <span className="sm:hidden">Pro</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
