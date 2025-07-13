'use client';

import { getSymbolsByCategory, Symbol } from '@/data/symbols';

export default function ViewSymbolsPage() {
  // 作为示例，我们加载 'emoticons' 分类的数据
  const emoticons: Symbol[] = getSymbolsByCategory('emoticons');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Symbol Viewer</h1>
      <h2 className="text-2xl font-semibold mb-6">Emoticons ({emoticons.length} symbols)</h2>
      
      <div className="flex flex-wrap gap-3">
        {emoticons.map((s, index) => (
          <div
            key={index}
            className="min-w-[50px] px-3 py-2 flex items-center justify-center border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            title={s.name}
          >
            <span className="text-3xl">{s.symbol}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 