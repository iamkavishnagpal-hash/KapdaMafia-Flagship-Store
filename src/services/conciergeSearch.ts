import { Product } from '@/types/ecommerce';
import { MOCK_PRODUCTS } from '@/data/products';

export interface ConciergeIntent {
  rawQuery: string;
  category?: string;
  maxBudget?: number;
  minBudget?: number;
  fit?: 'OVERSIZED' | 'BAGGY' | 'REGULAR' | 'SLIM';
  color?: string;
  occasion?: string;
  clothingOrShoes?: 'clothing' | 'shoes';
  gsmMin?: number;
  interpretationSummary: string;
  matchedProducts: Product[];
}

// Common Hinglish / English synonyms
const CATEGORY_MAP: Record<string, string[]> = {
  tees: ['t-shirt', 'tshirt', 'tee', 't shirt', 'tees', 'top'],
  hoodies: ['hoodie', 'hoodies', 'sweatshirt', 'fleece'],
  cargos: ['cargo', 'cargos', 'pant', 'pants', 'trousers', 'tactical'],
  denim: ['jean', 'jeans', 'denim', 'barrel fit'],
  jackets: ['jacket', 'bomber', 'shacket', 'coat'],
  shoes: ['shoe', 'shoes', 'sneaker', 'sneakers', 'kicks', 'runners', 'boots']
};

const FIT_KEYWORDS: Record<string, 'OVERSIZED' | 'BAGGY' | 'REGULAR' | 'SLIM'> = {
  'oversized': 'OVERSIZED',
  'drop shoulder': 'OVERSIZED',
  'dropshoulder': 'OVERSIZED',
  'loose': 'OVERSIZED',
  'baggy': 'BAGGY',
  'relaxed': 'BAGGY',
  'regular': 'REGULAR',
  'slim': 'SLIM'
};

const COLOR_KEYWORDS = [
  'black', 'white', 'blue', 'indigo', 'grey', 'gray', 'charcoal', 
  'cream', 'beige', 'olive', 'green', 'acid wash', 'vintage wash'
];

export function parseConciergeQuery(query: string): ConciergeIntent {
  const clean = query.trim().toLowerCase();
  let matchedCategory: string | undefined;
  let detectedFit: 'OVERSIZED' | 'BAGGY' | 'REGULAR' | 'SLIM' | undefined;
  let detectedColor: string | undefined;
  let maxBudget: number | undefined;
  let minBudget: number | undefined;
  let detectedWorld: 'clothing' | 'shoes' | undefined;

  // 1. Budget extraction: e.g. "under 2500", "under ₹2500", "< 3000", "below 2000"
  const underMatch = clean.match(/(?:under|below|less than|kam me|tak|<)\s*(?:rs\.?|inr|₹)?\s*(\d+)/i) 
    || clean.match(/(\d+)\s*(?:k\b|thousand)/i);

  if (underMatch) {
    if (underMatch[0].includes('k') || underMatch[0].includes('thousand')) {
      maxBudget = parseInt(underMatch[1], 10) * 1000;
    } else {
      maxBudget = parseInt(underMatch[1], 10);
    }
  }

  // 2. Fit extraction
  for (const [key, fitVal] of Object.entries(FIT_KEYWORDS)) {
    if (clean.includes(key)) {
      detectedFit = fitVal;
      break;
    }
  }

  // 3. Color extraction
  for (const col of COLOR_KEYWORDS) {
    if (clean.includes(col)) {
      detectedColor = col;
      break;
    }
  }

  // 4. Category extraction
  for (const [catKey, terms] of Object.entries(CATEGORY_MAP)) {
    if (terms.some(t => clean.includes(t))) {
      matchedCategory = catKey;
      if (catKey === 'shoes') detectedWorld = 'shoes';
      break;
    }
  }

  // 5. GSM extraction: e.g. "400 gsm", "440gsm", "heavyweight"
  let gsmMin: number | undefined;
  const gsmMatch = clean.match(/(\d{3})\s*gsm/);
  if (gsmMatch) {
    gsmMin = parseInt(gsmMatch[1], 10);
  } else if (clean.includes('heavyweight') || clean.includes('heavy')) {
    gsmMin = 380;
  }

  // Filter Catalog Intelligently
  let candidates = [...MOCK_PRODUCTS];

  if (detectedWorld === 'shoes') {
    candidates = candidates.filter(p => p.storeWorld === 'shoes');
  }

  if (matchedCategory && matchedCategory !== 'shoes') {
    candidates = candidates.filter(p => p.category === matchedCategory);
  }

  if (maxBudget) {
    candidates = candidates.filter(p => p.price <= maxBudget);
  }

  if (detectedFit) {
    candidates = candidates.filter(p => p.fit === detectedFit || p.tagline?.toUpperCase().includes(detectedFit) || p.description.toUpperCase().includes(detectedFit));
  }

  if (detectedColor) {
    candidates = candidates.filter(p => {
      const v = p.variants[0];
      return v?.colorName.toLowerCase().includes(detectedColor!) || p.name.toLowerCase().includes(detectedColor!);
    });
  }

  if (gsmMin) {
    candidates = candidates.filter(p => (p.gsm || 0) >= gsmMin!);
  }

  // Fallback if filters were too restrictive
  if (candidates.length === 0) {
    if (matchedCategory && matchedCategory !== 'shoes') {
      candidates = MOCK_PRODUCTS.filter(p => p.category === matchedCategory);
    } else {
      candidates = MOCK_PRODUCTS.filter(p => {
        const tokens = clean.split(' ').filter(w => w.length > 2);
        return tokens.some(token => p.name.toLowerCase().includes(token) || p.category.toLowerCase().includes(token));
      });
    }
  }

  // Natural Human Explanation of the Intent
  const summaryParts: string[] = [];
  if (detectedColor) summaryParts.push(detectedColor.toUpperCase());
  if (detectedFit) summaryParts.push(detectedFit);
  if (matchedCategory) summaryParts.push(matchedCategory.toUpperCase());
  if (maxBudget) summaryParts.push(`UNDER ₹${maxBudget.toLocaleString('en-IN')}`);
  if (gsmMin) summaryParts.push(`≥${gsmMin} GSM`);

  const interpretationSummary = summaryParts.length > 0 
    ? summaryParts.join(' • ') 
    : 'CURATED SELECTIONS';

  return {
    rawQuery: query,
    category: matchedCategory,
    maxBudget,
    minBudget,
    fit: detectedFit,
    color: detectedColor,
    clothingOrShoes: detectedWorld,
    gsmMin,
    interpretationSummary,
    matchedProducts: candidates
  };
}
