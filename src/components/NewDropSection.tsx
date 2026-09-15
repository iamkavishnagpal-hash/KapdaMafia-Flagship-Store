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
  const menswearDrops = products
    .filter(p => p.storeWorld !== 'shoes' && p.category !== 'sneakers')
    .slice(0, 8);

  if (menswearDrops.length === 0) return null;

  return (
    <section id="drop-archive" className="py-16 sm:py-24 bg-[#080808] border-b border-[#1E1E1E] scroll-mt-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Baseline alignment between heading and archive link */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#7D0A0A] uppercase tracking-[0.12em] font-mono font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#7D0A0A]" />
              <span>RUN 001 // ACTIVE VAULT ALLOCATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-[#F4F4F4] uppercase leading-[0.95]">
              Drop Archive <span className="text-[#888888]">· New Allocations</span>
            </h2>
          </div>
          
          {/* Tactical Spec and Direct Archive Link */}
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.12em]">
            <span className="text-[#888888] uppercase hidden lg:inline">280–440 GSM FRENCH TERRY & DENIM</span>
            <Link 
              href="/shop" 
              className="text-[#F4F4F4] hover:text-[#7D0A0A] transition-colors flex items-center gap-2 uppercase font-bold border-b border-[#1E1E1E] hover:border-[#7D0A0A] pb-0.5 min-h-[36px]"
            >
              <span>VIEW FULL ARCHIVE ({products.length.toString().padStart(2, '0')})</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Blueprint 3.C: 3-column masonry on desktop, 2-column on mobile with 1px hairline dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#1E1E1E] border border-[#1E1E1E]">
          {menswearDrops.map((product, idx) => (
            <ProductCard360 key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>

        {/* Mobile quick indicator */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#666666] px-1 sm:hidden">
          <span>Tap size to instant bag</span>
          <Link href="/shop" className="text-[#7D0A0A] font-bold flex items-center gap-1">
            ALL ({products.length}) <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}
