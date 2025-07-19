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

// Base interfaces
export interface Symbol {
  symbol: string;
  name: string;
  category: string;
}

export interface CategoryInfo {
  key: string;
  name: string;
  description: string;
  icon: string;
  data: Symbol[];
}

// Single Source of Truth for Category Information
export const categoryInfoList: CategoryInfo[] = [
  { key: 'emoticons', name: 'Emoticons', description: 'Text-based facial expressions and emotions.', icon: '(^‿^)', data: emoticons },
  { key: 'hearts', name: 'Hearts', description: 'A collection of heart symbols for love and affection.', icon: '❤', data: hearts },
  { key: 'stars_decor', name: 'Stars & Decor', description: 'Star symbols, sparkles, and decorative characters.', icon: '★', data: starsDecor },
  { key: 'arrows', name: 'Arrows', description: 'Directional arrows and pointer symbols for all uses.', icon: '→', data: arrows },
  { key: 'brackets_punctuation', name: 'Brackets & Punctuation', description: 'Stylish brackets, parentheses, and punctuation marks.', icon: '【】', data: bracketsPunctuation },
  { key: 'currency_units', name: 'Currency & Units', description: 'Symbols for global currencies and measurement units.', icon: '€', data: currencyUnits },
  { key: 'language', name: 'Language Symbols', description: 'Characters and symbols from various languages.', icon: '文', data: language },
  { key: 'letters_fonts', name: 'Letters & Fonts', description: 'Special letter formats, scripts, and font styles.', icon: 'Ⓐ', data: lettersFonts },
  { key: 'math_numbers', name: 'Math & Numbers', description: 'Mathematical operators, numbers, and equations.', icon: '∑', data: mathNumbers },
  { key: 'shapes_borders', name: 'Shapes & Borders', description: 'Geometric shapes, lines, and decorative borders.', icon: '■', data: shapesBorders },
  { key: 'themed', name: 'Themed Symbols', description: 'Collections of symbols for specific themes and occasions.', icon: '🎉', data: themed },
  { key: 'weather_nature', name: 'Weather & Nature', description: 'Symbols representing weather conditions and nature.', icon: '☀', data: weatherNature },
];

// Derived data, ensuring consistency
export const allCategoryKeys = categoryInfoList.map(c => c.key);

const symbolsByCategory = categoryInfoList.reduce((acc, category) => {
  acc[category.key] = category.data;
  return acc;
}, {} as Record<string, Symbol[]>);

export const getSymbolsByCategory = (categoryKey: string): Symbol[] => {
  return symbolsByCategory[categoryKey] || [];
};
 