// src/components/StoryCategories.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { playMechanicalClick } from '@/utils/soundEffects';

interface StoryCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

const STORY_CATEGORIES: StoryCategory[] = [
  {
    id: 'all',
    name: 'ALL DROPS',
    image: '/media/hero/hero-male-streetwear.webp',
    href: '/shop',
  },
  {
    id: 'tees',
    name: 'OVERSIZED TEES',
    image: '/media/product-tee.png',
    href: '/shop?category=tees',
  },
  {
    id: 'cargos',
    name: 'CARGOS',
    image: '/media/product-cargo.png',
    href: '/shop?category=cargos',
  },
  {
    id: 'hoodies',
    name: 'HEAVY HOODIES',
    image: '/media/product-hoodie.png',
    href: '/shop?category=hoodies'
  },
  {
    id: 'denim',
    name: 'BARREL DENIM',
    image: '/media/category-denim.jpg',
    href: '/shop?category=denim'
  },
  {
    id: 'shoes',
    name: 'SHOES MAFIA',
    image: '/media/flying-sneaker-3d.jpg',
    href: '/shoes',
  }
];

export default function StoryCategories() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-6 sm:py-8 overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-[0.14em] text-[#C8C3B8] uppercase">Shop by category</span>
          <span className="text-xs font-mono tracking-wider text-[#888888] uppercase">Swipe to explore</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {STORY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={playMechanicalClick}
              className="group relative h-24 w-32 shrink-0 overflow-hidden border border-[#1E1E1E] bg-[#111111] sm:h-28 sm:w-36 min-h-[44px]"
            >
              <Image src={cat.image} alt="" fill sizes="(max-width: 640px) 128px, 144px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <span className="absolute inset-x-3 bottom-3 text-left text-xs font-mono font-bold tracking-wider text-white uppercase">{cat.name}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
