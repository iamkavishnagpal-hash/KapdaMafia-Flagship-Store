import { NextResponse } from 'next/server';
import { getDatabase, initializeDatabase } from '@/services/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const world = searchParams.get('world');
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');
  const fit = searchParams.get('fit');

  try {
    await initializeDatabase();
    const db = getDatabase();

    let sql = `
      SELECT 
        p.*,
        v.id as variant_id,
        v.color_name,
        v.color_hex,
        v.hero_image_url,
        v.scrubber_frames
      FROM products p
      LEFT JOIN product_variants v ON v.product_id = p.id
      WHERE p.is_active = 1
    `;
    const params: (string | number)[] = [];

    if (world) {
      sql += ' AND p.store_world = ?';
      params.push(world);
    }
    if (category && category !== 'ALL') {
      sql += ' AND LOWER(p.category) = LOWER(?)';
      params.push(category);
    }
    if (slug) {
      sql += ' AND p.slug = ?';
      params.push(slug);
    }
    if (fit && fit !== 'ALL') {
      sql += ' AND p.fit = ?';
      params.push(fit);
    }

    sql += ' ORDER BY p.created_at DESC';

    const result = await db.execute({ sql, args: params });

    // Format SQL rows into client Product contract
    const products = result.rows.map(row => {
      let frames: string[] = [];
      try {
        frames = JSON.parse(row.scrubber_frames as string);
      } catch {
        frames = [row.hero_image as string];
      }

      return {
        id: row.id as string,
        sku: row.sku as string,
        slug: row.slug as string,
        name: row.name as string,
        tagline: row.tagline as string,
        storeWorld: row.store_world as 'clothing' | 'shoes',
        category: row.category as string,
        fit: row.fit as string,
        price: row.price as number,
        originalPrice: row.original_price as number | undefined,
        badge: row.badge as string,
        dropName: row.drop_name as string,
        description: row.description as string,
        gsm: row.gsm as number | undefined,
        rating: row.rating as number,
        reviewCount: row.review_count as number,
        isFeatured: Boolean(row.is_featured),
        variants: [
          {
            id: row.variant_id as string || 'var-1',
            colorName: row.color_name as string || 'Black',
            colorHex: row.color_hex as string || '#000000',
            sizes: [
              { size: 'S', stock: 5 },
              { size: 'M', stock: 8 },
              { size: 'L', stock: 2 },
              { size: 'XL', stock: 1 }
            ],
            images: frames.map((url, i) => ({
              id: `img-${i}`,
              url,
              type: 'image' as const,
              alt: `${row.name} angle ${i + 1}`,
              view: i === 0 ? 'hero' : 'detail'
            }))
          }
        ]
      };
    });

    return NextResponse.json({
      database: 'libsql-sqlite-live',
      query_executed: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('SQL Query execution failed:', error);
    return NextResponse.json(
      { error: 'Database query failed', details: String(error) },
      { status: 500 }
    );
  }
}
