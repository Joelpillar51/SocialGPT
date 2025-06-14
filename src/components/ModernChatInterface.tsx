import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Activity, Twitter, Users, AlertTriangle, Crown } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ModernChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);

    // Simulate AI response
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockResponse = (input: string) => {
    return `Here's engaging content based on your request: "${input}"

🧵 **X (Twitter) Thread Strategy**

1/ The future of remote work isn't just about location flexibility - it's about redefining productivity entirely.

2/ Traditional 9-5 schedules were built for industrial-age work. Knowledge work operates on a different rhythm.

3/ The companies thriving post-2020 aren't the ones forcing employees back to offices. They're the ones who cracked the code on async collaboration.

4/ Remote-first doesn't mean "work from anywhere chaos." It means intentional systems, clear communication, and results-focused culture.

5/ The productivity paradox: when you stop measuring hours and start measuring outcomes, both employee satisfaction AND business results improve.

**What's your experience with remote work productivity?** 

---

**LinkedIn Version:**
The remote work revolution has fundamentally changed how we think about productivity. Companies that embrace outcome-based performance over time-based metrics are seeing unprecedented results in both employee satisfaction and business growth.

Key insights:
• Async collaboration tools are now essential infrastructure
• Clear communication protocols matter more than physical presence  
• Results-focused culture drives innovation

What strategies has your organization implemented for remote productivity?`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-800">
      {/* Upgrade Button at the top */}
      <div className="p-4 border-b border-gray-700">
        <div className="max-w-3xl mx-auto flex justify-end">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-40">
        {messages.length === 0 ? (
          <div className="text-center py-20 max-w-3xl mx-auto px-6">
            <h1 className="text-4xl font-light text-white mb-12">
              SocialGPT
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Examples</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-sm text-gray-300 cursor-pointer transition-colors">
                    "Create a thread about AI productivity tools for developers"
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-sm text-gray-300 cursor-pointer transition-colors">
                    "LinkedIn post about remote work trends in 2024"
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-sm text-gray-300 cursor-pointer transition-colors">
                    "Engaging X thread about startup fundraising tips"
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Capabilities</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    Creates platform-optimized content for X and LinkedIn
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    Generates engaging threads with proper character limits
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    Tailors tone and style for professional or casual audiences
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Limitations</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    Content should be reviewed for brand voice and compliance
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    May need adjustment for specific industry terminology
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                    Always verify facts and statistics before posting
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 max-w-3xl mx-auto px-6 py-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-400 text-sm">Generating content...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Input Area - Better aligned */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-end bg-gray-700 rounded-2xl border border-gray-600 p-3">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your content idea (e.g., 'LinkedIn post about AI in healthcare' or 'X thread about startup lessons')"
                className="flex-1 min-h-[24px] max-h-[120px] resize-none border-0 bg-transparent text-white placeholder-gray-400 focus:ring-0 focus:outline-none p-0 text-base leading-6"
                disabled={isGenerating}
                rows={1}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                className="ml-3 h-8 w-8 p-0 bg-gray-600 hover:bg-gray-500 rounded-lg flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
