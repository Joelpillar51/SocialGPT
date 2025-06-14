import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Send, Activity, Twitter, Users, AlertTriangle, Crown, BookOpen, LogOut, User, Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { usePromptLimits } from '@/hooks/usePromptLimits';
import { PromptUsageDisplay } from '@/components/PromptUsageDisplay';
import { SubscriptionPopup } from '@/components/SubscriptionPopup';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
}

export const ModernChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPlan] = useState<'free' | 'pro'>('free'); // This would come from your auth/user context
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const {
    state
  } = useSidebar();
  const {
    toast
  } = useToast();

  // Add prompt limits hook
  const {
    canSubmit,
    incrementUsage,
    getUsageText,
    getRemainingPrompts
  } = usePromptLimits(userPlan);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating || !canSubmit) return;

    // Increment usage count for free users
    incrementUsage();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
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
        timestamp: new Date()
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
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };
  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard"
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Copy failed",
        description: "Failed to copy content to clipboard",
        variant: "destructive"
      });
    }
  };
  const handleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          liked: !msg.liked,
          disliked: msg.liked ? msg.disliked : false
        };
      }
      return msg;
    }));
    toast({
      title: "Feedback recorded",
      description: "Thank you for your feedback!"
    });
  };
  const handleDislike = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          disliked: !msg.disliked,
          liked: msg.disliked ? msg.liked : false
        };
      }
      return msg;
    }));
    toast({
      title: "Feedback recorded",
      description: "We'll work on improving our responses."
    });
  };
  const handleRegenerate = async (messageId: string) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    // Find the user message that prompted this AI response
    const userMessage = messages[messageIndex - 1];
    if (!userMessage || userMessage.isUser === false) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const regeneratedResponse: Message = {
        id: Date.now().toString(),
        content: generateMockResponse(userMessage.content),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => prev.map(msg => msg.id === messageId ? regeneratedResponse : msg));
      toast({
        title: "Content regenerated",
        description: "New response generated successfully!"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  return <div className="flex-1 flex flex-col min-h-screen bg-gray-800">
      {/* Header with sidebar trigger and upgrade button - Now Sticky */}
      <div className="sticky top-0 z-20 p-3 md:p-4 border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm">
        <div className="flex justify-between items-center w-full">
          <SidebarTrigger className="text-white hover:bg-gray-700 h-8 w-8 md:h-10 md:w-10" />
          <div className="flex items-center space-x-2 ml-auto">
            <Link to="/docs">
              <Button variant="ghost" className="text-white hover:bg-gray-700 px-3 py-2 text-sm">
                <BookOpen className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Docs</span>
              </Button>
            </Link>
            <Button 
              onClick={() => setIsSubscriptionOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 md:px-6 text-sm"
            >
              <Crown className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Upgrade to Pro</span>
              <span className="sm:hidden">Pro</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 md:h-10 md:w-10 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-gray-700 text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700 text-white" align="end">
                <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="focus:bg-gray-800 focus:text-white cursor-default">
                  <div className="flex items-center justify-between w-full">
                    <span>Plan:</span>
                    <div className="flex items-center space-x-1">
                      {userPlan === 'pro' ? <>
                          <Crown className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500 font-medium">Pro</span>
                        </> : <span className="text-gray-400">Free</span>}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="focus:bg-gray-800 focus:text-white cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content Area with proper bottom padding */}
      <div className="flex-1 overflow-y-auto pb-64 md:pb-72">
        {messages.length === 0 ? <div className="text-center py-8 md:py-20 max-w-3xl mx-auto px-4 md:px-6">
            <h1 className="text-2xl md:text-4xl font-light text-white mb-6 md:mb-12">
              SocialGPT
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-2">Examples</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300 cursor-pointer transition-colors">
                    "Create a thread about AI productivity tools for developers"
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300 cursor-pointer transition-colors">
                    "LinkedIn post about remote work trends in 2024"
                  </div>
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300 cursor-pointer transition-colors">
                    "Engaging X thread about startup fundraising tips"
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Twitter className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-2">Capabilities</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="bg-gray-700 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300">
                    Creates platform-optimized content for X and LinkedIn
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300">
                    Generates engaging threads with proper character limits
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300">
                    Tailors tone and style for professional or casual audiences
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-2">Limitations</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="bg-gray-700 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300">
                    Content should be reviewed for brand voice and compliance
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300">
                    May need adjustment for specific industry terminology
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 md:p-3 text-xs md:text-sm text-gray-300">
                    Always verify facts and statistics before posting
                  </div>
                </div>
              </div>
            </div>
          </div> : <div className="space-y-4 md:space-y-8 max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-8">
            {messages.map(message => <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] md:max-w-[80%] ${message.isUser ? '' : 'group'}`}>
                  <div className={`px-3 md:px-6 py-2 md:py-4 rounded-2xl ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                    <div className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* Action buttons for AI messages */}
                  {!message.isUser && <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(message.content)} className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleLike(message.id)} className={`h-8 w-8 p-0 hover:bg-gray-600 ${message.liked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}>
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDislike(message.id)} className={`h-8 w-8 p-0 hover:bg-gray-600 ${message.disliked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRegenerate(message.id)} disabled={isGenerating} className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600 disabled:opacity-50">
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>}
                </div>
              </div>)}
            {isGenerating && <div className="flex justify-start">
                <div className="max-w-[90%] md:max-w-[80%] px-3 md:px-6 py-2 md:py-4 rounded-2xl bg-gray-700">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                  animationDelay: '0.1s'
                }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                  animationDelay: '0.2s'
                }}></div>
                    </div>
                    <span className="text-gray-400 text-xs md:text-sm">Generating content...</span>
                  </div>
                </div>
              </div>}
          </div>}
      </div>

      {/* Enhanced Sticky Input Area - Responsive to sidebar state with reduced width */}
      <div className={`fixed bottom-0 right-0 p-4 md:p-6 z-10 transition-all duration-200 ${state === 'expanded' ? 'left-0 md:left-64' : 'left-0 md:left-12'}`}>
        {/* Add prompt usage display */}
        <PromptUsageDisplay userPlan={userPlan} usageText={getUsageText()} remainingPrompts={getRemainingPrompts()} canSubmit={canSubmit} />
        
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-end bg-gray-700 rounded-3xl border border-gray-600 shadow-2xl backdrop-blur-sm p-4 md:p-5 px-[24px] mx-[24px] my-0 py-[12px]">
            <Textarea value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={canSubmit ? "Describe your content idea (e.g., 'LinkedIn post about AI in healthcare' or 'X thread about startup lessons')" : "Daily limit reached. Upgrade to Pro for unlimited prompts."} className="flex-1 min-h-[60px] md:min-h-[80px] max-h-[120px] md:max-h-[160px] resize-none border-0 bg-transparent text-white placeholder-gray-400 focus:ring-0 focus:outline-none p-0 text-base md:text-lg leading-relaxed" disabled={isGenerating || !canSubmit} rows={2} />
            <Button type="submit" disabled={!inputValue.trim() || isGenerating || !canSubmit} className="ml-4 h-12 w-12 md:h-14 md:w-14 p-0 bg-blue-600 hover:bg-blue-500 rounded-2xl flex-shrink-0 shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
        </form>
      </div>

      {/* Subscription Popup */}
      <SubscriptionPopup 
        isOpen={isSubscriptionOpen} 
        onClose={() => setIsSubscriptionOpen(false)} 
      />
    </div>;
};
