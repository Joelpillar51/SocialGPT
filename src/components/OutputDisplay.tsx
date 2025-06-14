
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface OutputDisplayProps {
  content: string;
  isGenerating: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, isGenerating }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatContent = (text: string) => {
    // Split by double newlines to separate tweets/paragraphs
    const sections = text.split('\n\n');
    return sections.map((section, index) => (
      <div key={index} className="mb-4 last:mb-0">
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
            {section}
          </p>
          {section.includes('/') && (
            <div className="mt-2 text-xs text-gray-500">
              {section.length} characters
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <Card className="p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Generated Content
        </h2>
        {content && !isGenerating && (
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
        )}
      </div>

      <div className="min-h-32">
        {isGenerating ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Generating your content...</span>
            </div>
          </div>
        ) : content ? (
          <div className="space-y-4">
            {formatContent(content)}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <p className="text-lg mb-2">Ready to generate amazing content!</p>
            <p className="text-sm">Fill out the form and click generate to see your content here.</p>
          </div>
        )}
      </div>
    </Card>
  );
};
