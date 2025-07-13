'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { categoryInfoList } from '@/data/symbols';
import { useSymbolCombiner } from '@/context/SymbolCombinerContext';

export default function CategoriesPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Symbol Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our collection of special symbols organized into categories. Click on any category to explore its symbols.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryInfoList.map((category, index) => (
            <Link 
              key={index}
              href={`/categories/${category.key}`}
              className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <span className="text-blue-600 font-medium">View Symbols →</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">How to Use Our Symbols</h2>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700 mb-6">
            <li>Browse the categories above and click on one that interests you</li>
            <li>On the category page, click any symbol to copy it to your clipboard</li>
            <li>The symbol will also be added to the combiner at the bottom of the page</li>
            <li>Use the combiner to create custom combinations of multiple symbols</li>
            <li>Click the "Copy" button in the combiner to copy all selected symbols at once</li>
          </ol>
          <p className="text-gray-700">
            Our symbols are Unicode characters that work across most modern platforms and applications. They're perfect for social media, messaging, documents, and more.
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 