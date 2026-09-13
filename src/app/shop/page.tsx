'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { MOCK_PRODUCTS } from '@/data/products';
import { Eye } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFit, setSelectedFit] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');

  let filtered = [...MOCK_PRODUCTS];
  if (selectedCategory !== 'ALL') {
    filtered = filtered.filter(p => p.category.toUpperCase() === selectedCategory);
  }
  if (selectedFit !== 'ALL') {
    filtered = filtered.filter(p => p.fit === selectedFit);
  }

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="mb-10 pb-6 border-b border-[#181818]">
          <div className="text-[10px] text-[#8C8C86] uppercase tracking-[0.35em] font-bold mb-1">
            CATALOG / MEN / {filtered.length} ITEMS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            SHOP UNIFORMS
          </h1>
        </div>

        {/* Editorial Filter Navigation */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-8 border-b border-[#181818] text-xs">
          
          {/* Underline Category Filter Tabs */}
          <div className="flex flex-wrap gap-6 text-[#8C8C86]">
            {['ALL', 'TEES', 'HOODIES', 'CARGOS', 'DENIM'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 transition-all uppercase tracking-widest ${selectedCategory === cat ? 'text-[#F3F0E8] font-bold border-b-2 border-[#F3F0E8]' : 'hover:text-[#F3F0E8]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Fit & Sort Dropdowns */}
          <div className="flex items-center gap-6 text-xs text-[#8C8C86]">
            <div className="flex items-center gap-2">
              <span>FIT:</span>
              <select 
                value={selectedFit} 
                onChange={(e) => setSelectedFit(e.target.value)}
                className="bg-[#111111] border border-[#222222] text-[#F3F0E8] px-2.5 py-1 rounded-sm focus:outline-none focus:border-[#8C8C86]"
              >
                <option value="ALL">ALL FITS</option>
                <option value="OVERSIZED">OVERSIZED</option>
                <option value="BAGGY">BAGGY</option>
                <option value="REGULAR">REGULAR</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>SORT:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111111] border border-[#222222] text-[#F3F0E8] px-2.5 py-1 rounded-sm focus:outline-none focus:border-[#8C8C86]"
              >
                <option value="featured">FEATURED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>

        </div>

        {/* Dense 4-Column Editorial Grid (16px Gap) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10">
          {filtered.map(product => (
            <div key={product.id} className="bg-[#111111] border border-[#181818] rounded-sm overflow-hidden group flex flex-col justify-between">
              <div className="relative aspect-[3/4] bg-[#181818] overflow-hidden">
                <img 
                  src={product.variants[0].images[0].url} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Quiet Badge */}
                <div className="absolute top-3 left-3 bg-[#080808]/90 border border-[#222222] text-[#F3F0E8] text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase">
                  {product.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/product/${product.slug}`}
                    className="w-full py-2.5 bg-[#F3F0E8] text-[#080808] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#B8B4AA] transition-colors"
                  >
                    <Eye size={14} /> VIEW DETAILS
                  </Link>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex justify-between items-start text-[10px] text-[#8C8C86]">
                  <span>{product.category} • {product.gsm ? `${product.gsm} GSM` : product.fit}</span>
                  <span className="text-xs font-bold text-[#F3F0E8]">₹{product.price.toLocaleString()}</span>
                </div>
                <h3 className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wide line-clamp-1">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
