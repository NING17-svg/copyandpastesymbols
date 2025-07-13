'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SymbolCombiner from '../ui/SymbolCombiner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pb-20">
        {children}
      </main>
      <Footer />
      <SymbolCombiner />
    </div>
  );
} 