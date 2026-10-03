'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, ArrowRight, ShoppingBag, Eye, SlidersHorizontal, Check } from 'lucide-react';
import { parseConciergeQuery, ConciergeIntent } from '@/services/conciergeSearch';
import { useCart } from '@/context/CartContext';
import { useMafiaMirror } from '@/components/MafiaMirrorDrawer';
import { Product } from '@/types/ecommerce';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const { addToCart, openCart } = useCart();
  const { openMirror } = useMafiaMirror();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Parse natural conversational queries in real-time
  const searchResult: ConciergeIntent = useMemo(() => {
    return parseConciergeQuery(query);
  }, [query]);

  if (!isOpen) return null;

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
  };

  const handleDirectAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const defaultSize = product.variants[0]?.sizes[0]?.size || 'M';
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.variants[0]?.images[0]?.url || '',
      size: defaultSize,
      category: product.category,
      storeWorld: product.storeWorld || 'clothing'
    });
    setAddedItem(product.id);
    setTimeout(() => {
      setAddedItem(null);
      openCart();
      onClose();
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-[#080808]/96 backdrop-blur-xl p-4 sm:p-8 flex flex-col font-sans text-[#F4F4F4]"
      role="dialog"
      aria-modal="true"
      aria-label="Flagship Fashion Concierge & Search"
    >
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#1E1E1E]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#7D0A0A] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8C3B8]">
              FLAGSHIP CONCIERGE // NATURAL INTENT DISCOVERY
            </span>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2 text-[#888888] hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
            aria-label="Close Concierge"
          >
            <X size={20} />
          </button>
        </div>

        {/* Real Conversational Search Bar (Natural Hinglish/English Intent) */}
        <div className="py-6 border-b border-[#1E1E1E]">
          <div className="relative flex items-center gap-3 bg-[#111111] border border-[#222222] px-4 py-3 sm:py-4 focus-within:border-[#7D0A0A] transition-colors">
            <Search size={22} className="text-[#7D0A0A] shrink-0" />
            <input 
              type="text" 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Mujhe black drop shoulder t-shirt chahiye under 2500' or 'Baggy cargo'"
              className="w-full bg-transparent text-sm sm:text-lg text-[#F4F4F4] placeholder-[#666666] focus:outline-none"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-1 text-[#888] hover:text-white transition-colors text-xs font-mono uppercase"
              >
                Clear
              </button>
            )}
          </div>

          {/* Real-time Intent Decomposition Tag */}
          {query.trim().length > 2 && (
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#A0A0A0]">
                <span className="text-[#888]">INTENT PARSED:</span>
                <span className="px-2 py-0.5 bg-[#181818] border border-[#282828] text-white font-medium">
                  {searchResult.interpretationSummary}
                </span>
              </div>
              <span className="text-[#777]">
                {searchResult.matchedProducts.length} Silhouettes Available
              </span>
            </div>
          )}
        </div>

        {/* Initial State: High-Frequency Natural Prompts */}
        {query.trim() === '' && (
          <div className="py-8 space-y-6 flex-1 overflow-y-auto">
            <div>
              <div className="text-[11px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-3">
                FREQUENT VISITOR REQUESTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { text: 'Black drop shoulder t-shirt under 2500', label: 'HEAVYWEIGHT TEE' },
                  { text: 'Baggy tactical cargos with deep pockets', label: 'BOTTOMS' },
                  { text: 'Chunky sneakers with dual density sole', label: 'FOOTWEAR' },
                  { text: 'Heavyweight double-hood fleece 440 GSM', label: 'HOODIES' },
                  { text: 'Selvedge rigid denim barrel fit', label: 'DENIM' },
                  { text: 'Streetwear outfit under 5000', label: 'BUNDLE' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(item.text)}
                    className="p-3 bg-[#111111] hover:bg-[#161616] border border-[#1E1E1E] hover:border-[#7D0A0A] text-left flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono text-[#777] block text-[10px] uppercase">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm text-[#C8C3B8] group-hover:text-white">
                        "{item.text}"
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-[#555] group-hover:text-[#7D0A0A] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Category Quick-Pills */}
            <div>
              <div className="text-[11px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-3">
                BROWSE BY SILHOUETTE
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['ALL', 'TOPWEAR', 'BOTTOMWEAR', 'WINTERWEAR', 'CO-ORD SETS', 'BASICS', 'TEES', 'CARGOS', 'DENIM', 'SHOES', '440 GSM'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleQuickPrompt(cat.toLowerCase())}
                    className="px-3 py-1.5 bg-[#121212] border border-[#222222] hover:border-white text-[#A0A0A0] hover:text-white uppercase transition-colors cursor-pointer text-[11px]"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Stream: Direct Product Actions (View, Virtual Try, Quick Add) */}
        {query.trim() !== '' && (
          <div className="py-6 flex-1 overflow-y-auto space-y-4">
            {searchResult.matchedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-xs font-mono uppercase text-[#777] tracking-widest block">
                  NO DIRECT MATCH FOUND FOR "{query.toUpperCase()}"
                </span>
                <p className="text-sm text-[#A0A0A0] max-w-sm mx-auto">
                  Try searching with generic terms like "tee", "cargo", "hoodie", or budget ranges like "under 2000".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResult.matchedProducts.map((product) => {
                  const activeImg = product.variants[0]?.images[0]?.url || '';
                  const isShoes = product.storeWorld === 'shoes';

                  return (
                    <div 
                      key={product.id}
                      className="group bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#333] transition-all flex flex-col justify-between overflow-hidden"
                    >
                      <Link 
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="block aspect-[16/11] relative overflow-hidden bg-[#141414]"
                      >
                        <img 
                          src={activeImg} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.04]" 
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-wider text-[#C8C3B8]">
                          {product.badge || (isShoes ? 'FOOTWEAR' : `${product.gsm || 400} GSM`)}
                        </div>

                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/85 border border-white/10 text-[10px] font-mono font-semibold text-white">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </Link>

                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#777] uppercase tracking-wider block">
                            {product.category} // {product.fit || 'STANDARD'}
                          </span>
                          <Link 
                            href={`/product/${product.slug}`}
                            onClick={onClose}
                            className="text-sm font-semibold text-[#F4F4F4] group-hover:text-white transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                        </div>

                        {/* Direct Action Strip: View, Try On, Quick Bag */}
                        <div className="pt-2 border-t border-[#181818] flex items-center justify-between gap-2 text-xs">
                          {/* Virtual Try-On Trigger without breaking search flow */}
                          <button
                            onClick={() => {
                              openMirror(product);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#A0A0A0] hover:text-[#C8C3B8] transition-colors cursor-pointer"
                            title="Open Virtual Try-On"
                          >
                            <Eye size={13} />
                            <span>Try On</span>
                          </button>

                          {/* Instant 1-Tap Add to Bag */}
                          <button
                            onClick={(e) => handleDirectAdd(product, e)}
                            className={`px-3 py-1.5 text-[11px] font-mono uppercase font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              addedItem === product.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#181818] hover:bg-[#7D0A0A] text-[#F4F4F4] hover:text-white border border-[#2A2A2A]'
                            }`}
                          >
                            {addedItem === product.id ? (
                              <>
                                <Check size={12} />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={12} />
                                <span>Add to Bag</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Note */}
        <div className="pt-4 border-t border-[#1E1E1E] flex items-center justify-between text-[11px] font-mono text-[#666]">
          <span>NIT-5 FARIDABAD FLAGSHIP INVENTORY LEDGER</span>
          <span className="hidden sm:inline">TYPE NATURAL REQUESTS • PRESS ESC TO EXIT</span>
        </div>

      </div>
    </div>
  );
}
