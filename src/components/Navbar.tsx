// src/components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, X, ArrowRight, Store } from 'lucide-react';
import SearchModal from './SearchModal';
import { useWorld } from '@/context/WorldContext';
import { useCart } from '@/context/CartContext';
import { playMechanicalClick, playSubBassThud } from '@/utils/soundEffects';

export default function Navbar() {
  const { openCart, activeCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { world, setWorld, openShowroom } = useWorld();

  const isShoesWorld = world === 'shoes';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isShoesWorld
          ? 'border-[#00695c]/25 bg-[#060e0a]/95'
          : 'border-[#1E1E1E] bg-[#080808]/95'
      }`}>
        
        {/* Crisp Single Announcement Bar */}
        <div className="bg-[#0A0A0A] border-b border-[#1E1E1E] py-2 px-4 text-center text-xs font-medium tracking-[0.06em] text-[#A09D94] uppercase select-none">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#F4F4F4] font-bold">FREE EXPRESS SHIPPING ON PREPAID ORDERS</span>
            <span className="text-[#77746E]" aria-hidden="true">·</span>
            <span className="text-amber-400 font-bold">₹300 OFF ON 2+ ITEMS · CODE: KM300</span>
            <span className="hidden md:inline text-[#77746E]" aria-hidden="true">·</span>
            <span className="hidden md:inline text-white">7-DAY DOORSTEP EXCHANGES</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto flex h-[58px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12">
          
          {/* LEFT: Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { playMechanicalClick(); setMenuOpen(true); }} 
              className="p-1 text-[#F4F4F4] hover:text-white cursor-pointer min-h-[44px] min-w-[36px] flex flex-col justify-center gap-1.5" 
              aria-label="Open Navigation Menu"
            >
              <span className="w-5 h-[2px] bg-[#F4F4F4] block" />
              <span className="w-3.5 h-[2px] bg-[#F4F4F4] block" />
            </button>

            <Link href="/" className="flex items-center">
              <span className="text-base sm:text-lg font-black tracking-tight font-[var(--font-display)] uppercase text-[#F4F4F4]">
                KAPDA MAFIA
              </span>
            </Link>
          </div>

          {/* CENTER: Department Switcher (Kapda Mafia | Shoes Mafia) + Category Links */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Department Toggle */}
            <div className="flex items-center rounded-full border border-[#222222] bg-[#111111] p-1 text-xs">
              <button
                onClick={() => {
                  playSubBassThud();
                  setWorld('clothing');
                }}
                className={`px-4 py-1.5 rounded-full font-bold uppercase transition-all duration-200 cursor-pointer ${
                  !isShoesWorld
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Kapda Mafia
              </button>
              <button
                onClick={() => {
                  playSubBassThud();
                  setWorld('shoes');
                }}
                className={`px-4 py-1.5 rounded-full font-bold uppercase transition-all duration-200 cursor-pointer ${
                  isShoesWorld
                    ? 'bg-[#00695c] text-white shadow-sm'
                    : 'text-[#888888] hover:text-[#00695c]'
                }`}
              >
                Shoes Mafia
              </button>
            </div>

            {/* Clean Category Links for Active World */}
            <nav className="flex items-center gap-5 text-xs tracking-wider text-[#A09D94] uppercase">
              <Link href="/shop" className="hover:text-white transition-colors">
                All Drops
              </Link>
              <Link href="/shop?category=tees" className="hover:text-white transition-colors">
                Tees
              </Link>
              <Link href="/shop?category=cargos" className="hover:text-white transition-colors">
                Cargos
              </Link>
              <Link href="/shop?category=hoodies" className="hover:text-white transition-colors">
                Hoodies
              </Link>
              <Link href="/shop?category=denim" className="hover:text-white transition-colors">
                Denim
              </Link>
            </nav>
          </div>

          {/* RIGHT: Showroom Reopen + Search + Bag */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#F4F4F4]">
            
            {/* Showroom Revisit Button */}
            <button
              onClick={() => {
                playSubBassThud();
                if (openShowroom) openShowroom();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#222222] bg-[#111111] hover:border-white/30 text-[#AAAAAA] hover:text-white transition-colors text-xs uppercase tracking-wider cursor-pointer min-h-[44px]"
              title="Reopen physical entrance"
            >
              <Store size={14} />
              <span>Showroom</span>
            </button>

            {/* Search */}
            <button 
              onClick={() => { playMechanicalClick(); setSearchOpen(true); }} 
              className="flex p-2 text-[#888888] hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[36px] items-center justify-center gap-1.5 text-xs uppercase" 
              aria-label="Search catalog"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Bag Button */}
            <button 
              onClick={() => { playMechanicalClick(); openCart(); }} 
              className="flex items-center gap-2 border border-[#222222] bg-[#141414] hover:bg-[#1A1A1A] hover:border-[#444444] px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[38px] text-[#F4F4F4] rounded-sm" 
              aria-label={`Open shopping bag with ${activeCount} items`}
            >
              <ShoppingBag size={14} />
              <span>Bag ({activeCount})</span>
            </button>
          </div>

        </div>

        {/* FULL-SCREEN OVERLAY MENU */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-6 sm:p-12 text-[#F4F4F4] animate-fade-in overflow-y-auto">
            
            <div className="flex items-center justify-between pb-6 border-b border-[#1E1E1E]">
              <span className="text-base font-black uppercase tracking-tight font-[var(--font-display)]">
                KAPDA MAFIA
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 text-[#888888] hover:text-white border border-[#222222] hover:border-white transition-colors cursor-pointer flex items-center gap-2 text-xs uppercase"
                aria-label="Close menu"
              >
                <span>Close</span>
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center py-8 space-y-4 sm:space-y-5">
              {[
                { name: 'All Drops', href: '/shop' },
                { name: 'Oversized Tees', href: '/shop?category=tees' },
                { name: 'Balloon Pants & Cargos', href: '/shop?category=cargos' },
                { name: 'Heavy Hoodies', href: '/shop?category=hoodies' },
                { name: 'Barrel Denim', href: '/shop?category=denim' },
                { name: 'Street Co-ord Sets', href: '/shop?category=coord-sets' },
                { name: 'Shoes Mafia Footwear', href: '/shoes', accent: '#00695c' },
                { name: 'Flagship Store (NIT-5)', href: '/store' }
              ].map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline justify-between border-b border-[#1A1A1A] pb-2.5 hover:border-white transition-colors"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-[#666666] group-hover:text-white transition-colors">
                      0{idx + 1}
                    </span>
                    <span 
                      className={`text-2xl sm:text-5xl font-bold uppercase tracking-tight font-[var(--font-display)] transition-transform group-hover:translate-x-2 duration-200 ${
                        item.accent ? 'text-[#80cbc4] group-hover:text-[#1a8f7a]' : 'text-[#F4F4F4]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight size={20} className="text-[#666666] group-hover:text-white transition-all" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#1E1E1E] text-xs">
              <div className="text-[#888888]">
                NIT-5 Faridabad Store · Worldwide Shipping
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (openShowroom) openShowroom();
                  }}
                  className="px-3.5 py-1.5 border border-[#222222] hover:border-white text-[#AAAAAA] hover:text-white uppercase text-[11px] rounded transition-colors cursor-pointer"
                >
                  Enter Showroom
                </button>
              </div>
            </div>

          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
