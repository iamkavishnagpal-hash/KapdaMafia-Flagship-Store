'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Compass, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { openCart, activeCount } = useCart();
  const { world, toggleWorld } = useWorld();

  // Hide bottom bar on Product Detail Pages so Add to Bag has full thumb-zone priority
  if (pathname.startsWith('/product/')) {
    return null;
  }

  const isShoes = world === 'shoes';

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#0D0D0D]/95 backdrop-blur-md border-t border-[#1E1E1E] px-4 py-2"
    >
      <div className="grid grid-cols-4 items-center text-center font-sans">
        {/* 1. SHOP */}
        <Link
          href={isShoes ? '/shoes' : '/shop'}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === '/shop' || pathname === '/shoes'
              ? 'text-[#F4F4F4] font-semibold'
              : 'text-[#888888]'
          }`}
        >
          <Compass size={20} />
          <span className="text-[10px] mt-1 uppercase tracking-wide">
            {isShoes ? 'Shoes' : 'Shop'}
          </span>
        </Link>

        {/* 2. LOOKBOOK */}
        <Link
          href="/lookbook"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === '/lookbook' ? 'text-[#F4F4F4] font-semibold' : 'text-[#888888]'
          }`}
        >
          <Sparkles size={20} />
          <span className="text-[10px] mt-1 uppercase tracking-wide">Lookbook</span>
        </Link>

        {/* 3. DUAL WORLD TOGGLE */}
        <button
          onClick={toggleWorld}
          aria-label="Switch between Kapda and Shoes"
          className="flex flex-col items-center justify-center py-1 text-[#888888] hover:text-[#F4F4F4] transition-colors cursor-pointer"
        >
          <div
            className={`w-5 h-5 rounded-sm border flex items-center justify-center text-[10px] font-bold ${
              isShoes
                ? 'border-[#1a8f7a] text-[#1a8f7a]'
                : 'border-[#F4F4F4] text-[#F4F4F4]'
            }`}
          >
            {isShoes ? 'S' : 'K'}
          </div>
          <span className="text-[10px] mt-1 uppercase tracking-wide">
            {isShoes ? 'To Kapda' : 'To Shoes'}
          </span>
        </button>

        {/* 4. CART */}
        <button
          onClick={openCart}
          aria-label="Open Shopping Bag"
          className="flex flex-col items-center justify-center py-1 text-[#888888] hover:text-[#F4F4F4] transition-colors relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag size={20} />
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#F4F4F4] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 uppercase tracking-wide">Bag</span>
        </button>
      </div>
    </nav>
  );
}
