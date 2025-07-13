import emoticons from './emoticons.json';
import hearts from './hearts.json';
import starsDecor from './stars_decor.json';
import weatherNature from './weather_nature.json';
import arrows from './arrows.json';
import shapesBorders from './shapes_borders.json';
import bracketsPunctuation from './brackets_punctuation.json';
import mathNumbers from './math_numbers.json';
import lettersFonts from './letters_fonts.json';
import currencyUnits from './currency_units.json';
import themed from './themed.json';
import language from './language.json';

export interface Symbol {
  symbol: string;
  name: string;
  category: string;
}

export interface Category {
  name: string;
  key: string;
  symbols: Symbol[];
}

export interface CategoryInfo {
  key: string;
  name: string;
  description: string;
  icon: string;
}

// 旧的分类数据
export const allSymbolsByCategory = {
  emoticons,
  hearts,
  starsDecor,
  weatherNature,
  arrows,
  shapesBorders,
  bracketsPunctuation,
  mathNumbers,
  lettersFonts,
  currencyUnits,
  themed,
  language,
};

// 分类信息
export const categoryInfoList: CategoryInfo[] = [
  { key: 'emoticons', name: 'Emoticons', description: 'Text-based facial expressions and emotions', icon: '(^‿^)' },
  { key: 'hearts', name: 'Hearts', description: 'Love and affection symbols', icon: '❤' },
  { key: 'stars', name: 'Stars', description: 'Star symbols and decorations', icon: '★' },
  { key: 'arrows', name: 'Arrows', description: 'Directional and pointer symbols', icon: '→' },
  { key: 'currency', name: 'Currency', description: 'Money and currency symbols', icon: '€' },
  { key: 'music', name: 'Music', description: 'Musical notes and symbols', icon: '♪' },
  { key: 'math', name: 'Math', description: 'Mathematical symbols and operators', icon: '∑' },
  { key: 'brackets', name: 'Brackets', description: 'Brackets, parentheses, and quotes', icon: '【】' },
  { key: 'shapes', name: 'Shapes', description: 'Geometric and decorative shapes', icon: '■' },
  { key: 'weather', name: 'Weather', description: 'Weather and nature symbols', icon: '☀' },
  { key: 'games', name: 'Games', description: 'Gaming and card symbols', icon: '♠' },
  { key: 'letters', name: 'Letters', description: 'Special letter formats and scripts', icon: 'Ⓐ' },
];

export const allCategoryNames = Object.keys(allSymbolsByCategory);

// 映射旧分类到新分类
const categoryMapping: Record<string, string> = {
  emoticons: 'emoticons',
  hearts: 'hearts',
  starsDecor: 'stars',
  arrows: 'arrows',
  currencyUnits: 'currency',
  mathNumbers: 'math',
  bracketsPunctuation: 'brackets',
  shapesBorders: 'shapes',
  weatherNature: 'weather',
  lettersFonts: 'letters',
};

// 获取符号
export const getSymbolsByCategory = (category: string): Symbol[] => {
  // 使用旧的分类数据
  if (allSymbolsByCategory[category as keyof typeof allSymbolsByCategory]) {
    return allSymbolsByCategory[category as keyof typeof allSymbolsByCategory];
  }
  
  // 尝试映射到旧分类
  const mappedCategory = Object.entries(categoryMapping).find(([_, value]) => value === category)?.[0];
  if (mappedCategory && allSymbolsByCategory[mappedCategory as keyof typeof allSymbolsByCategory]) {
    return allSymbolsByCategory[mappedCategory as keyof typeof allSymbolsByCategory];
  }
  
  return [];
}; 