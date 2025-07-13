'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SymbolCombinerContextType {
  combinedSymbols: string;
  addSymbol: (symbol: string) => void;
  clearSymbols: () => void;
}

const SymbolCombinerContext = createContext<SymbolCombinerContextType | undefined>(undefined);

export function useSymbolCombiner() {
  const context = useContext(SymbolCombinerContext);
  if (context === undefined) {
    throw new Error('useSymbolCombiner must be used within a SymbolCombinerProvider');
  }
  return context;
}

interface SymbolCombinerProviderProps {
  children: ReactNode;
}

export function SymbolCombinerProvider({ children }: SymbolCombinerProviderProps) {
  const [combinedSymbols, setCombinedSymbols] = useState('');

  const addSymbol = (symbol: string) => {
    setCombinedSymbols(prev => prev + symbol);
  };

  const clearSymbols = () => {
    setCombinedSymbols('');
  };

  const value = {
    combinedSymbols,
    addSymbol,
    clearSymbols,
  };

  return (
    <SymbolCombinerContext.Provider value={value}>
      {children}
    </SymbolCombinerContext.Provider>
  );
} 