'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { Lookbook } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { playMechanicalClick, playSubBassThud } from '@/utils/soundEffects';

export default function LookbookSection({ lookbooks }: { lookbooks: Lookbook[] }) {
  const { addToCart, openCart } = useCart();
  const [bundleAdded, setBundleAdded] = useState<Record<string, boolean>>({});

  const images = [
    '/media/lookbook-concrete-studio.jpg',
    '/media/lookbook-rain-editorial.jpg'
  ];

  const handleAddBundle = (lookId: string, index: number) => {
    playSubBassThud();
    if (index === 0) {
      // Look 1: Dark Blue Barrel Jeans + Striped Tee
      addToCart({
        productId: 'pl-001',
        name: 'DARK BLUE BARREL FIT JEANS',
        price: 1899,
        image: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
        size: '32',
        category: 'denim',
        storeWorld: 'clothing'
      });
      addToCart({
        productId: 'pl-002',
        name: 'BLACK AND WHITE STRIPED T-SHIRT',
        price: 1449,
        image: 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304',
        size: 'L',
        category: 'tees',
        storeWorld: 'clothing'
      });
    } else {
      // Look 2: Black Paneled Baggy Trackpant + Natural Linen Shirt
      addToCart({
        productId: 'pl-005',
        name: 'BLACK PANELED BAGGY TRACKPANT',
        price: 1899,
        image: 'https://www.powerlook.in/cdn/shop/files/7_3x_888d77c3-7b5a-4a6f-bf88-66c15809bf99.jpg?v=1787637637',
        size: 'M',
        category: 'cargos',
        storeWorld: 'clothing'
      });
      addToCart({
        productId: 'pl-008',
        name: 'NATURAL EMBROIDERY LINEN SHIRT',
        price: 1099,
        image: 'https://www.powerlook.in/cdn/shop/files/1497220.jpg?v=1779534340',
        size: 'M',
        category: 'tees',
        storeWorld: 'clothing'
      });
    }

    setBundleAdded(prev => ({ ...prev, [lookId]: true }));
    setTimeout(() => {
      setBundleAdded(prev => ({ ...prev, [lookId]: false }));
    }, 2500);

    openCart();
  };

  return (
    <section className="border-b border-[#1E1E1E] bg-[#080808] py-20 text-[#F4F4F4] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
              Editorial Styling // Curated Looks
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] uppercase sm:text-6xl text-[#F4F4F4]">
              Lookbook
            </h2>
          </div>
          <Link href="/lookbook" className="hidden items-center gap-2 text-xs tracking-wider uppercase font-mono font-semibold text-[#888888] hover:text-white transition-colors sm:flex">
            <span>View All Looks</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {lookbooks.map((look, index) => (
            <article key={look.id} className="group overflow-hidden border border-[#1E1E1E] bg-[#111111] flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={images[index % images.length]} 
                  alt={look.title} 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
                />
                <span className="absolute left-4 top-4 border border-[#1E1E1E] bg-[#080808]/90 backdrop-blur-sm px-2.5 py-1 text-xs tracking-wider font-mono text-[#F4F4F4]">
                  LOOK {String(index + 1).padStart(2, '0')} // 2-PIECE BUNDLE
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="mb-1.5 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
                    {look.subtitle.replace(/AFTER DARK/gi, 'AUTUMN / WINTER')}
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight uppercase text-[#F4F4F4]">
                    {look.title.replace(/AFTER DARK/gi, 'SIGNATURE')}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#888888]">
                    {look.description.replace(/after dark/gi, 'in any condition')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1E1E1E] flex items-center justify-between gap-3">
                  <button 
                    onClick={() => handleAddBundle(look.id, index)}
                    onMouseEnter={playMechanicalClick}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase bg-[#FFFFFF] hover:bg-[#F4F4F4] text-[#080808] px-4 py-2.5 transition-colors cursor-pointer min-h-[36px]"
                  >
                    {bundleAdded[look.id] ? <Check size={14} className="text-emerald-600" /> : <ShoppingBag size={14} />}
                    <span>{bundleAdded[look.id] ? 'BUNDLE ALLOCATED' : 'BAG THIS FULL LOOK (2 PCS)'}</span>
                  </button>
                  <span className="text-xs text-[#666666] tracking-widest uppercase font-mono">
                    280–440 GSM
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
