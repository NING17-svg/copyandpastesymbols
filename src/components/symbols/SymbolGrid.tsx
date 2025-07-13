'use client';

import React from 'react';
import SymbolCard from './SymbolCard';

interface SymbolGridProps {
  symbols: Array<{
    symbol: string;
    name?: string;
    category?: string;
  }>;
  title?: string;
  onAddToCombiner?: (symbol: string) => void;
}

export default function SymbolGrid({ symbols, title, onAddToCombiner }: SymbolGridProps) {
  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      )}
      <div className="flex flex-wrap gap-4">
        {symbols.map((symbol, index) => (
          <SymbolCard
            key={index}
            symbol={symbol.symbol}
            name={symbol.name}
            category={symbol.category}
            onAddToCombiner={onAddToCombiner}
          />
        ))}
      </div>
    </div>
  );
} 