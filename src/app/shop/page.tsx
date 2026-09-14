'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import ProductCard360 from '@/components/ProductCard360';
import { ShieldCheck, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFit, setSelectedFit] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Load from dynamic Next.js PostgreSQL-bound API endpoint
  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('world', 'clothing');
        if (selectedCategory !== 'ALL') queryParams.set('category', selectedCategory);
        if (selectedFit !== 'ALL') queryParams.set('fit', selectedFit);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const items: Product[] = json.products || [];
          
          if (sortBy === 'price-low') items.sort((a, b) => a.price - b.price);
          if (sortBy === 'price-high') items.sort((a, b) => b.price - a.price);

          setProducts(items);
        }
      } catch (err) {
        console.error('Failed to load products from API:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCatalog();
  }, [selectedCategory, selectedFit, sortBy]);

  return (
    <div className="py-12 bg-[#050505] min-h-screen text-[#EEEAE1] font-mono selection:bg-[#8F1118]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Brutalist Editorial Header */}
        <div className="mb-10 pb-6 border-b border-[#1c1c1c]">
          <div className="text-[9px] text-[#8F1118] uppercase tracking-[0.35em] font-bold mb-2">
            MENSWEAR DROP 09 • REALTIME INVENTORY SYNC
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.04em] font-editorial">
              STREET UNIFORMS
            </h1>
            <span className="text-xs text-[#77746E] tracking-widest uppercase">
              {loading ? 'SYNCING DATABASE...' : `${products.length} VERIFIED STYLES`}
            </span>
          </div>
        </div>

        {/* Brutalist Filter Navigation */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-[#1c1c1c] text-xs">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-[#77746E]">
            {['ALL', 'TEES', 'HOODIES', 'CARGOS', 'DENIM'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 transition-all uppercase tracking-widest font-bold ${
                  selectedCategory === cat 
                    ? 'text-[#EEEAE1] border-b-2 border-[#8F1118]' 
                    : 'hover:text-[#EEEAE1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Fit & Sort Selectors */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#77746E]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-wider">FIT:</span>
              <select 
                value={selectedFit} 
                onChange={(e) => setSelectedFit(e.target.value)}
                className="bg-[#0f0f0f] border border-[#262626] text-[#EEEAE1] px-2.5 py-1.5 rounded-none focus:outline-none focus:border-[#8F1118]"
              >
                <option value="ALL">ALL SILHOUETTES</option>
                <option value="OVERSIZED">OVERSIZED</option>
                <option value="BAGGY">BAGGY</option>
                <option value="REGULAR">REGULAR</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-wider">SORT:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0f0f0f] border border-[#262626] text-[#EEEAE1] px-2.5 py-1.5 rounded-none focus:outline-none focus:border-[#8F1118]"
              >
                <option value="featured">FEATURED DROPS</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>

        </div>

        {/* Dynamic Product Grid with 360 Scrubbers */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <RefreshCw size={24} className="mx-auto text-[#8F1118] animate-spin" />
            <div className="text-xs text-[#77746E] tracking-widest uppercase">
              QUERYING POSTGRESQL PRODUCT REPOSITORY...
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <div className="text-sm font-bold text-[#EEEAE1] uppercase">NO PIECES MATCH THIS FILTER</div>
            <button 
              onClick={() => { setSelectedCategory('ALL'); setSelectedFit('ALL'); }}
              className="px-4 py-2 bg-[#1c1c1c] text-xs font-bold uppercase tracking-wider text-[#EEEAE1]"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 py-8">
            {products.map(product => (
              <ProductCard360 key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
