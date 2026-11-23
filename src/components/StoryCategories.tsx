// src/components/StoryCategories.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Sparkles } from 'lucide-react';
import { playMechanicalClick } from '@/utils/soundEffects';

interface StoryCategory {
  id: string;
  name: string;
  subtext: string;
  image: string;
  href: string;
  isHot?: boolean;
  isNew?: boolean;
}

const STORY_CATEGORIES: StoryCategory[] = [
  {
    id: 'all',
    name: 'ALL RELEASES',
    subtext: '440 GSM DROP',
    image: '/media/hero/hero-male-streetwear.webp',
    href: '/shop',
    isHot: true
  },
  {
    id: 'tees',
    name: 'OVERSIZED TEES',
    subtext: '280-440 GSM',
    image: '/media/product-tee.png',
    href: '/shop?category=tees',
    isHot: true
  },
  {
    id: 'cargos',
    name: 'BALLOON & CARGO',
    subtext: 'BAGGY SLOUCH',
    image: '/media/product-cargo.png',
    href: '/shop?category=cargos',
    isNew: true
  },
  {
    id: 'hoodies',
    name: 'HEAVY HOODIES',
    subtext: '500 GSM FLEECE',
    image: '/media/product-hoodie.png',
    href: '/shop?category=hoodies'
  },
  {
    id: 'denim',
    name: 'BARREL DENIM',
    subtext: 'RIGID 14.5 OZ',
    image: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
    href: '/shop?category=denim'
  },
  {
    id: 'jackets',
    name: 'OUTERWEAR',
    subtext: 'BOMBERS & WORK',
    image: '/media/product-jacket.png',
    href: '/shop?category=jackets'
  },
  {
    id: 'coord-sets',
    name: 'STREET CO-ORDS',
    subtext: 'MATCHED UNIFORMS',
    image: 'https://www.powerlook.in/cdn/shop/files/7_3x_888d77c3-7b5a-4a6f-bf88-66c15809bf99.jpg?v=1787637637',
    href: '/shop?category=coord-sets'
  },
  {
    id: 'shoes',
    name: 'SHOES MAFIA',
    subtext: 'DUAL-DENSITY LAB',
    image: '/media/flying-sneaker-3d.jpg',
    href: '/shoes',
    isNew: true
  }
];

export default function StoryCategories() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-6 sm:py-8 overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header label */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A] animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-[#A09D94] uppercase">
              QUICK SHOP // ARCHIVAL SILHOUETTES
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase hidden sm:inline">
            SWIPE TO EXPLORE CATEGORIES →
          </span>
        </div>

        {/* Horizontal Snap Scroll Story Bubbles */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {STORY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={playMechanicalClick}
              className="group flex flex-col items-center flex-shrink-0 text-center w-[78px] sm:w-[92px] cursor-pointer"
            >
              {/* Outer Avatar Frame with Animated Gradient Ring */}
              <div className="relative w-[70px] h-[70px] sm:w-[84px] sm:h-[84px] rounded-full p-[2px] bg-gradient-to-tr from-[#1E1E1E] via-[#333333] to-[#1E1E1E] group-hover:from-[#7D0A0A] group-hover:via-[#A81515] group-hover:to-[#7D0A0A] transition-all duration-300 group-hover:scale-105 shadow-lg">
                
                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#111111] border border-black">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 70px, 84px"
                    className="object-cover object-center group-hover:scale-115 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Hot / New Micro Badges */}
                {cat.isHot && (
                  <span className="absolute -top-1 -right-1 bg-[#7D0A0A] text-white p-1 rounded-full shadow-md flex items-center justify-center">
                    <Flame size={10} className="fill-white" />
                  </span>
                )}
                {cat.isNew && (
                  <span className="absolute -top-1 -right-1 bg-[#1A8F7A] text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-md">
                    NEW
                  </span>
                )}
              </div>

              {/* Title & Subtext */}
              <span className="mt-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-tight text-[#EAE6DF] group-hover:text-white transition-colors line-clamp-1 uppercase">
                {cat.name}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[#888888] tracking-widest uppercase">
                {cat.subtext}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
