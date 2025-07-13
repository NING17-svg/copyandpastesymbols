'use client';

import React from 'react';
import Script from 'next/script';

export const GoogleAnalytics = () => {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9MV26MTLD2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9MV26MTLD2');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics; 