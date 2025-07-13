'use client';

import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SymbolCombiner from '../ui/SymbolCombiner';
import AutoAdsContainer from './AutoAdsContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  // 在组件加载后初始化AdSense自动广告
  useEffect(() => {
    try {
      // 等待AdSense脚本加载完成
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        // 尝试初始化广告
        setTimeout(() => {
          if (adsbygoogle.length === 0) {
            adsbygoogle.push({});
          }
        }, 300);
      }
    } catch (error) {
      console.error('Error initializing AdSense ads:', error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* 顶部广告容器 */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-4">
        <AutoAdsContainer className="mb-4" />
      </div>
      <main className="flex-grow pb-20">
        {children}
      </main>
      {/* 底部广告容器 */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-4">
        <AutoAdsContainer className="mt-4" />
      </div>
      <Footer />
      <SymbolCombiner />
    </div>
  );
} 