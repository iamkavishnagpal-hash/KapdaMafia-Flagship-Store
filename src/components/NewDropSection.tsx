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
    <section className="py-16 sm:py-24 bg-[#050505] border-b border-[#141414]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Baseline alignment between heading and archive link */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-4 border-b border-[#181818] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8F1118] uppercase tracking-wider font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-ping" />
              <span>Autumn / Winter · Limited Allocation</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[#EEEAE1] uppercase font-editorial leading-[0.88]">
              Current Drop <span className="text-[#555]">· New Arrivals</span>
            </h2>
          </div>
          
          {/* Scannable link with balanced baseline positioning */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#8C8C86] tracking-wider uppercase hidden lg:inline">280–440 GSM French Terry & Denim</span>
            <Link 
              href="/shop" 
              className="text-[#C8C3B8] hover:text-white transition-colors flex items-center gap-2 uppercase font-semibold border-b border-[#333] hover:border-white pb-0.5 min-h-[36px]"
            >
              <span>View Full Archive ({products.length.toString().padStart(2, '0')})</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Monolithic Continuous Architectural Grid with 1px Hairline Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#181818] border border-[#181818]">
          {menswearDrops.map((product, idx) => (
            <ProductCard360 key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>

        {/* Mobile Horizontal Quick-Scroll Strip Indicator */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#8C8C86] px-1 sm:hidden">
          <span>Swipe cards · Tap to select size</span>
          <Link href="/shop" className="text-[#8F1118] font-bold flex items-center gap-1">
            View All ({products.length}) <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}
