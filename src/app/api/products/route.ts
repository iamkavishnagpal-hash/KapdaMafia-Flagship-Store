import { NextResponse } from 'next/server';
import { CatalogService } from '@/services/catalog';
import { CategorySlug } from '@/types/ecommerce';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const world = searchParams.get('world') === 'shoes' ? 'shoes' : 'clothing';
  const category = searchParams.get('category');
  const fit = searchParams.get('fit');
  const slug = searchParams.get('slug');

  const products = await CatalogService.getProducts({
    world,
    category: category && category !== 'ALL' ? category.toLowerCase() as CategorySlug : undefined,
  });

  const filtered = products.filter((product) => {
    if (slug && product.slug !== slug) return false;
    if (fit && fit !== 'ALL' && product.fit.toUpperCase() !== fit.toUpperCase()) return false;
    return true;
  });

  return NextResponse.json({ source: 'local-catalog', count: filtered.length, products: filtered });
}
