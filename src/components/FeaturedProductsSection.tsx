'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const featured = products
    .filter((p) => p.isFeatured && p.storeWorld !== 'shoes')
    .slice(0, 3);

  const displayItems = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A] border-b border-[#1E1E1E]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Curated Rotation"
          title="Core"
          titleAccent="Essentials"
          subtitle="Timeless heavy garments built with dense combed yarn to anchor daily streetwear rotation."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#F4F4F4] hover:text-[#7D0A0A] uppercase tracking-wider transition-colors border-b border-[#333] hover:border-[#7D0A0A] pb-1"
            >
              <span>Explore Wardrobe Essentials</span>
              <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222222] border border-[#222222]">
          {displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
