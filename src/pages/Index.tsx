
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <ChatInterface />
    </div>
  );
};

export default Index;
