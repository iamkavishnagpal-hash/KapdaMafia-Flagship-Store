'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() === '' 
    ? [] 
    : MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#080808]/95 backdrop-blur-md p-4 sm:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Search Command Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#181818]">
          <div className="text-[10px] font-mono text-[#8F1118] uppercase tracking-[0.3em] font-bold">
            COMMAND CENTER • SEARCH UNIFORM
          </div>
          <button onClick={onClose} className="p-2 text-[#B8B4AA] hover:text-[#F3F0E8] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="py-6 flex items-center gap-4 border-b border-[#181818]">
          <Search size={28} className="text-[#8F1118]" />
          <input 
            type="text" 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="WHAT ARE YOU LOOKING FOR? (E.G. HOODIE, CARGO, 400 GSM)"
            className="w-full bg-transparent text-xl sm:text-2xl font-mono text-[#F3F0E8] placeholder-[#8C8C86] focus:outline-none uppercase tracking-wide"
          />
        </div>

        {/* Suggested Searches & Quick Categories */}
        {query.trim() === '' && (
          <div className="py-8 space-y-6 font-mono">
            <div className="text-xs text-[#8C8C86] uppercase tracking-widest">SUGGESTED CATEGORIES</div>
            <div className="flex flex-wrap gap-3 text-xs">
              {['TEES', 'HOODIES', 'CARGOS', 'DENIM', 'SNEAKERS', 'NEW DROP'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setQuery(cat.toLowerCase())}
                  className="px-4 py-2 bg-[#111111] border border-[#222222] text-[#F3F0E8] hover:border-[#8F1118] hover:text-[#8F1118] transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instant Search Results */}
        {results.length > 0 && (
          <div className="py-6 flex-1 overflow-y-auto space-y-4 font-mono">
            <div className="text-xs text-[#8C8C86] uppercase tracking-widest">{results.length} MATCHING ITEMS FOUND</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map(product => (
                <Link 
                  key={product.id} 
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="p-4 bg-[#111111] border border-[#181818] hover:border-[#8F1118] rounded-sm flex gap-4 transition-colors"
                >
                  <img src={product.variants[0].images[0].url} alt={product.name} className="w-16 h-16 object-cover bg-[#181818]" />
                  <div className="flex-1">
                    <div className="text-[10px] text-[#8F1118] uppercase font-bold">{product.badge} • {product.category}</div>
                    <h4 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide">{product.name}</h4>
                    <div className="text-xs font-bold text-[#F3F0E8] mt-1">₹{product.price.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
