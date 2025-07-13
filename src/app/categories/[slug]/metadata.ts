import { Metadata } from 'next';
import { categoryInfoList } from '@/data/symbols';

// 生成动态元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  // 获取当前分类信息
  const currentCategory = categoryInfoList.find(cat => cat.key === slug);
  
  if (!currentCategory) {
    return {
      title: 'Category Not Found | copyandpastesymbols.pro',
      description: 'The requested symbol category could not be found. Browse our other categories to find the symbols you need.'
    };
  }
  
  return {
    title: `${currentCategory.name} Symbols | Copy and Paste | copyandpastesymbols.pro`,
    description: `Browse and copy ${currentCategory.name.toLowerCase()} symbols with one click. ${currentCategory.description} Perfect for social media, messaging, and documents.`,
    alternates: {
      canonical: `https://copyandpastesymbols.pro/categories/${slug}`
    }
  };
} 