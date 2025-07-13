'use client';

import Link from 'next/link';
import Image from 'next/image';
import { allSymbolsByCategory, getSymbolsByCategory, categoryInfoList } from '@/data/symbols';
import MainLayout from '@/components/layout/MainLayout';
import { useSymbolCombiner } from '@/context/SymbolCombinerContext';

// Old category mapping
const categoryMap = {
  'emoticons': { 
    title: 'Emoticons', 
    description: 'Text-based facial expressions and emotions',
    icon: '😊'
  },
  'hearts': { 
    title: 'Hearts', 
    description: 'Love and affection symbols',
    icon: '❤️'
  },
  'starsDecor': { 
    title: 'Stars & Decorations', 
    description: 'Star symbols and decorations',
    icon: '✨'
  },
  'arrows': { 
    title: 'Arrows', 
    description: 'Directional and pointer symbols',
    icon: '➡️'
  },
  'shapesBorders': { 
    title: 'Shapes & Borders', 
    description: 'Geometric shapes and border elements',
    icon: '◆'
  },
  'mathNumbers': { 
    title: 'Math & Numbers', 
    description: 'Mathematical symbols and operators',
    icon: '∞'
  },
  'lettersFonts': { 
    title: 'Letters & Fonts', 
    description: 'Special letter formats and scripts',
    icon: '𝓐'
  },
  'currencyUnits': { 
    title: 'Currency & Units', 
    description: 'Money and currency symbols',
    icon: '₿'
  },
  'bracketsPunctuation': { 
    title: 'Brackets & Punctuation', 
    description: 'Brackets, parentheses, and quotes',
    icon: '「」'
  },
  'weatherNature': { 
    title: 'Weather & Nature', 
    description: 'Weather and nature symbols',
    icon: '🌿'
  },
  'themed': { 
    title: 'Themed Symbols', 
    description: 'Specialty symbols for various themes',
    icon: '🎭'
  },
  'language': { 
    title: 'Language Symbols', 
    description: 'Special characters from various writing systems',
    icon: '漢'
  }
};

// Helper function to get symbols for a category
const getSymbolsForCategory = (category: string, count: number) => {
  const symbols = getSymbolsByCategory(category);
  return symbols.slice(0, count);
};

