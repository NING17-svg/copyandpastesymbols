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

// 动态生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const category = categoryMap[slug as keyof typeof categoryMap];
  
  if (!category) {
    return {
      title: 'Category Not Found | Copy and Paste Symbols',
      description: 'The requested symbol category could not be found.'
    };
  }
  
  return {
    title: `${category.title} Symbols | Copy and Paste | copyandpastesymbols.pro`,
    description: category.description,
    alternates: {
      canonical: `https://copyandpastesymbols.pro/categories/${slug}`
    }
  };
}

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