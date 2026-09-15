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
          
          {/* LEFT: Minimalist 2-line hamburger icon & clean MENU label */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMenuOpen(true)} 
              className="p-2 text-[#F4F4F4] hover:text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center gap-2 -ml-2 group" 
              aria-label="Open Full-Screen Menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="w-5 h-[2px] bg-[#F4F4F4] group-hover:w-6 transition-all block" />
                <span className="w-3.5 h-[2px] bg-[#F4F4F4] group-hover:w-6 transition-all block" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#888888] group-hover:text-white uppercase hidden sm:inline">
                MENU
              </span>
            </button>
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

        {/* FULL-SCREEN BESPOKE DUAL-STORE HAMBURGER DRAWER */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-10 font-mono text-[#F4F4F4] animate-fade-in overflow-y-auto">
            
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight font-[var(--font-display)] text-white">
                  {isShoesWorld ? '[SHOES MAFIA // FOOTWEAR DIRECTORY]' : '[KAPDA MAFIA // APPAREL DIRECTORY]'}
                </span>
                <span className={`text-[9px] sm:text-[10px] font-mono tracking-widest px-2 py-0.5 rounded font-bold uppercase ${
                  isShoesWorld ? 'bg-[#00695c] text-white' : 'bg-[#7D0A0A] text-white'
                }`}>
                  {isShoesWorld ? 'FOOTWEAR VAULT' : 'APPAREL VAULT'}
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 text-[#888888] hover:text-white border border-white/15 hover:border-white transition-colors cursor-pointer flex items-center gap-2 text-xs uppercase"
                aria-label="Close menu"
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            {/* Store Portal Switcher Tabs inside Menu */}
            <div className="mt-5 grid grid-cols-2 gap-3 p-1 bg-[#121212] border border-white/10">
              <button
                onClick={() => setWorld('clothing')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  !isShoesWorld
                    ? 'bg-white text-black shadow-lg font-black'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <span>KAPDA MAFIA (CLOTHING)</span>
              </button>
              <button
                onClick={() => setWorld('shoes')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isShoesWorld
                    ? 'bg-[#00695c] text-white shadow-lg shadow-[#00695c]/30 font-black'
                    : 'text-[#888888] hover:text-[#00695c]'
                }`}
              >
                <span>SHOES MAFIA (FOOTWEAR)</span>
              </button>
            </div>

            {/* Menu Links Body: Tailored per Store World */}
            <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Category Links (Left 8 Cols) */}
              <div className="lg:col-span-8 space-y-2 sm:space-y-3">
                <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase pb-1 border-b border-white/5">
                  {isShoesWorld ? 'FOOTWEAR CATEGORIES & ARCHIVES' : 'STREETWEAR UNIFORM SILHOUETTES'}
                </div>

                {(isShoesWorld ? [
                  { name: 'ALL SNEAKERS & RUNNERS', href: '/shoes', desc: 'Full vault catalog UK 6 - 10' },
                  { name: 'SPORT RUNNERS', href: '/shoes?cat=sport', desc: 'Breathable fly-knit shock absorption' },
                  { name: 'STREETWEAR SNEAKERS', href: '/shoes?cat=sneaker', desc: 'Chunky soles & court high-tops' },
                  { name: 'FORMAL HIGH-STREET', href: '/shoes?cat=formal', desc: 'Underground dress casual kicks' },
                  { name: 'NEW ARRIVALS 2026', href: '/shoes?sort=new', desc: 'Freshly allocated stock from factory' }
                ] : [
                  { name: 'ALL APPAREL PIECES', href: '/shop', desc: 'Complete menswear uniform drop' },
                  { name: 'OVERSIZED TEES (280 GSM)', href: '/shop?category=tees', desc: 'Heavyweight bio-washed drop-shoulder' },
                  { name: 'FLEECE HOODIES (440 GSM)', href: '/shop?category=hoodies', desc: 'Ultra-dense brushed cotton fleece' },
                  { name: 'TACTICAL CARGOS (380 GSM)', href: '/shop?category=cargos', desc: 'Custom 6-pocket functional hardware' },
                  { name: 'ACID WASH DENIM', href: '/shop?category=denim', desc: 'Subtle hand-scraped raw denim cuts' }
                ]).map((item, idx) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between py-2 sm:py-3 border-b border-white/5 hover:border-white/30 transition-all"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-xs font-mono text-[#555] group-hover:text-white transition-colors">
                        0{idx + 1} //
                      </span>
                      <div>
                        <div className={`text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight font-[var(--font-display)] transition-transform group-hover:translate-x-2 duration-200 ${
                          isShoesWorld ? 'text-[#e0f2f1] group-hover:text-[#80cbc4]' : 'text-[#f5f5f5] group-hover:text-white'
                        }`}>
                          {item.name}
                        </div>
                        <div className="text-[10px] text-[#777] font-mono tracking-wider">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-[#555] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Store Utilities & Customer Support (Right 4 Cols) */}
              <div className="lg:col-span-4 space-y-4 bg-[#111111] p-5 sm:p-6 border border-white/10">
                <div className="text-[10px] font-mono tracking-widest text-[#888888] uppercase pb-2 border-b border-white/10">
                  ESSENTIAL STORE SERVICES
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <Link
                    href="/track-order"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#181818] border border-white/10 hover:border-white text-white transition-colors"
                  >
                    <span>📦 TRACK YOUR ORDER</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/ai-fit"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#181818] border border-white/10 hover:border-white text-white transition-colors"
                  >
                    <span>✨ AI 3D SIZE &amp; DRAPE LAB</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/lookbook"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#181818] border border-white/10 hover:border-white text-white transition-colors"
                  >
                    <span>📸 LOOKBOOK // MOTION ARCHIVE</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/store"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#181818] border border-white/10 hover:border-white text-white transition-colors"
                  >
                    <span>📍 FLAGSHIP STORE (FARIDABAD)</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href="https://wa.me/918375000819?text=Hi%20Kapda%20Mafia,%20I%20have%20an%20order%20inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#0d2818] border border-emerald-500/40 text-emerald-300 hover:bg-[#133822] transition-colors"
                  >
                    <span>💬 WHATSAPP CONCIERGE (24/7)</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

                <div className="pt-3 border-t border-white/10 text-[10px] text-[#777] leading-relaxed">
                  <div>SECURE PAYMENTS: UPI · CARDS · CASH ON DELIVERY</div>
                  <div>DISPATCH IN 24H · 7 DAYS EASY SIZE REPLACEMENT</div>
                </div>
              </div>

            </div>

            {/* Bottom Meta & Contact Info */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#888888]">
              <div>
                FLAGSHIP STORE: GROUND FLOOR, 5G-38, NIT-5 FARIDABAD · PHONE: +91 83750 00819
              </div>
              <div className="flex items-center gap-4">
                <Link href="/privacy" onClick={() => setMenuOpen(false)} className="hover:text-white">
                  PRIVACY POLICY
                </Link>
                <span>·</span>
                <Link href="/terms" onClick={() => setMenuOpen(false)} className="hover:text-white">
                  TERMS OF SERVICE
                </Link>
                <span>·</span>
                <span className="text-white font-bold">KAPDA MAFIA © 2026</span>
              </div>
            </div>

          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
