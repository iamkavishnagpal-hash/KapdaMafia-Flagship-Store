'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import ProductCard360 from '@/components/ProductCard360';

interface NewDropProps {
  products: Product[];
}

export default function NewDropSection({ products }: NewDropProps) {
  // Only 100% Menswear clothing items
  const menswearDrops = products
    .filter(p => p.storeWorld !== 'shoes' && p.category !== 'sneakers')
    .slice(0, 4);

  if (menswearDrops.length === 0) return null;

  return (
    <section className="py-20 bg-[#050505] border-b border-[#181818]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header with Syne Brutalist Display Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1c1c1c] pb-6 font-mono">
          <div>
            <div className="text-[9px] text-[#8F1118] uppercase tracking-[0.35em] font-bold mb-2">
              DROP 09 • STREET UNIFORMS • 100% MENSWEAR
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[#EEEAE1] uppercase font-editorial">
              NEW DROP <span className="text-[#77746E]">/ AFTER DARK</span>
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="mt-4 md:mt-0 text-[10px] tracking-[0.2em] text-[#C8C3B8] hover:text-[#EEEAE1] transition-colors flex items-center gap-2 uppercase font-bold"
          >
            VIEW FULL COLLECTION ({products.length.toString().padStart(2, '0')}) <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4-Column Brutalist Product Grid with 360 Scrubbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menswearDrops.map((product, idx) => (
            <ProductCard360 key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>

      </div>
    </section>
  );
}

