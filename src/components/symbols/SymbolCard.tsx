'use client';

import React, { useState } from 'react';

interface SymbolCardProps {
  symbol: string;
  name?: string;
  category?: string;
  onAddToCombiner?: (symbol: string) => void;
}

export default function SymbolCard({ symbol, name, category, onAddToCombiner }: SymbolCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(symbol);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // If onAddToCombiner function is provided, call it
    if (onAddToCombiner) {
      onAddToCombiner(symbol);
    }
  };

  return (
    <div 
      className="min-w-[60px] px-4 py-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-all relative"
      onClick={handleCopy}
    >
      <div className="text-3xl">{symbol}</div>
      {name && <div className="text-xs text-gray-500 mt-1">{name}</div>}
      
      {/* Copy notification */}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-90 text-white rounded-lg">
          <span>Copied!</span>
        </div>
      )}
    </div>
  );
} 