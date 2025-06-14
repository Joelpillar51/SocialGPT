
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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

🧵 Thread idea:

1/ The future of remote work isn't just about location flexibility - it's about redefining productivity entirely.

2/ Traditional 9-5 schedules were built for industrial-age work. Knowledge work operates on a different rhythm.

3/ The companies thriving post-2020 aren't the ones forcing employees back to offices. They're the ones who cracked the code on async collaboration.

4/ Remote-first doesn't mean "work from anywhere chaos." It means intentional systems, clear communication, and results-focused culture.

5/ The productivity paradox: when you stop measuring hours and start measuring outcomes, both employee satisfaction AND business results improve.

What's your experience with remote work productivity? 👇`;
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
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">X</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              GetXPilot
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Generate engaging Twitter threads and LinkedIn posts. Just describe what you want to say, and I'll create content that sounds natural and human.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-4 py-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                  {!message.isUser && (
                    <div className="flex justify-end mt-3">
                      <Button
                        onClick={() => handleCopy(message.content, message.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-gray-500 hover:text-gray-700"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-3xl px-4 py-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">Generating content...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the content you want to create... (e.g., 'Twitter thread about AI productivity tools for developers')"
              className="min-h-[60px] max-h-[200px] resize-none pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              disabled={isGenerating}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
