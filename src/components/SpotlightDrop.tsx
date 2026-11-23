// src/components/SpotlightDrop.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Sparkles, Check, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { playSubBassThud, playMechanicalClick } from '@/utils/soundEffects';

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  spec: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
}

const SPOTLIGHT_OUTFIT: OutfitItem[] = [
  {
    id: 'pl-003',
    name: 'ACID WASHED OVERSIZED HEAVY TEE',
    category: 'tees',
    spec: '400 GSM COMBED COTTON · MINERAL WASH',
    price: 1399,
    originalPrice: 1999,
    image: '/media/product-tee.png',
    size: 'L'
  },
  {
    id: 'pl-004',
    name: 'BAGGY BALLOON TACTICAL CARGO',
    category: 'cargos',
    spec: '380 GSM HEAVY TWILL · 8-POCKET MODULAR',
    price: 1999,
    originalPrice: 2899,
    image: '/media/product-cargo.png',
    size: '32'
  },
  {
    id: 'sm-001',
    name: 'SPEED RUNNER LOW-TOP SNEAKER',
    category: 'sneakers',
    spec: 'DUAL-DENSITY NITRO SOLE · MATTE BLACK',
    price: 2499,
    originalPrice: 3499,
    image: '/media/flying-sneaker-3d.jpg',
    size: 'UK 9'
  }
];

