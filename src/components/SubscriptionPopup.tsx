
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Check, Sparkles } from 'lucide-react';

interface SubscriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionPopup = ({ isOpen, onClose }: SubscriptionPopupProps) => {
  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // This would integrate with your payment system
    console.log(`Subscribing to ${plan} plan`);
    // Add your payment integration logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Upgrade to Pro
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Free Plan */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Free</h3>
              <div className="text-3xl font-bold text-white mb-1">$0</div>
              <div className="text-gray-400 text-sm">per month</div>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                5 prompts per day
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                Basic content generation
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                X (Twitter) & LinkedIn formats
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                Community support
              </li>
            </ul>
            
            <Button 
              variant="outline" 
              className="w-full border-gray-600 text-gray-400 hover:bg-gray-700"
              disabled
            >
              Current Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>
            
            <div className="text-center mb-6 mt-2">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center">
                <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                Pro
              </h3>
              <div className="text-3xl font-bold text-white mb-1">$19</div>
              <div className="text-gray-300 text-sm">per month</div>
              <div className="text-xs text-gray-400 mt-1">Save 20% with yearly billing</div>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-white">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Unlimited prompts
              </li>
              <li className="flex items-center text-white">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Advanced AI models
              </li>
              <li className="flex items-center text-white">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Priority support
              </li>
              <li className="flex items-center text-white">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Custom templates
              </li>
              <li className="flex items-center text-white">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Analytics & insights
              </li>
              <li className="flex items-center text-white">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Export to multiple formats
              </li>
            </ul>
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleSubscribe('monthly')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Subscribe Monthly - $19
              </Button>
              <Button 
                onClick={() => handleSubscribe('yearly')}
                variant="outline"
                className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10"
              >
                Subscribe Yearly - $15/month
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">Save 20%</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>All plans include a 7-day free trial. Cancel anytime.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
