'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/ecommerce';
import ProductCard360 from '@/components/ProductCard360';
import { RefreshCw } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category')?.toUpperCase() || 'ALL';
  const [categoryOverride, setCategoryOverride] = useState<string | null>(null);
  const activeCategory = categoryOverride !== null ? categoryOverride : urlCategory;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFit, setSelectedFit] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Load from dynamic Next.js PostgreSQL-bound API endpoint
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
                onClick={() => setCategoryOverride(cat)}
                className={`pb-1 transition-all uppercase tracking-widest font-bold ${
                  activeCategory === cat 
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

        {/* Monolithic Edge-to-Edge Grid with 1px Hairline Dividers */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <RefreshCw size={24} className="mx-auto text-[#8F1118] animate-spin" />
            <div className="text-xs font-mono text-[#77746E] tracking-widest uppercase">
              QUERYING VAULT INVENTORY ARCHIVE // POSTGRESQL LIVE...
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <div className="text-sm font-bold text-[#EEEAE1] uppercase font-mono">NO PIECES MATCH THIS FILTER SPECIFICATION</div>
            <button 
              onClick={() => { setCategoryOverride('ALL'); setSelectedFit('ALL'); }}
              className="px-6 py-2.5 bg-[#121212] border border-[#262626] text-xs font-mono font-bold uppercase tracking-wider text-[#EEEAE1] hover:bg-[#8F1118] hover:border-[#8F1118] transition-colors"
            >
              RESET CATALOG FILTERS
            </button>
          </div>
        ) : (
          <div className="my-8">
            {/* Spec ticker bar above grid */}
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] px-3 py-2 text-[10px] font-mono text-[#77746E] flex items-center justify-between uppercase tracking-wider mb-[-1px] z-10 relative">
              <span className="text-[#EEEAE1] font-bold">[CATALOG: FULL_DISPATCH] // NIT 5 CONCRETE VAULT</span>
              <span>GRID VIEW: CONTINUOUS HAIRLINE // 100% MENSWEAR EDITIONS</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] overflow-hidden">
              {products.map(product => (
                <ProductCard360 key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-xs font-mono text-[#77746E]">
        LOADING SHOP CATALOG...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
