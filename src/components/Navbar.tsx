'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, X, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import SearchModal from './SearchModal';
import { useWorld } from '@/context/WorldContext';
import { useCart } from '@/context/CartContext';
import { isSoundEnabled, setSoundEnabled, playMechanicalClick, playSubBassThud } from '@/utils/soundEffects';

export default function Navbar() {
  const { openCart, activeCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const { world, setWorld } = useWorld();

  useEffect(() => {
    setSoundActive(isSoundEnabled());
  }, []);

  const isShoesWorld = world === 'shoes';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isShoesWorld
          ? 'border-[#00695c]/30 bg-[#060e0a]/95'
          : 'border-[#1E1E1E] bg-[#080808]/95'
      }`}>
        {/* Top Ticker: Desktop Minimal Industrial Coordinates Bar */}
        <div className="hidden lg:flex h-6 bg-[#0B0B0B] border-b border-[#1E1E1E] items-center justify-between px-8 lg:px-12 text-[10px] font-mono tracking-[0.12em] text-[#888888] uppercase">
          <div>FLAGSHIP STORE: NIT-5 FARIDABAD [28.3846° N, 77.3086° E] // WORLDWIDE SHIPPING</div>
          <div className="text-[#7D0A0A] font-bold">RUN 001 // EDITION OF 250</div>
        </div>

        <div className="mx-auto flex h-[56px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12 font-mono">
          
          {/* LEFT: Minimalist 2-line hamburger icon */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMenuOpen(true)} 
              className="p-2 text-[#F4F4F4] hover:text-white cursor-pointer min-h-[44px] min-w-[44px] flex flex-col justify-center gap-1.5 -ml-2" 
              aria-label="Open Full-Screen Menu"
            >
              <span className="w-5 h-[2px] bg-[#F4F4F4] transition-all block" />
              <span className="w-3.5 h-[2px] bg-[#F4F4F4] transition-all block" />
            </button>

            <Link href="/" className="hidden sm:flex items-center">
              <span className="text-sm font-black tracking-[-0.04em] font-[var(--font-display)] uppercase text-[#F4F4F4]">
                KAPDA MAFIA
              </span>
            </Link>
          </div>

          {/* CENTER: High-contrast [KAPDA MAFIA] aur [SHOES MAFIA] direct toggle */}
          <nav aria-label="Store Switcher" className="flex items-center border border-[#1E1E1E] bg-[#111111] p-0.5 text-[10px] sm:text-[11px] font-mono tracking-wider">
            <button
              onClick={() => setWorld('clothing')}
              className={`px-3 sm:px-4 py-1.5 font-bold uppercase transition-all duration-200 cursor-pointer ${
                !isShoesWorld
                  ? 'bg-[#FFFFFF] text-[#080808] shadow-md'
                  : 'text-[#888888] hover:text-[#F4F4F4]'
              }`}
              aria-pressed={!isShoesWorld}
            >
              [KAPDA MAFIA]
            </button>
            <button
              onClick={() => setWorld('shoes')}
              className={`px-3 sm:px-4 py-1.5 font-bold uppercase transition-all duration-200 cursor-pointer ${
                isShoesWorld
                  ? 'bg-[#00695c] text-white shadow-md hover:bg-[#1a8f7a]'
                  : 'text-[#888888] hover:text-[#1a8f7a]'
              }`}
              aria-pressed={isShoesWorld}
            >
              [SHOES MAFIA]
            </button>
          </nav>

          {/* RIGHT: SOUND TOGGLE · SEARCH · BAG [0] */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-[#F4F4F4]">
            {/* Audio Micro-Haptics Switch */}
            <button
              onClick={() => {
                const next = !soundActive;
                setSoundActive(next);
                setSoundEnabled(next);
                if (next) playSubBassThud();
              }}
              onMouseEnter={playMechanicalClick}
              className={`px-2 py-1 text-[10px] font-mono font-bold tracking-widest border transition-colors cursor-pointer flex items-center gap-1 ${
                soundActive
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                  : 'border-[#1E1E1E] bg-[#111111] text-[#888888] hover:text-white'
              }`}
              title="Toggle Audio Micro-Haptics"
              aria-label="Toggle sound"
            >
              {soundActive ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span className="hidden sm:inline">SOUND: {soundActive ? 'ON' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setSearchOpen(true)} 
              onMouseEnter={playMechanicalClick}
              className="hidden sm:flex p-2 text-[#888888] hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 text-xs uppercase tracking-wider" 
              aria-label="Search catalog"
            >
              <Search size={15} />
              <span>SEARCH</span>
            </button>

            <button 
              onClick={() => { playMechanicalClick(); openCart(); }} 
              onMouseEnter={playMechanicalClick}
              className="flex items-center gap-2 border border-[#1E1E1E] bg-[#111111] hover:bg-[#181818] px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[36px] text-[#F4F4F4]" 
              aria-label={`Open shopping bag with ${activeCount} items`}
            >
              <ShoppingBag size={14} />
              <span>BAG [{activeCount}]</span>
            </button>
          </div>

        </div>

        {/* INFINITE MARQUEE ENGINE: Ultra-smooth 60fps continuous strip with pause-on-hover */}
        <div className="marquee-container overflow-hidden border-t border-b border-[#1E1E1E] bg-[#0A0A0A] text-[#888888] py-1.5 text-[10px] font-mono tracking-[0.15em] uppercase select-none cursor-pointer">
          <div className="flex w-max animate-marquee-hardware whitespace-nowrap will-change-transform">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 px-3">
                <span>HEAVYWEIGHT ARCHIVE 001</span>
                <span className="text-[#7D0A0A] font-bold">//</span>
                <span>NITRO-WASHED COTTON</span>
                <span className="text-[#7D0A0A] font-bold">//</span>
                <span>WORLDWIDE DISPATCH</span>
                <span className="text-[#7D0A0A] font-bold">//</span>
                <span>FARIDABAD NIT-5 FLAGSHIP</span>
                <span className="text-[#7D0A0A] font-bold">//</span>
                <span className="text-[#F4F4F4] font-bold">NO RESTOCKS</span>
                <span className="text-[#7D0A0A] font-bold">//</span>
              </div>
            ))}
          </div>
        </div>

        {/* FULL-SCREEN BRUTALIST OVERLAY MENU */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-6 sm:p-12 font-mono text-[#F4F4F4] animate-fade-in overflow-y-auto">
            
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1E1E1E]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black uppercase tracking-tight font-[var(--font-display)]">
                  [KAPDA MAFIA ARCHIVE DIRECTORY]
                </span>
                <span className="text-[10px] font-mono tracking-[0.12em] text-[#7D0A0A] font-bold">
                  PORTAL 2026
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-3 text-[#888888] hover:text-white border border-[#1E1E1E] hover:border-white transition-colors cursor-pointer flex items-center gap-2 text-xs uppercase"
                aria-label="Close menu"
              >
                <span>CLOSE</span>
                <X size={18} />
              </button>
            </div>

            {/* Massive Brutalist Typography Links */}
            <div className="flex-1 flex flex-col justify-center py-10 space-y-4 sm:space-y-6">
              {[
                { name: 'SHOP ALL ARCHIVE', href: '/shop' },
                { name: 'NEW RELEASES', href: '/shop?sort=new' },
                { name: 'TOPWEAR (TEES & SHIRTS)', href: '/shop?category=topwear' },
                { name: 'BOTTOMWEAR (DENIM & CARGOS)', href: '/shop?category=bottomwear' },
                { name: 'WINTERWEAR (500 GSM HOODIES)', href: '/shop?category=winterwear' },
                { name: 'CO-ORD SETS', href: '/shop?category=coord-sets' },
                { name: 'SHOP THE LOOK', href: '/lookbook' },
                { name: 'SHOES MAFIA VAULT', href: '/shoes', accent: '#00695c' },
                { name: 'FLAGSHIP STORE (FARIDABAD)', href: '/store' }
              ].map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline justify-between border-b border-[#1A1A1A] pb-3 hover:border-white transition-colors"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="text-xs font-mono text-[#666666] group-hover:text-white transition-colors">
                      0{idx + 1} //
                    </span>
                    <span 
                      className={`text-3xl sm:text-6xl md:text-7xl font-bold uppercase tracking-[-0.05em] leading-[0.95] font-[var(--font-display)] transition-transform group-hover:translate-x-3 duration-200 ${
                        item.accent ? 'text-[#80cbc4] group-hover:text-[#1a8f7a]' : 'text-[#F4F4F4]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight size={24} className="text-[#666666] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            {/* Bottom Meta & World Switcher in Menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#1E1E1E] text-xs">
              <div className="space-y-1 text-[#888888]">
                <div className="text-[#F4F4F4] font-bold">DIGITAL FLAGSHIP DIRECTORY</div>
                <div>NIT-5 FARIDABAD · 28.3846° N, 77.3086° E</div>
                <div>DELIVERY WORLDWIDE · DISPATCH IN 24H</div>
              </div>

              <div className="flex items-center sm:justify-end gap-3">
                <button
                  onClick={() => { setWorld('clothing'); setMenuOpen(false); }}
                  className={`px-4 py-2 text-xs font-bold uppercase border transition-colors cursor-pointer ${
                    !isShoesWorld ? 'border-white bg-white text-black' : 'border-[#1E1E1E] text-[#888888]'
                  }`}
                >
                  KAPDA MAFIA
                </button>
                <button
                  onClick={() => { setWorld('shoes'); setMenuOpen(false); }}
                  className={`px-4 py-2 text-xs font-bold uppercase border transition-colors cursor-pointer ${
                    isShoesWorld ? 'border-[#00695c] bg-[#00695c] text-white hover:bg-[#1a8f7a]' : 'border-[#1E1E1E] text-[#888888] hover:text-[#1a8f7a]'
                  }`}
                >
                  SHOES MAFIA
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
