
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb, Target, MessageSquare, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Docs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Chat
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">SocialGPT Documentation</h1>
                <p className="text-gray-400">Complete guide to using SocialGPT effectively</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-blue-400" />
              What is SocialGPT?
            </h2>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <p className="text-lg text-gray-300">
                SocialGPT is an AI-powered content generator specifically designed for social media platforms, 
                with a focus on X (Twitter) and LinkedIn. It helps you create engaging, platform-optimized 
                content that resonates with your audience.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-400 mb-2">🐦 X (Twitter) Content</h3>
                  <p className="text-sm text-gray-300">
                    Creates engaging threads, viral tweets, and conversation starters optimized for X's format and character limits.
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-400 mb-2">💼 LinkedIn Content</h3>
                  <p className="text-sm text-gray-300">
                    Generates professional posts, thought leadership content, and industry insights tailored for LinkedIn's professional audience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-green-400" />
              How to Use SocialGPT
            </h2>
            <div className="bg-gray-800 rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Describe Your Content Idea</h3>
                    <p className="text-gray-300">
                      Simply type what kind of content you want to create. Be specific about the topic, platform, and tone you're aiming for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Review Generated Content</h3>
                    <p className="text-gray-300">
                      SocialGPT will create platform-optimized content with proper formatting, hashtags, and engagement elements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Customize & Post</h3>
                    <p className="text-gray-300">
                      Copy the generated content and make any final adjustments before posting to your social media platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prompting Best Practices */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-400" />
              Prompting Best Practices
            </h2>
            <div className="bg-gray-800 rounded-lg p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-400">✅ Effective Prompts</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-300">Platform-Specific</p>
                      <p className="text-sm text-gray-300">"LinkedIn post about remote work productivity tips"</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-300">Topic + Format</p>
                      <p className="text-sm text-gray-300">"X thread about startup fundraising lessons with 5 tweets"</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-300">Tone + Audience</p>
                      <p className="text-sm text-gray-300">"Professional LinkedIn post about AI trends for CTOs"</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-400">❌ Avoid These</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-red-300">Too Vague</p>
                      <p className="text-sm text-gray-300">"Write something about business"</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-red-300">No Platform</p>
                      <p className="text-sm text-gray-300">"Create a post about marketing"</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-red-300">Too Complex</p>
                      <p className="text-sm text-gray-300">"Write 10 different posts about 5 topics for 3 platforms"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Types */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-purple-400" />
              Content Types You Can Create
            </h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">🐦 X (Twitter) Content</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Engaging Twitter threads</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Viral tweet ideas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Question tweets for engagement</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Industry insights and tips</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Personal stories and experiences</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">💼 LinkedIn Content</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Professional thought leadership</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Industry trend analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Career advice and tips</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Company culture posts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Professional achievements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Example Prompts */}
          <section>
            <h2 className="text-3xl font-bold mb-6">📝 Example Prompts</h2>
            <div className="bg-gray-800 rounded-lg p-6 space-y-6">
              <div className="grid gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">For X (Twitter)</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• "Create a Twitter thread about productivity hacks for developers"</li>
                    <li>• "Write an engaging tweet about the future of AI in healthcare"</li>
                    <li>• "Generate a controversial but thoughtful take on remote work"</li>
                    <li>• "Create a thread sharing lessons learned from startup failures"</li>
                  </ul>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">For LinkedIn</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• "Professional LinkedIn post about leadership lessons from 2024"</li>
                    <li>• "Create a thought leadership post about sustainability in tech"</li>
                    <li>• "Write a post about building diverse teams in startups"</li>
                    <li>• "Generate a post about the importance of mental health at work"</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Success */}
          <section>
            <h2 className="text-3xl font-bold mb-6">🎯 Tips for Maximum Engagement</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Content Strategy</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Always review and personalize generated content</li>
                    <li>• Add your own experiences and insights</li>
                    <li>• Verify facts and statistics before posting</li>
                    <li>• Adjust tone to match your brand voice</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Engagement Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Post at optimal times for your audience</li>
                    <li>• Use relevant hashtags (but don't overdo it)</li>
                    <li>• Ask questions to encourage comments</li>
                    <li>• Engage with responses to your posts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;
