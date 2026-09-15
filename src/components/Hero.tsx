'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Hero() {
  const { addToCart, openCart } = useCart();
  const [activePin, setActivePin] = useState<number | null>(null);

  const pins = [
    {
      id: 1,
      title: 'MAFIA CREST TEE',
      spec: '400 GSM ACID WASH COMBED COTTON',
      top: '28%',
      left: '42%',
      productId: 'km-001',
      price: 1499,
      image: '/media/product-tee.png',
      category: 'tees'
    },
    {
      id: 2,
      title: 'BARREL DENIM PANT',
      spec: '440 GSM RIGID INDIGO SELVEDGE',
      top: '64%',
      left: '52%',
      productId: 'pl-001',
      price: 1899,
      image: '/media/campaign-after-dark.png',
      category: 'denim'
    }
  ];

  const handleQuickAddPin = (pin: typeof pins[0]) => {
    addToCart({
      productId: pin.productId,
      name: pin.title,
      price: pin.price,
      image: pin.image,
      size: 'L',
      category: pin.category,
      storeWorld: 'clothing'
    });
    openCart();
  };

  return (
    <section className="relative w-full bg-[#050505] text-[#EEEAE1] border-b border-[#181818] overflow-hidden">
      {/* 1. MAIN ASYMMETRICAL EDITORIAL CANVAS */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(88vh-48px)]">
        
        {/* LEFT COLUMN: RAW HIGH-TENSION TYPOGRAPHY (7 COLS) */}
        <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#161616] relative z-10">
          
          <div className="space-y-4">
            {/* Clean Luxury Collection Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#111111] border border-white/15 text-xs tracking-wider uppercase text-[#C8C3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118]" />
              <span className="font-semibold">Autumn / Winter 2026 Collection</span>
            </div>

            {/* High-tension scannable title */}
            <h1 className="text-4xl sm:text-7xl md:text-8xl xl:text-9xl font-black uppercase tracking-[-0.05em] leading-[0.88] sm:leading-[0.85] font-editorial text-[#F3F0E8] select-none pt-2">
              Clothes<br />
              Tell Better<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F1118] via-[#B91C1C] to-[#F3F0E8]">
                Stories.
              </span>
            </h1>

            {/* Editorial Doctrine */}
            <p className="max-w-xl text-sm text-[#8C8C86] leading-relaxed pt-2 tracking-normal">
              Custom 280–440 GSM heavyweight terry and selvedge denim. Sculpted silhouettes, deliberate drape, and underground streetwear attitude.
            </p>
          </div>

          {/* Action CTAs: Balanced dimensions & visual weight */}
          <div className="pt-6 sm:pt-12 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs font-semibold">
              <Link
                href="/shop"
                className="w-full sm:w-56 h-12 bg-[#F3F0E8] hover:bg-white text-[#050505] font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:scale-[1.01]"
              >
                <span>Explore Collection</span>
                <ArrowRight size={14} />
              </Link>

              {/* Standardized Virtual Mirror label */}
              <Link
                href="/ai-fit"
                className="w-full sm:w-56 h-12 bg-[#111111] hover:bg-[#181818] text-[#F3F0E8] border border-white/20 hover:border-white/50 font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <Compass size={15} className="text-[#8F1118]" />
                <span>Virtual Mirror</span>
              </Link>
            </div>

            {/* Clean Spec Strip */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#8C8C86] tracking-wider uppercase border-t border-[#161616] pt-4 overflow-x-auto whitespace-nowrap">
              <span>Limited Edition · 250 Units</span>
              <span className="text-[#333]">|</span>
              <span>440 GSM Combed French Terry</span>
              <span className="text-[#333]">|</span>
              <span className="text-[#8F1118] font-bold">Strictly No Restocks</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: FULL-BLEED EDITORIAL MODEL CANVAS (5 COLS) */}
        <div className="lg:col-span-5 relative bg-[#090909] overflow-hidden flex flex-col justify-between group min-h-[440px] sm:min-h-[560px] lg:min-h-full">
          
          {/* Main Visual Canvas - Unique High-Grain Editorial */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/media/campaign-editorial-model.jpg" 
              alt="Kapda Mafia Editorial Campaign Silhouette"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 to-transparent" />
          </div>

          {/* Interactive Streetwear Micro-Pins */}
          {pins.map(pin => (
            <div
              key={pin.id}
              style={{ top: pin.top, left: pin.left }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 font-mono"
            >
              <div className="relative group/pin">
                {/* Tactical Radar Pulse Pin */}
                <button
                  onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                  aria-label={`Inspect ${pin.title}`}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-black/90 border border-white/40 text-white shadow-2xl hover:border-[#8F1118] hover:scale-110 transition-all cursor-pointer min-h-[44px] min-w-[44px]"
                >
                  <span className="absolute w-7 h-7 rounded-full bg-[#8F1118] animate-ping opacity-60 pointer-events-none" />
                  <span className="text-xs font-black text-[#8F1118]">0{pin.id}</span>
                </button>

                {/* Tactile Micro-Spec Card Popover */}
                <div className={`absolute left-9 top-1/2 -translate-y-1/2 w-52 sm:w-60 p-3.5 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-200 pointer-events-auto ${
                  activePin === pin.id ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100 group-hover/pin:pointer-events-auto'
                }`}>
                  <div className="text-xs text-[#8F1118] uppercase tracking-wider font-semibold">
                    Featured Piece
                  </div>
                  <div className="text-xs font-bold text-white uppercase mt-0.5 font-editorial line-clamp-1">
                    {pin.title}
                  </div>
                  <div className="text-xs text-[#8C8C86] uppercase mt-1 leading-tight">
                    {pin.spec}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">₹{pin.price}</span>
                    
                    {/* Standardized button size and affordance */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddPin(pin);
                      }}
                      className="min-h-[32px] px-3 py-1.5 bg-[#8F1118] hover:bg-[#a6151e] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus size={12} /> Quick Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Top Floating Badge */}
          <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between">
            <div className="bg-[#050505]/90 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-xs tracking-wider uppercase text-[#EEEAE1]">
              Editorial Campaign
            </div>
            <div className="bg-[#8F1118] text-white text-xs font-bold tracking-wider px-3 py-1.5 uppercase">
              Current Drop
            </div>
          </div>

          {/* Bottom Interactive Spec Card */}
          <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-[#050505] to-transparent space-y-2">
            <div className="flex items-end justify-between font-mono">
              <div>
                <span className="text-xs text-[#8F1118] uppercase tracking-wider font-bold block mb-1">
                  KEY SILHOUETTE
                </span>
                <span className="text-sm sm:text-base font-black text-white uppercase tracking-tight font-editorial">
                  MAFIA CREST OVERSIZED TEE + BARREL DENIM
                </span>
              </div>
              <Link 
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#F3F0E8] hover:text-[#8F1118] uppercase underline underline-offset-4 transition-colors min-h-[36px]"
              >
                <span>View Full Archive</span> <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* 3. INDUSTRIAL MONOLITHIC SPEC STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#181818] border-t border-[#181818] text-xs text-[#8C8C86]">
        <div className="bg-[#080808] p-4 sm:p-5 hover:bg-[#0c0c0c] transition-colors">
          <span className="block text-[#EEEAE1] font-bold text-xs uppercase mb-0.5 tracking-wider">440 GSM Heavyweight</span>
          Custom Combed Terry Weave
        </div>
        <div className="bg-[#080808] p-4 sm:p-5 hover:bg-[#0c0c0c] transition-colors">
          <span className="block text-[#EEEAE1] font-bold text-xs uppercase mb-0.5 tracking-wider">Acid Wash & Pigment</span>
          Hand-Distressed Mineral Dye
        </div>
        <div className="bg-[#080808] p-4 sm:p-5 hover:bg-[#0c0c0c] transition-colors">
          <span className="block text-[#EEEAE1] font-bold text-xs uppercase mb-0.5 tracking-wider">Small-Batch Production</span>
          Individually Numbered Archive
        </div>
        <div className="bg-[#080808] p-4 sm:p-5 hover:bg-[#0c0c0c] transition-colors">
          <span className="block text-[#EEEAE1] font-bold text-xs uppercase mb-0.5 tracking-wider">Express Dispatch</span>
          Flagship Warehouse Transit
        </div>
      </div>

    </section>
  );
}
