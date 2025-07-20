import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SymbolCombinerProvider } from "@/context/SymbolCombinerContext";
import AdSense from "@/components/layout/AdSense";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cool Symbols to Copy and Paste | Text Symbols | copyandpastesymbols.pro",
  description: "Find and copy cool symbols, emoji, text decorations and more. Use our collection of special characters for social media, messages, and profiles.",
  keywords: "symbols, copy and paste, cool symbols, text decoration, emoji, special characters, unicode symbols",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href="https://copyandpastesymbols.pro/" />
        {/* Google AdSense verification code */}
        <AdSense />
        {/* Google Analytics tracking code */}
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SymbolCombinerProvider>
          {children}
        </SymbolCombinerProvider>
      </body>
    </html>
  );
}