export default function SpotlightDrop() {
  const { addToCart, openCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({
    'pl-003': 'L',
    'pl-004': '32',
    'sm-001': 'UK 9'
  });
  const [isOutfitAdded, setIsOutfitAdded] = useState(false);

  const totalOriginal = SPOTLIGHT_OUTFIT.reduce((acc, curr) => acc + curr.originalPrice, 0); // 8397
  const regularBundle = SPOTLIGHT_OUTFIT.reduce((acc, curr) => acc + curr.price, 0);          // 5897
  const fullLookBundlePrice = 4999; // Extra ₹898 instant discount on 3-piece full set!
  const totalSavings = totalOriginal - fullLookBundlePrice;                                   // ₹3,398 OFF

  const handleAddFullLook = () => {
    playSubBassThud();
    SPOTLIGHT_OUTFIT.forEach((item) => {
      addToCart({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: selectedSizes[item.id] || item.size,
        category: item.category as any,
        storeWorld: item.category === 'sneakers' ? 'shoes' : 'clothing'
      });
    });
    setIsOutfitAdded(true);
    setTimeout(() => setIsOutfitAdded(false), 2500);
    openCart();
  };

  const handleAddSingleItem = (item: OutfitItem) => {
    playMechanicalClick();
    addToCart({
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: selectedSizes[item.id] || item.size,
      category: item.category as any,
      storeWorld: item.category === 'sneakers' ? 'shoes' : 'clothing'
    });
    openCart();
  };

  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 sm:py-24 text-[#F4F4F4]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#7D0A0A] font-mono font-bold tracking-[0.2em] uppercase mb-1">
              <Sparkles size={12} className="text-amber-400" />
              <span>EDITORIAL DROP OF THE WEEK // 004</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-[var(--font-display)]">
              AFTER DARK <span className="text-[#888888]">· THE FULL UNIFORM</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-[#A09D94] uppercase hidden sm:inline">COMPLETE HEAD-TO-TOE STYLING</span>
            <div className="bg-[#7D0A0A] text-white px-3 py-1 font-bold uppercase rounded-sm">
              SAVE ₹{totalSavings} ON COMBO
            </div>
          </div>
        </div>

        {/* 2-Column Split: Editorial Visual Left + Outfit Dissection Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Full Editorial Lifestyle Banner */}
          <div className="lg:col-span-5 relative min-h-[460px] sm:min-h-[580px] rounded-xl overflow-hidden border border-[#1E1E1E] bg-[#111111] group">
            <Image
              src="/media/campaign-after-dark.png"
              alt="After Dark Complete Streetwear Uniform Look"
              fill
              priority
              className="object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono px-3 py-1 uppercase tracking-widest rounded-sm">
                RUN 004 // LIMITED 150 SETS
              </span>
              <span className="bg-[#7D0A0A] text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest rounded-sm w-fit">
                3-PIECE CAPSULE
              </span>
            </div>

            {/* Bottom Overlay Label */}
            <div className="absolute bottom-6 inset-x-6">
              <div className="text-[11px] font-mono tracking-widest text-[#A09D94] uppercase mb-1">
                STREET ARCHITECTURE // NCR
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-[var(--font-display)]">
                THE AFTER DARK UNIFORM
              </h3>
              <p className="text-xs font-mono text-[#CCCCCC] mt-1">
                Modeled at 6&apos;1&quot; wearing Size L / 32 / UK 9.
              </p>
            </div>
          </div>

          {/* RIGHT: Outfit Pieces Breakdown + Size Selectors + Instant Bundle Buy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Individual Item Tiles */}
            <div className="space-y-3 font-mono">
              {SPOTLIGHT_OUTFIT.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-[#1E1E1E] bg-[#0E0E0E] hover:border-[#333333] transition-colors gap-3"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded bg-black/60 border border-[#222222] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="text-[9px] sm:text-[10px] text-[#7D0A0A] font-bold tracking-widest uppercase">
                      PIECE 0{idx + 1} · {item.category.toUpperCase()}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase text-[#F4F4F4] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#888888] truncate mt-0.5">
                      {item.spec}
                    </p>

                    {/* Size Selector */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[9px] text-[#666666] uppercase">SIZE:</span>
                      {['S', 'M', 'L', 'XL'].map((sz) => {
                        const activeSz = item.category === 'cargos' 
                          ? (sz === 'S' ? '30' : sz === 'M' ? '32' : sz === 'L' ? '34' : '36')
                          : item.category === 'sneakers'
                          ? (sz === 'S' ? 'UK 8' : sz === 'M' ? 'UK 9' : sz === 'L' ? 'UK 10' : 'UK 11')
                          : sz;
                        const isSelected = selectedSizes[item.id] === activeSz;

                        return (
                          <button
                            key={sz}
                            onClick={() => {
                              playMechanicalClick();
                              setSelectedSizes(prev => ({ ...prev, [item.id]: activeSz }));
                            }}
                            className={`px-2 py-0.5 text-[9px] font-bold border transition-colors rounded-sm cursor-pointer ${
                              isSelected
                                ? 'bg-white text-black border-white'
                                : 'bg-[#141414] text-[#888888] border-[#222222] hover:text-white'
                            }`}
                          >
                            {activeSz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & Single Add */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="text-xs sm:text-sm font-bold text-white">
                      ₹{item.price}
                    </div>
                    <div className="text-[10px] text-[#666666] line-through">
                      ₹{item.originalPrice}
                    </div>
                    <button
                      onClick={() => handleAddSingleItem(item)}
                      className="mt-2 p-1.5 sm:px-2 sm:py-1 text-[10px] font-bold uppercase border border-[#2A2A2A] hover:border-white text-[#AAAAAA] hover:text-white rounded-sm transition-colors cursor-pointer"
                      title="Add single piece"
                    >
                      <span className="hidden sm:inline">+ ADD</span>
                      <ShoppingBag size={12} className="sm:hidden" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Instant Full Bundle Checkout Box */}
            <div className="p-5 sm:p-6 rounded-xl border-2 border-[#7D0A0A] bg-gradient-to-r from-[#170E10] to-[#0D0D0D] font-mono">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                    <Tag size={13} />
                    <span>COMPLETE UNIFORM BUNDLE PROMO</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      ₹{fullLookBundlePrice}
                    </span>
                    <span className="text-sm text-[#888888] line-through">
                      ₹{totalOriginal}
                    </span>
                    <span className="text-xs text-[#1A8F7A] font-bold bg-[#1A8F7A]/20 px-2 py-0.5 rounded">
                      YOU SAVE ₹{totalSavings}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A09D94] mt-1">
                    Includes Tee + Balloon Cargo + Speed Runner with applied instant capsule markdown.
                  </p>
                </div>

                {/* Claim Button */}
                <button
                  onClick={handleAddFullLook}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#7D0A0A] hover:bg-[#961111] text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#7D0A0A]/30 flex items-center justify-center gap-2"
                >
                  {isOutfitAdded ? (
                    <>
                      <Check size={16} />
                      <span>FULL LOOK ADDED!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>CLAIM FULL OUTFIT →</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
