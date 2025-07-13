import { Metadata } from 'next';

// 定义分类映射，用于显示和URL之间的转换
const categoryMap = {
  'emoticons': { 
    title: 'Emoticons', 
    description: 'Copy and paste text emoticons, smiley faces, and emoji symbols. Express your emotions in messages, social media posts, and more.',
    icon: '😊'
  },
  'hearts': { 
    title: 'Hearts', 
    description: 'Collection of heart symbols and love-related characters. Copy and paste heart emojis for messages, social media, and more.',
    icon: '❤️'
  },
  'starsDecor': { 
    title: 'Stars & Decorations', 
    description: 'Browse and copy decorative symbols including stars, sparkles, and ornamental characters to make your text stand out.',
    icon: '✨'
  },
  'arrows': { 
    title: 'Arrows', 
    description: 'Copy and paste arrow symbols pointing in various directions for navigation, instructions, or decorative purposes.',
    icon: '➡️'
  },
  'shapesBorders': { 
    title: 'Shapes & Borders', 
    description: 'Find geometric shapes, border elements, and pattern symbols for creative text formatting and design.',
    icon: '◆'
  },
  'mathNumbers': { 
    title: 'Math & Numbers', 
    description: 'Copy mathematical symbols, number formats, and equation characters for academic or scientific content.',
    icon: '∞'
  },
  'lettersFonts': { 
    title: 'Letters & Fonts', 
    description: 'Discover stylized letters and alternative font characters to create unique text styles for your content.',
    icon: '𝓐'
  },
  'currencyUnits': { 
    title: 'Currency & Units', 
    description: 'Browse currency symbols from around the world and unit measurement characters for financial or technical content.',
    icon: '₿'
  },
  'bracketsPunctuation': { 
    title: 'Brackets & Punctuation', 
    description: 'Copy special brackets, quotation marks, and punctuation symbols for precise text formatting and styling.',
    icon: '「」'
  },
  'weatherNature': { 
    title: 'Weather & Nature', 
    description: 'Find symbols representing weather conditions, plants, celestial objects, and other natural elements.',
    icon: '🌿'
  },
  'themed': { 
    title: 'Themed Symbols', 
    description: 'Browse specialty symbols organized by themes like music, games, religion, holidays, and more.',
    icon: '🎭'
  },
  'language': { 
    title: 'Language Symbols', 
    description: 'Copy special characters from various writing systems and language-specific symbols for multilingual content.',
    icon: '漢'
  }
};

// 由于 Next.js 的限制，我们不能在这里使用动态元数据
// 改为使用静态元数据
export const metadata: Metadata = {
  title: "Symbol Category | Copy and Paste Symbols | copyandpastesymbols.pro",
  description: "Browse and copy symbols from our categorized collection. Find the perfect symbols for your messages, social media posts, and more.",
  alternates: {
    canonical: "https://copyandpastesymbols.pro/categories"
  }
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 