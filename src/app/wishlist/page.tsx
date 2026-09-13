'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/products';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const savedProducts = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]];

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="pb-6 border-b border-[#181818] flex justify-between items-end">
          <div>
            <div className="text-[10px] text-[#8F1118] uppercase tracking-[0.3em] font-bold mb-1">
              SAVED UNIFORMS • WISHLIST REPOSITORY
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              YOUR WISHLIST <span className="text-[#8C8C86] font-normal">({savedProducts.length})</span>
            </h1>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProducts.map(product => (
            <div key={product.id} className="bg-[#111111] border border-[#181818] rounded-sm overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[4/5] bg-[#181818]">
                <img src={product.variants[0].images[0].url} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 p-2 bg-[#080808]/80 text-[#8C8C86] hover:text-[#8F1118]">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-[#8C8C86] uppercase">{product.category} • {product.gsm} GSM</span>
                  <span className="text-sm font-bold text-[#F3F0E8]">₹{product.price.toLocaleString()}</span>
                </div>
                <h3 className="text-sm font-bold text-[#F3F0E8] uppercase">{product.name}</h3>

                <Link 
                  href={`/product/${product.slug}`}
                  className="w-full py-3 bg-[#8F1118] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag size={14} /> VIEW & SELECT SIZE
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
