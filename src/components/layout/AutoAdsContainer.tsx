'use client';

import React from 'react';

interface AutoAdsContainerProps {
  className?: string;
}

const AutoAdsContainer: React.FC<AutoAdsContainerProps> = ({ className }) => {
  return (
    <div className={`adsense-auto-ads ${className || ''}`}>
      {/* 
        自动广告将由Google AdSense自动插入到页面上的最佳位置
        这个容器只是为了在将来需要时提供更精确的控制
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4194035852162505"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AutoAdsContainer; 