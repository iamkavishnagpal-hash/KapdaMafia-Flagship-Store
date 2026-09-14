'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Sparkles, Shirt, Footprints, Flame, Compass } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { openCart, activeCount } = useCart();
  const { world, toggleWorld } = useWorld();

  // STICKY ACTION HIERARCHY: Hide bottom bar on Product Detail Pages
  // so the full-width Add to Bag bar has 100% clean thumb-zone priority
  if (pathname.startsWith('/product/')) {
    return null;
  }

  const isShoes = world === 'shoes';

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#070707]/95 backdrop-blur-xl border-t border-[#1a1a1a] px-2 py-2"
    >
      <div className="grid grid-cols-5 items-center text-center font-mono">
        
        {/* 1. SHOP / UNIFORMS */}
        <Link 
          href={isShoes ? "/shoes" : "/shop"}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === '/shop' || pathname === '/shoes' ? 'text-[#F3F0E8] font-bold' : 'text-[#77746E]'
          }`}
        >
          <Compass size={18} className={pathname === '/shop' || pathname === '/shoes' ? 'text-[#8F1118]' : ''} />
          <span className="text-[9px] tracking-wider uppercase mt-1">
            {isShoes ? 'SHOES' : 'SHOP'}
          </span>
        </Link>

        {/* 2. REAL AI FIT / TRY-ON */}
        <Link 
          href="/ai-fit"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === '/ai-fit' ? 'text-[#F3F0E8] font-bold' : 'text-[#77746E]'
          }`}
        >
          <div className="relative">
            <Sparkles size={18} className="text-[#8F1118]" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-pulse" />
          </div>
          <span className="text-[9px] tracking-wider uppercase mt-1">TRY-ON</span>
        </Link>

        {/* 3. DUAL WORLD SWAPPER (CENTER BUTTON) */}
        <button
          onClick={toggleWorld}
          aria-label="Switch Store World"
          className="flex flex-col items-center justify-center -mt-3"
        >
          <div className={`w-11 h-11 rounded-none border flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
            isShoes 
              ? 'bg-[#009688] border-[#80cbc4] text-white shadow-[#009688]/30' 
              : 'bg-[#8F1118] border-[#B91C1C] text-white shadow-[#8F1118]/30'
          }`}>
            {isShoes ? <Footprints size={20} /> : <Shirt size={20} />}
          </div>
          <span className="text-[8px] font-bold tracking-widest uppercase mt-0.5 text-[#C8C3B8]">
            {isShoes ? 'TO KAPDA' : 'TO SHOES'}
          </span>
        </button>

        {/* 4. LOOKBOOK / DROPS */}
        <Link 
          href="/lookbook"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === '/lookbook' ? 'text-[#F3F0E8] font-bold' : 'text-[#77746E]'
          }`}
        >
          <Flame size={18} className={pathname === '/lookbook' ? 'text-[#8F1118]' : ''} />
          <span className="text-[9px] tracking-wider uppercase mt-1">DROPS</span>
        </Link>

        {/* 5. BAG (ZERO-LATENCY DRAWER) */}
        <button
          onClick={openCart}
          aria-label="Open Shopping Bag"
          className="flex flex-col items-center justify-center py-1 text-[#77746E] hover:text-[#F3F0E8] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {activeCount > 0 && (
              <span className={`absolute -top-1.5 -right-2 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center ${
                isShoes ? 'bg-[#009688]' : 'bg-[#8F1118]'
              }`}>
                {activeCount}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-wider uppercase mt-1">BAG</span>
        </button>

      </div>
    </nav>
  );
}
