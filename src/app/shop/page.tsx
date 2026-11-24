'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import ProductCard360 from '@/components/ProductCard360';
import { RefreshCw, SlidersHorizontal, Sparkles } from 'lucide-react';
import { playMechanicalClick, playSubBassThud } from '@/utils/soundEffects';

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category')?.toUpperCase() || 'ALL';
  const [categoryOverride, setCategoryOverride] = useState<string | null>(null);
  const activeCategory = categoryOverride !== null ? categoryOverride : urlCategory;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFit, setSelectedFit] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('world', 'clothing');
        if (activeCategory !== 'ALL') queryParams.set('category', activeCategory);
        if (selectedFit !== 'ALL') queryParams.set('fit', selectedFit);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const items: Product[] = json.products || [];
          
          if (sortBy === 'price-low') items.sort((a, b) => a.price - b.price);
          if (sortBy === 'price-high') items.sort((a, b) => b.price - a.price);
          if (sortBy === 'newest') items.reverse();

          setProducts(items);
        }
      } catch (err) {
        console.error('Failed to load products from API:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCatalog();
  }, [activeCategory, selectedFit, sortBy]);

  const categories = [
    { id: 'ALL', label: 'All Pieces' },
    { id: 'HOODIES', label: 'Hoodies & Fleece' },
    { id: 'TEES', label: 'Tops & Heavy Tees' },
    { id: 'BOTTOMWEAR', label: 'Bottoms & Cargos' },
    { id: 'DENIM', label: 'Barrel Denim' },
    { id: 'ACCESSORIES', label: 'Accessories' }
  ];

  return (
    <div className="py-8 sm:py-14 bg-[#080808] min-h-screen text-[#F4F4F4] font-body selection:bg-[#B6191A] selection:text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Stitch Screen 04: Editorial Catalogue Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E1E1E] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#888888]">
              <span className="w-1.5 h-1.5 bg-[#B6191A] rounded-full inline-block" />
              <span>Archive &amp; Drop 04 // Concrete &amp; Ash</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F4F4F4] font-[var(--font-headline)]">
              Shop All
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#C8C3B8] font-light max-w-xl">
              Architectural cuts, custom-milled 480 GSM terry fleece, and tailored utilitarian streetwear silhouettes.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="px-3 py-1.5 bg-[#111111] border border-[#222222] text-[#C8C3B8] tracking-widest tabular-nums uppercase">
              {loading ? 'CALIBRATING...' : `${products.length} PIECES AVAILABLE`}
            </span>
            <Link
              href="/ai-fit"
              onClick={() => playMechanicalClick()}
              className="hidden sm:inline-flex items-center gap-1.5 text-[#B6191A] hover:text-white transition-colors uppercase tracking-widest text-[11px] font-semibold"
            >
              <Sparkles size={12} />
              <span>Proportional Drape Lab</span>
            </Link>
          </div>
        </div>

        {/* Stitch Filter & Sort Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#1E1E1E] mb-8">
          
          {/* Category Tabs (Clean Brutalist Pill Bar) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Catalog Categories">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playMechanicalClick();
                    setCategoryOverride(cat.id);
                  }}
                  className={`px-4 py-2 text-xs uppercase font-label tracking-wider transition-all duration-150 rounded-none cursor-pointer whitespace-nowrap min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'bg-[#111111] text-[#A09D94] border border-[#222222] hover:text-white hover:border-[#444444]'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Silhouette & Sort Selectors */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] px-3 py-1.5">
              <SlidersHorizontal size={12} className="text-[#888888]" />
              <label htmlFor="fit-selector" className="text-[#888888] uppercase text-[11px]">Fit:</label>
              <select
                id="fit-selector"
                value={selectedFit}
                onChange={(e) => {
                  playMechanicalClick();
                  setSelectedFit(e.target.value);
                }}
                className="bg-transparent text-[#F4F4F4] text-xs font-mono uppercase focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-[#111111]">All Cuts</option>
                <option value="OVERSIZED" className="bg-[#111111]">Oversized</option>
                <option value="BAGGY" className="bg-[#111111]">Baggy</option>
                <option value="REGULAR" className="bg-[#111111]">Regular Boxy</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] px-3 py-1.5">
              <label htmlFor="sort-selector" className="text-[#888888] uppercase text-[11px]">Sort:</label>
              <select
                id="sort-selector"
                value={sortBy}
                onChange={(e) => {
                  playMechanicalClick();
                  setSortBy(e.target.value);
                }}
                className="bg-transparent text-[#F4F4F4] text-xs font-mono uppercase focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#111111]">Featured — Drop 04</option>
                <option value="newest" className="bg-[#111111]">Newest Releases</option>
                <option value="price-low" className="bg-[#111111]">Price: Low → High</option>
                <option value="price-high" className="bg-[#111111]">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4-Column High-Converting Commercial Product Grid */}
        {loading ? (
          <div className="py-28 text-center space-y-4">
            <RefreshCw size={24} className="mx-auto text-[#B6191A] animate-spin" />
            <div className="text-xs font-mono text-[#888888] tracking-widest uppercase">
              Indexing Catalog Inventory...
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-[#111111] border border-[#1E1E1E] p-8">
            <div className="text-sm font-bold text-[#F4F4F4] uppercase font-mono tracking-wider">
              No pieces match this filter configuration
            </div>
            <p className="text-xs text-[#888888] max-w-sm mx-auto">
              Try adjusting your category or silhouette filter to explore our current seasonal archive.
            </p>
            <button
              onClick={() => {
                playSubBassThud();
                setCategoryOverride('ALL');
                setSelectedFit('ALL');
              }}
              className="px-6 py-3 bg-white text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#F4F4F4] transition-colors cursor-pointer min-h-[44px]"
            >
              Reset Catalog Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {products.map((product) => (
              <ProductCard360 key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-28 text-center text-xs font-mono text-[#888888] tracking-widest">
          LOADING DROP 04 CATALOGUE...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
