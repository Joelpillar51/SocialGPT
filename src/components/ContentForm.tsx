
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface ContentFormProps {
  onGenerate: (content: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export const ContentForm: React.FC<ContentFormProps> = ({ 
  onGenerate, 
  isGenerating, 
  setIsGenerating 
}) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('twitter');
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [threadLength, setThreadLength] = useState([5]);

  const industries = [
    'Tech', 'Finance', 'Marketing', 'HR', 'Creator Economy', 
    'Healthcare', 'Education', 'E-commerce', 'SaaS', 'Startup'
  ];

  const audiences = [
    'Founders', 'Developers', 'Marketers', 'General Public', 
    'Professionals', 'Students', 'Entrepreneurs', 'Executives'
  ];

  const tones = [
    'Casual', 'Professional', 'Thought Leader', 'Educational', 
    'Persuasive', 'Inspirational', 'Analytical', 'Conversational'
  ];

  const handleGenerate = async () => {
    if (!topic.trim() || !industry || !audience || !tone) {
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = platform === 'twitter' 
        ? generateMockTwitterThread(topic, threadLength[0], tone, industry, audience)
        : generateMockLinkedInPost(topic, tone, industry, audience);
      
      onGenerate(mockContent);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockTwitterThread = (topic: string, length: number, tone: string, industry: string, audience: string) => {
    const tweets = [];
    for (let i = 1; i <= length; i++) {
      tweets.push(`${i}/ This is a sample tweet about ${topic} written in a ${tone.toLowerCase()} tone for ${audience.toLowerCase()} in the ${industry.toLowerCase()} industry. Each tweet is crafted to be under 280 characters and sounds natural.`);
    }
    return tweets.join('\n\n');
  };

  const generateMockLinkedInPost = (topic: string, tone: string, industry: string, audience: string) => {
    return `Here's a sample LinkedIn post about ${topic} written in a ${tone.toLowerCase()} tone for ${audience.toLowerCase()} in the ${industry.toLowerCase()} industry.

This post would typically be longer and more detailed than a Twitter thread, allowing for deeper insights and professional storytelling.

The content would be crafted to engage professionals on LinkedIn while maintaining authenticity and avoiding AI-sounding language.

What are your thoughts on this approach?`;
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Generate Content
      </h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="topic" className="text-base font-medium mb-2 block">
            What do you want to say?
          </Label>
          <Textarea
            id="topic"
            placeholder="Describe your topic, key points, or message you want to convey..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-24 resize-none"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Label htmlFor="platform-switch" className="font-medium">
            Platform:
          </Label>
          <span className={`text-sm ${platform === 'twitter' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            Twitter
          </span>
          <Switch
            id="platform-switch"
            checked={platform === 'linkedin'}
            onCheckedChange={(checked) => setPlatform(checked ? 'linkedin' : 'twitter')}
          />
          <span className={`text-sm ${platform === 'linkedin' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            LinkedIn
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(ind => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map(aud => (
                  <SelectItem key={aud} value={aud}>{aud}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {platform === 'twitter' && (
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Thread Length: {threadLength[0]} tweets
            </Label>
            <Slider
              value={threadLength}
              onValueChange={setThreadLength}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>20</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim() || !industry || !audience || !tone}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-medium"
        >
          {isGenerating ? 'Generating...' : `Generate ${platform === 'twitter' ? 'Thread' : 'Post'}`}
        </Button>
      </div>
    </Card>
  );
};
