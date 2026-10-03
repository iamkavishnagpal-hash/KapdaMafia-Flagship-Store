'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface NewDropSectionProps {
  products: Product[];
}

export default function NewDropSection({ products }: NewDropSectionProps) {
  // Focus on top 6 authentic menswear releases
  const drops = products
    .filter((p) => p.storeWorld !== 'shoes')
    .slice(0, 6);

  if (drops.length === 0) return null;

  return (
    <section id="drops" className="py-20 sm:py-28 bg-[#080808] border-b border-[#1E1E1E]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Latest Arrivals"
          title="Autumn & Winter"
          titleAccent="Editions"
          subtitle="Heavyweight silhouettes engineered in small runs for structured drape and effortless street presence."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#F4F4F4] hover:text-[#7D0A0A] uppercase tracking-wider transition-colors border-b border-[#333] hover:border-[#7D0A0A] pb-1"
            >
              <span>Explore All Releases ({products.length})</span>
              <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#222222] border border-[#222222]">
          {drops.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
