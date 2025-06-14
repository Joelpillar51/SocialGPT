
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ContentForm } from '@/components/ContentForm';
import { OutputDisplay } from '@/components/OutputDisplay';
import { Sidebar } from '@/components/Sidebar';

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                GetXPilot
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                AI-powered content generator for Twitter and LinkedIn. 
                Create engaging, human-like posts that resonate with your audience.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <ContentForm 
                onGenerate={setGeneratedContent}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
              />
              <OutputDisplay 
                content={generatedContent}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
