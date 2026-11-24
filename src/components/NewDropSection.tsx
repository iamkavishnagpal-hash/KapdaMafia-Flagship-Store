// src/components/NewDropSection.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import ProductCard360 from '@/components/ProductCard360';
import { playMechanicalClick } from '@/utils/soundEffects';

interface NewDropProps {
  products: Product[];
}

type FilterCategory = 'ALL' | 'tees' | 'cargos' | 'hoodies' | 'denim';

export default function NewDropSection({ products }: NewDropProps) {
  const [activeTab, setActiveTab] = useState<FilterCategory>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Filter menswear items
  const menswearDrops = useMemo(() => {
    return products.filter(p => p.storeWorld !== 'shoes' && p.category !== 'sneakers');
  }, [products]);

  // Apply tab filter
  const filteredProducts = useMemo(() => {
    let result = [...menswearDrops];

    if (activeTab === 'tees') {
      result = result.filter(p => p.category === 'tees');
    } else if (activeTab === 'cargos') {
      result = result.filter(p => p.category === 'cargos');
    } else if (activeTab === 'hoodies') {
      result = result.filter(p => p.category === 'hoodies' || p.category === 'jackets');
    } else if (activeTab === 'denim') {
      result = result.filter(p => p.category === 'denim');
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [menswearDrops, activeTab, sortBy]);

  if (menswearDrops.length === 0) return null;

  const TABS: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'ALL', label: 'ALL DROPS', count: menswearDrops.length },
    { id: 'tees', label: 'OVERSIZED TEES', count: menswearDrops.filter(p => p.category === 'tees').length },
    { id: 'cargos', label: 'BALLOON & CARGOS', count: menswearDrops.filter(p => p.category === 'cargos').length },
    { id: 'hoodies', label: 'HEAVY HOODIES', count: menswearDrops.filter(p => p.category === 'hoodies' || p.category === 'jackets').length },
    { id: 'denim', label: 'BARREL DENIM', count: menswearDrops.filter(p => p.category === 'denim').length }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080808] border-b border-[#1E1E1E]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7D0A0A] uppercase tracking-[0.1em] font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#7D0A0A]" />
              <span>New arrivals</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[#F4F4F4] uppercase leading-[0.95] font-[var(--font-display)]">
              Drop 001 <span className="text-[#888888]">· New arrivals</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-xs tracking-[0.08em]">
            <span className="text-[#888888] uppercase hidden lg:inline">280–440 GSM French Terry &amp; Denim</span>
            <Link 
              href="/shop" 
              className="text-[#F4F4F4] hover:text-[#7D0A0A] transition-colors flex items-center gap-2 uppercase font-bold border-b border-[#1E1E1E] hover:border-[#7D0A0A] pb-0.5 min-h-[36px]"
            >
              <span>View full catalog ({products.length.toString().padStart(2, '0')})</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Genrage-Style Interactive Category Filter Tabs & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playMechanicalClick();
                    setActiveTab(tab.id);
                  }}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 min-h-[44px] ${
                    isActive
                      ? 'bg-white text-black shadow-md border border-white'
                      : 'bg-[#111111] text-[#888888] border border-[#1E1E1E] hover:border-[#444444] hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${isActive ? 'bg-black text-white' : 'bg-[#1A1A1A] text-[#888888]'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {activeTab !== 'ALL' && (
            <button
              type="button"
              onClick={() => setActiveTab('ALL')}
              className="min-h-11 px-3 text-xs font-semibold text-[#C8C3B8] underline underline-offset-4 hover:text-white"
            >
              Clear filter
            </button>
          )}

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 text-xs">
            <SlidersHorizontal size={14} className="text-[#888888]" />
            <span className="text-xs text-[#888888] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111111] border border-[#222222] text-[#EAE6DF] text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-white transition-colors cursor-pointer min-h-[44px]"
            >
              <option value="featured">FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="rating">TOP RATED</option>
            </select>
          </div>

        </div>

        {/* Dense desktop grid, easy 2-column mobile grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E1E1E] border border-[#1E1E1E]">
          {filteredProducts.map((product, idx) => (
            <ProductCard360 key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>

        {/* Bottom Quick Indicator */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#666666] gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>SHOWING {filteredProducts.length} OF {menswearDrops.length} PRODUCTS</span>
          </div>
          <Link href="/shop" className="text-[#7D0A0A] hover:text-[#961111] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
