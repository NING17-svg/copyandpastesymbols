import { notFound } from 'next/navigation';
import { getSymbolsByCategory, categoryInfoList } from '@/data/symbols';
import MainLayout from '@/components/layout/MainLayout';
import SymbolGrid from '@/components/symbols/SymbolGrid';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Get current category information
  const currentCategory = categoryInfoList.find(cat => cat.key === slug);
  
  // If category not found, return 404
  if (!currentCategory) {
    notFound();
  }
  
  // Get all symbols for this category
  const symbols = getSymbolsByCategory(slug);
  
  // Get other categories (excluding current)
  const otherCategories = categoryInfoList.filter(cat => cat.key !== slug);
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/categories" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Categories
          </Link>
        </div>
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <span className="text-5xl mr-4">{currentCategory.icon}</span>
            {currentCategory.name} Symbols
          </h1>
          <p className="text-lg text-gray-600 mb-6">{currentCategory.description}</p>
          <p className="text-gray-600">
            Browse our collection of {symbols.length} {currentCategory.name.toLowerCase()} symbols. 
            Click on any symbol to copy it to your clipboard and add it to the combiner at the bottom.
          </p>
        </div>
        
        {/* Symbol grid */}
        <SymbolGrid 
          symbols={symbols} 
        />
        
        {/* Other categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherCategories.map((category, index) => (
              <Link 
                key={index}
                href={`/categories/${category.key}`}
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl mr-3">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 