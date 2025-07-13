'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

export const AdSense = () => {
  // 当组件加载后尝试初始化自动广告
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({
          google_ad_client: "ca-pub-4194035852162505",
          enable_page_level_ads: true
        });
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <>
      {/* AdSense 脚本 */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4194035852162505"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('AdSense script loaded successfully');
        }}
        onError={(e) => {
          console.error('AdSense script failed to load', e);
        }}
      />
    </>
  );
};

export default AdSense; 