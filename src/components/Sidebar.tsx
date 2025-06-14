
import React from 'react';
import { Card } from '@/components/ui/card';

export const Sidebar = () => {
  const features = [
    {
      title: "Human-Like Content",
      description: "No AI buzzwords or robotic language"
    },
    {
      title: "Platform Optimized",
      description: "Perfect formatting for Twitter and LinkedIn"
    },
    {
      title: "Audience Targeting",
      description: "Tailored content for specific industries and audiences"
    },
    {
      title: "Thread Generation",
      description: "Smart Twitter thread creation with character limits"
    }
  ];

  return (
    <aside className="w-80 p-6 bg-white border-r border-gray-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why GetXPilot?
          </h3>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Pro Tip
          </h4>
          <p className="text-sm text-blue-700">
            Be specific about your topic and target audience for the best results. 
            The more context you provide, the better your content will be.
          </p>
        </div>
      </div>
    </aside>
  );
};
