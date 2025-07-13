'use client';

import React, { useState } from 'react';
import { useSymbolCombiner } from '@/context/SymbolCombinerContext';

interface SymbolCombinerProps {
  className?: string;
}

export default function SymbolCombiner({ className }: SymbolCombinerProps) {
  const { combinedSymbols, clearSymbols } = useSymbolCombiner();
  const [copied, setCopied] = useState(false);

  // Copy all symbols
  const copyAllSymbols = () => {
    if (combinedSymbols) {
      navigator.clipboard.writeText(combinedSymbols);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex-grow flex items-center bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={combinedSymbols}
            className="flex-grow px-4 py-3 bg-transparent outline-none text-xl"
            placeholder="Click symbols to add here..."
            readOnly
          />
          {combinedSymbols && (
            <button 
              onClick={clearSymbols}
              className="px-3 text-gray-500 hover:text-gray-700"
              title="Clear"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={copyAllSymbols}
          disabled={!combinedSymbols}
          className={`ml-3 px-6 py-3 rounded-lg font-medium ${
            combinedSymbols 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
} 