export default function Home() {
  const { addSymbol } = useSymbolCombiner();
  
  // All available categories
  const categories = [
    { name: 'Emoticons', key: 'emoticons', icon: '😊' },
    { name: 'Hearts', key: 'hearts', icon: '❤️' },
    { name: 'Stars & Decorations', key: 'starsDecor', icon: '✨' },
    { name: 'Arrows', key: 'arrows', icon: '➡️' },
    { name: 'Shapes & Borders', key: 'shapesBorders', icon: '◆' },
    { name: 'Math & Numbers', key: 'mathNumbers', icon: '∞' },
    { name: 'Letters & Fonts', key: 'lettersFonts', icon: '𝓐' },
    { name: 'Currency & Units', key: 'currencyUnits', icon: '₿' },
    { name: 'Brackets & Punctuation', key: 'bracketsPunctuation', icon: '「」' },
    { name: 'Weather & Nature', key: 'weatherNature', icon: '🌿' },
    { name: 'Themed Symbols', key: 'themed', icon: '🎭' },
    { name: 'Language Symbols', key: 'language', icon: '漢' }
  ];

  // About section features
  const aboutFeatures = [
    {
      title: "Why Use Special Symbols?",
      icon: "✨",
      description: "Enhance your digital communication with special characters that express emotions, add visual interest, and make your content stand out."
    },
    {
      title: "8,000+ Symbols",
      icon: "🔣",
      description: "Access our extensive collection of over 8,000 symbols across various categories, from emoticons to mathematical symbols."
    },
    {
      title: "Easy to Use",
      icon: "👆",
      description: "Simply click on any symbol to copy it to your clipboard, then paste it anywhere you want to use it."
    },
    {
      title: "Works Everywhere",
      icon: "🌐",
      description: "Our symbols are Unicode characters that work across most modern platforms, applications, and websites."
    }
  ];

  // Additional info sections for SEO content
  const additionalInfoSections = [
    {
      title: "Unicode Symbols and Their Importance",
      content: "Unicode symbols represent a standardized encoding system that ensures text appears consistently across different platforms and devices. With over 143,000 characters in the Unicode Standard, these symbols allow for rich, expressive communication beyond traditional text. From mathematical notations to ancient scripts, Unicode symbols help bridge language barriers and enhance digital expression. CopyAndPasteSymbols.pro makes accessing these special characters simple and intuitive."
    },
    {
      title: "Popular Uses for Special Symbols",
      content: "Special symbols serve countless purposes in our digital lives. Emoticons and emoji add emotional context to messages, while mathematical symbols enable complex equations in documents. Decorative symbols enhance social media profiles, usernames, and creative content. Arrows and directional symbols improve instructional materials, while currency symbols facilitate financial discussions. Whatever your communication needs, our extensive symbol collection has you covered."
    },
    {
      title: "The History of Symbols in Digital Communication",
      content: "Digital symbols have evolved significantly since the early days of computing. The first emoticons appeared in the 1980s when Scott Fahlman proposed using :-) to indicate jokes in online forums. As technology advanced, Unicode was developed to standardize character encoding across platforms. Today, symbols have become an integral part of digital communication, with emoji even influencing popular culture. Our collection preserves both classic text-based symbols and modern Unicode characters."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Copy and Paste Symbols
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Find and copy thousands of special symbols, emojis, and text characters with just one click.
          </p>
          
          <p className="text-lg text-gray-600 mb-10 max-w-4xl mx-auto">
            Our comprehensive collection features over 8,000 Unicode symbols, special characters, and emoji across 12 carefully curated categories. Whether you need decorative text symbols for social media, mathematical notation for academic work, or expressive emoticons for messaging, CopyAndPasteSymbols.pro offers the perfect solution for enhancing your digital communication. Simply browse, click, and paste these special symbols anywhere you need them.
          </p>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Link 
                href={`/categories/${category.key}`}
                key={category.key}
                className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 rounded-full border border-gray-300 transition-colors shadow-sm hover:shadow"
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Categories with 100 Symbols Each */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => {
            const symbols = getSymbolsForCategory(category.key, 100);
            return (
              <div key={category.key} className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.icon} {category.name}
                  </h2>
                  <Link 
                    href={`/categories/${category.key}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    View all
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {symbols.map((symbol, index) => (
                    <button
                      key={index}
                      className="min-w-[40px] h-[40px] px-2 flex items-center justify-center text-xl bg-white hover:bg-gray-50 border border-gray-200 rounded-md transition-all hover:shadow-sm"
                      title={symbol.name}
                      onClick={() => {
                        navigator.clipboard.writeText(symbol.symbol);
                        addSymbol(symbol.symbol);
                      }}
                    >
                      {symbol.symbol}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section with Feature Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            About Copy and Paste Symbols
          </h2>
          
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Welcome to CopyAndPasteSymbols.pro, your ultimate destination for finding and copying special characters, 
            symbols, and emojis to enhance your digital communication.
          </p>

          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Our mission is to provide the most comprehensive, user-friendly platform for accessing the vast world of Unicode symbols and special characters. Whether you're a student, professional, content creator, or casual user, our carefully organized collection makes it easy to find exactly what you need.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aboutFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Additional Info Sections for SEO */}
          <div className="space-y-10 mb-16">
            {additionalInfoSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{section.title}</h3>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">How to Use Our Symbols</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-4">
              <li>Browse through our categories to find the symbol you need</li>
              <li>Click on the symbol to copy it to your clipboard</li>
              <li>Paste it anywhere you want - social media, messages, documents, or websites</li>
            </ol>
            <p className="text-gray-700">
              Our symbols are compatible with most modern platforms including Windows, macOS, iOS, Android, and all major web browsers. They work seamlessly in social media posts, messaging apps, word processors, design software, and more. The symbols are standard Unicode characters, ensuring maximum compatibility across devices.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

