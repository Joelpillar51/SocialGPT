
import React from 'react';
import { Crown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromptUsageDisplayProps {
  userPlan: 'free' | 'pro';
  usageText: string;
  remainingPrompts: string | number;
  canSubmit: boolean;
}

export const PromptUsageDisplay: React.FC<PromptUsageDisplayProps> = ({
  userPlan,
  usageText,
  remainingPrompts,
  canSubmit
}) => {
  if (userPlan === 'pro') {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-2">
        <Crown className="w-4 h-4 text-yellow-500" />
        <span>{usageText}</span>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-2">
        <span>{usageText}</span>
      </div>
      
      {!canSubmit && (
        <div className="flex items-center justify-center space-x-2 p-3 bg-red-900/20 border border-red-800 rounded-lg mb-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm">Daily prompt limit reached</span>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 ml-2">
            <Crown className="w-4 h-4 mr-1" />
            Upgrade to Pro
          </Button>
        </div>
      )}
    </div>
  );
};
