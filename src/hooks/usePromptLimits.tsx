
import { useState, useEffect } from 'react';

interface PromptUsage {
  count: number;
  date: string;
}

export const usePromptLimits = (userPlan: 'free' | 'pro') => {
  const [promptsUsed, setPromptsUsed] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);

  const MAX_FREE_PROMPTS = 5;
  const STORAGE_KEY = 'socialgpt_prompt_usage';

  useEffect(() => {
    // Load usage from localStorage
    const storedUsage = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();

    if (storedUsage) {
      try {
        const usage: PromptUsage = JSON.parse(storedUsage);
        
        // Reset count if it's a new day
        if (usage.date !== today) {
          setPromptsUsed(0);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 0, date: today }));
        } else {
          setPromptsUsed(usage.count);
        }
      } catch (error) {
        console.error('Error parsing prompt usage:', error);
        setPromptsUsed(0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 0, date: today }));
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 0, date: today }));
    }
  }, []);

  useEffect(() => {
    // Update canSubmit based on user plan and usage
    if (userPlan === 'pro') {
      setCanSubmit(true);
    } else {
      setCanSubmit(promptsUsed < MAX_FREE_PROMPTS);
    }
  }, [userPlan, promptsUsed]);

  const incrementUsage = () => {
    if (userPlan === 'free') {
      const newCount = promptsUsed + 1;
      setPromptsUsed(newCount);
      
      const today = new Date().toDateString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, date: today }));
    }
  };

  const getRemainingPrompts = () => {
    if (userPlan === 'pro') return 'Unlimited';
    return Math.max(0, MAX_FREE_PROMPTS - promptsUsed);
  };

  const getUsageText = () => {
    if (userPlan === 'pro') return 'Unlimited prompts';
    return `${promptsUsed}/${MAX_FREE_PROMPTS} prompts used today`;
  };

  return {
    promptsUsed,
    canSubmit,
    incrementUsage,
    getRemainingPrompts,
    getUsageText,
    maxPrompts: userPlan === 'free' ? MAX_FREE_PROMPTS : Infinity
  };
};
