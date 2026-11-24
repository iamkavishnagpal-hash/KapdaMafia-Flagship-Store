'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { playSubBassThud, playMechanicalClick } from '@/utils/soundEffects';

interface ComboItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  sizes: string[];
}

const TOPS: ComboItem[] = [
  {
    id: 'km-combo-tee',
    name: 'MONOCHROME STRIPED BOXY TEE',
    tagline: '280 GSM Yarn-Dyed Combed Cotton · Drop Shoulder',
    price: 1449,
    image: '/media/product-tee.png',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'km-combo-hoodie',
    name: 'NATURAL EMBROIDERY LINEN SHIRT',
    tagline: '190 GSM Breathable Camp Collar · Relaxed Drape',
    price: 1499,
    image: '/media/product-hoodie.png',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

const BOTTOMS: ComboItem[] = [
  {
    id: 'km-combo-denim',
    name: 'DARK BLUE BARREL FIT JEANS',
    tagline: '440 GSM Rigid Cotton Denim · Articulated Curved Leg',
    price: 1899,
    image: '/media/category-denim.jpg',
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'km-combo-cargo',
    name: 'BLACK PANELED BAGGY TRACKPANT',
    tagline: '340 GSM Heavyweight Terry · Bungee Hem Utility',
    price: 1599,
    image: '/media/product-cargo.png',
    sizes: ['30', '32', '34', '36']
  }
];

const COMBO_PRICE = 2499;

export default function CuratedComboBuilder() {
  const { addToCart, openCart } = useCart();
  
  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedTopSize, setSelectedTopSize] = useState('L');
  
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
  const [selectedBottomSize, setSelectedBottomSize] = useState('32');

  const [isAdded, setIsAdded] = useState(false);

  const activeTop = TOPS[selectedTopIndex];
  const activeBottom = BOTTOMS[selectedBottomIndex];

  const originalTotal = activeTop.price + activeBottom.price;
  const savings = originalTotal - COMBO_PRICE;

  const handleAddComboToBag = () => {
    playSubBassThud();
    setIsAdded(true);

    // 1. Add Top to cart
    addToCart({
      productId: activeTop.id,
      name: `${activeTop.name} (Combo Pack)`,
      price: Math.round(COMBO_PRICE * (activeTop.price / originalTotal)),
      image: activeTop.image,
      size: selectedTopSize,
      category: 'tees',
      storeWorld: 'clothing'
    });

    // 2. Add Bottom to cart
    addToCart({
      productId: activeBottom.id,
      name: `${activeBottom.name} (Combo Pack)`,
      price: COMBO_PRICE - Math.round(COMBO_PRICE * (activeTop.price / originalTotal)),
      image: activeBottom.image,
      size: selectedBottomSize,
      category: 'cargos',
      storeWorld: 'clothing'
    });

    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 600);
  };

  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 sm:py-24 text-[#F4F4F4]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#7D0A0A] uppercase tracking-[0.14em] font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#7D0A0A]" />
              <span>Build a set</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] uppercase text-[#F4F4F4] leading-[0.95] font-[var(--font-display)]">
              Curated set <span className="text-[#888888]">₹{COMBO_PRICE.toLocaleString('en-IN')}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#888888]">
            <span className="inline-block px-2.5 py-1 bg-[#151515] border border-[#222222] text-[#F4F4F4] text-[11px] font-bold uppercase tracking-wider">
              INSTANT SAVINGS: ₹{savings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Interactive Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Piece 1 (Topwear) & Piece 2 (Bottomwear) Selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* ITEM 1: TOPWEAR SELECTOR */}
            <div className="bg-[#111111] border border-[#1E1E1E] p-5 sm:p-6 rounded-none">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E1E1E]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#7D0A0A] text-white text-xs font-bold flex items-center justify-center">01</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4F4F4]">Select topwear</span>
                </div>
                <span className="text-xs text-[#888888]">Regular ₹{activeTop.price}</span>
              </div>

              {/* Garment Choice Radio Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {TOPS.map((top, idx) => {
                  const isSelected = selectedTopIndex === idx;
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => {
                        playMechanicalClick();
                        setSelectedTopIndex(idx);
                      }}
                      className={`flex items-center gap-3 p-3 text-left border transition-all cursor-pointer min-h-[44px] ${
                        isSelected 
                          ? 'border-white bg-[#1A1A1A] text-white' 
                          : 'border-[#222222] bg-[#0E0E0E] text-[#888888] hover:border-[#444444]'
                      }`}
                    >
                      <div className="relative w-12 h-14 bg-black shrink-0 overflow-hidden">
                        <Image src={top.image} alt={top.name} fill sizes="48px" className="object-cover object-top" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase truncate text-[#F4F4F4]">{top.name}</div>
                        <div className="text-xs text-[#888888] truncate mt-0.5">{top.tagline.split('·')[0]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Size Selector for Top */}
              <div>
                <div className="text-xs text-[#888888] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Top size: <strong className="text-white">{selectedTopSize}</strong></span>
                  <span className="text-xs text-[#666666]">Boxy fit</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeTop.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        playMechanicalClick();
                        setSelectedTopSize(size);
                      }}
                      className={`min-h-11 min-w-11 px-3 text-xs font-bold transition-all border cursor-pointer ${
                        selectedTopSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-[#181818] text-[#888888] border-[#252525] hover:text-white hover:border-[#444444]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ITEM 2: BOTTOMWEAR SELECTOR */}
            <div className="bg-[#111111] border border-[#1E1E1E] p-5 sm:p-6 rounded-none">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E1E1E]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#7D0A0A] text-white text-xs font-bold flex items-center justify-center">02</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4F4F4]">Select bottomwear</span>
                </div>
                <span className="text-xs text-[#888888]">Regular ₹{activeBottom.price}</span>
              </div>

              {/* Garment Choice Radio Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {BOTTOMS.map((bottom, idx) => {
                  const isSelected = selectedBottomIndex === idx;
                  return (
                    <button
                      key={bottom.id}
                      type="button"
                      onClick={() => {
                        playMechanicalClick();
                        setSelectedBottomIndex(idx);
                      }}
                      className={`flex items-center gap-3 p-3 text-left border transition-all cursor-pointer min-h-[44px] ${
                        isSelected 
                          ? 'border-white bg-[#1A1A1A] text-white' 
                          : 'border-[#222222] bg-[#0E0E0E] text-[#888888] hover:border-[#444444]'
                      }`}
                    >
                      <div className="relative w-12 h-14 bg-black shrink-0 overflow-hidden">
                        <Image src={bottom.image} alt={bottom.name} fill sizes="48px" className="object-cover object-top" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase truncate text-[#F4F4F4]">{bottom.name}</div>
                        <div className="text-xs text-[#888888] truncate mt-0.5">{bottom.tagline.split('·')[0]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Size Selector for Bottom */}
              <div>
                <div className="text-xs text-[#888888] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Bottom size: <strong className="text-white">{selectedBottomSize}</strong></span>
                  <span className="text-xs text-[#666666]">Baggy taper</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeBottom.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        playMechanicalClick();
                        setSelectedBottomSize(size);
                      }}
                      className={`min-h-11 min-w-11 px-3 text-xs font-bold transition-all border cursor-pointer ${
                        selectedBottomSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-[#181818] text-[#888888] border-[#252525] hover:text-white hover:border-[#444444]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Live Visual Combo Preview & 1-Tap Add to Bag */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#1E1E1E] p-6 font-mono sticky top-24">
            
            {/* Visual Garment Pairing Mockup */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-black p-2 border border-[#1E1E1E]">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#181818]">
                <Image 
                  src={activeTop.image} 
                  alt={activeTop.name} 
                  fill 
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top" 
                />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] text-white border border-white/20">
                  TOP: {selectedTopSize}
                </div>
              </div>

              <div className="relative aspect-[3/4] overflow-hidden bg-[#181818]">
                <Image 
                  src={activeBottom.image} 
                  alt={activeBottom.name} 
                  fill 
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top" 
                />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] text-white border border-white/20">
                  BOTTOM: {selectedBottomSize}
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2.5 pb-5 border-b border-[#1E1E1E] text-xs">
              <div className="flex justify-between text-[#888888]">
                <span className="truncate pr-2">1x {activeTop.name}</span>
                <span className="shrink-0 line-through">₹{activeTop.price}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span className="truncate pr-2">1x {activeBottom.name}</span>
                <span className="shrink-0 line-through">₹{activeBottom.price}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>COMBO DISCOUNT SAVINGS</span>
                <span>-₹{savings}</span>
              </div>
              <div className="flex justify-between text-white text-base font-bold pt-2 border-t border-[#1E1E1E]">
                <span>FINAL COMBO PRICE</span>
                <span className="text-[#F4F4F4]">₹{COMBO_PRICE.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Add Complete Set CTA */}
            <button
              type="button"
              onClick={handleAddComboToBag}
              disabled={isAdded}
              className="mt-6 w-full h-14 bg-white hover:bg-[#F4F4F4] text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>COMBO ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>ADD COMPLETE SET TO BAG — ₹{COMBO_PRICE.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="mt-3 text-center text-[10px] text-[#666666] uppercase tracking-wider">
              Free Express Shipping · Pre-Packed Together · 7-Day Size Exchange
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
