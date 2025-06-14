
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Copy, Check, Sparkles, Zap, Target } from 'lucide-react';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

🧵 **Twitter Thread Strategy**

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

  const handleCopy = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-8">
        {messages.length === 0 ? (
          <div className="text-center py-8 md:py-16 max-w-2xl mx-auto">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4">
              GetXPilot
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed px-2">
              Generate engaging Twitter threads and LinkedIn posts that sound natural and human. 
              Just describe what you want to say, and I'll create platform-optimized content.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12">
              <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mb-2 md:mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 md:mb-2 text-sm md:text-base">Lightning Fast</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Generate content in seconds with AI-powered optimization</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-purple-500 mb-2 md:mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 md:mb-2 text-sm md:text-base">Platform Optimized</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Perfect formatting for Twitter threads and LinkedIn posts</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-green-500 mb-2 md:mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 md:mb-2 text-sm md:text-base">Human-Like</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">No AI buzzwords or robotic language</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-3xl px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-4 md:ml-12'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 mr-4 md:mr-12'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                    {message.content}
                  </div>
                  {!message.isUser && (
                    <div className="flex justify-end mt-3 md:mt-4">
                      <Button
                        onClick={() => handleCopy(message.content, message.id)}
                        variant="ghost"
                        size="sm"
                        className="h-7 md:h-8 px-2 md:px-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-xs md:text-sm"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-[85%] md:max-w-3xl px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-4 md:mr-12">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Creating your content...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Input Area */}
      <div className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-3 md:p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the content you want to create... (e.g., 'Twitter thread about AI productivity tools for developers')"
              className="min-h-[60px] md:min-h-[80px] max-h-[150px] md:max-h-[200px] resize-none pr-12 md:pr-16 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-xl shadow-sm text-sm md:text-base"
              disabled={isGenerating}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className="absolute bottom-2 md:bottom-3 right-2 md:right-3 h-8 w-8 md:h-10 md:w-10 p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-2 md:mt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
