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
    <section className="py-16 sm:py-24 bg-[#050505] border-b border-[#1c1c1c]">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8">
        
        {/* Editorial Header with Military Vault Coordinates */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#1c1c1c] font-mono">
          <div>
            <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-[#8F1118] uppercase tracking-[0.3em] font-bold mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-ping" />
              <span>[KM-VAULT // DROP 09 // RUN: 250 UNITS]</span>
              <span className="text-[#555] hidden sm:inline">COORD: 28.3846° N, 77.3086° E</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-[-0.05em] text-[#EEEAE1] uppercase font-editorial leading-[0.9]">
              NEW DROP <span className="text-[#555]">/ AFTER DARK</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-[9px] sm:text-[10px] tracking-[0.2em] font-mono">
            <span className="text-[#666] uppercase hidden lg:inline">AUTHENTIC RIGID KNIT</span>
            <Link 
              href="/shop" 
              className="text-[#C8C3B8] hover:text-white transition-colors flex items-center gap-1.5 uppercase font-bold border-b border-[#333] hover:border-white pb-0.5"
            >
              FULL ARCHIVE ({products.length.toString().padStart(2, '0')}) <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Monolithic Continuous Architectural Grid with 1px Hairline Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {menswearDrops.map((product, idx) => (
            <ProductCard360 key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>

      </div>
    </section>
  );
}

