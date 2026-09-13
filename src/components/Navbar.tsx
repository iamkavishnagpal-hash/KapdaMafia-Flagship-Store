'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, Shirt, Footprints, Layers, Phone } from 'lucide-react';
import SearchModal from './SearchModal';
import { useWorld } from '@/context/WorldContext';
import { useCart } from '@/context/CartContext';
import { InstagramIcon } from './InstagramIcon';

export default function Navbar() {
  const { openCart, activeCount, clothingCount, shoeCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { world, setWorld, toggleWorld, isAuthenticated, userPhone, setShowWorldSelector } = useWorld();

  const isShoesWorld = world === 'shoes';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isShoesWorld
          ? 'border-[#009688]/30 bg-[#0c141a]/95'
          : 'border-white/10 bg-[#090909]/92'
      }`}>
        {/* Top Announcement Bar with Live World Switcher */}
        <div className={`flex h-8 items-center justify-between border-b px-4 text-center text-[9px] tracking-[0.2em] uppercase font-mono sm:px-8 ${
          isShoesWorld
            ? 'border-[#009688]/20 bg-[#070d12] text-[#80cbc4]'
            : 'border-white/10 bg-[#050505] text-[#C8C3B8]'
        }`}>
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>{isShoesWorld ? 'SHOES MAFIA · OFFICIAL FOOTWEAR VAULT' : 'KAPDA MAFIA · DROP 09 / AFTER DARK'}</span>
          </div>

          {/* Swiggy / Instamart style Dual-World Pill Toggle */}
          <div className="mx-auto sm:mx-0 flex items-center bg-black/60 p-0.5 rounded-full border border-white/15">
            <button
              onClick={() => setWorld('clothing')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                !isShoesWorld
                  ? 'bg-[#8F1118] text-white shadow-md shadow-[#8F1118]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shirt size={10} />
              <span>KAPDA {clothingCount > 0 ? `(${clothingCount})` : ''}</span>
            </button>
            <button
              onClick={() => setWorld('shoes')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isShoesWorld
                  ? 'bg-[#009688] text-white shadow-md shadow-[#009688]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Footprints size={10} />
              <span>SHOES {shoeCount > 0 ? `(${shoeCount})` : ''}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <span className="text-[9px] text-[#A0AEC0] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                VERIFIED: +91 {userPhone.slice(-4)}
              </span>
            ) : (
              <span>PREPAID ORDERS SHIP FREE ABOVE {isShoesWorld ? '₹999' : '₹1,999'}</span>
            )}
            <button
              onClick={() => setShowWorldSelector(true)}
              className="text-[8px] text-gray-400 hover:text-white underline cursor-pointer"
            >
              Switch Portal
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto flex h-[62px] sm:h-[68px] max-w-[1440px] items-center justify-between px-3 sm:px-8 lg:px-16">
          <div className="flex items-center gap-2 sm:gap-5">
            <button 
              onClick={() => setMenuOpen((value) => !value)} 
              className="-ml-1 p-2 text-[#C8C3B8] lg:hidden cursor-pointer" 
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className="hidden items-center gap-7 text-[10px] tracking-[0.18em] uppercase font-mono lg:flex">
              {isShoesWorld ? (
                <>
                  <Link href="/shoes" className="text-white font-bold transition-colors hover:text-[#80cbc4]">ALL SHOES</Link>
                  <Link href="/shoes?category=SPORT+SHOES" className="text-gray-300 transition-colors hover:text-white">SPORT SHOES</Link>
                  <Link href="/shoes?category=Sneaker+Shoes" className="text-gray-300 transition-colors hover:text-white">SNEAKER SHOES</Link>
                  <Link href="/shoes?category=FORMAL+SHOES" className="text-gray-300 transition-colors hover:text-white">FORMAL</Link>
                </>
              ) : (
                <>
                  <Link href="/shop" className="transition-colors hover:text-[#EEEAE1]">NEW DROP</Link>
                  <Link href="/shop" className="flex items-center gap-1 transition-colors hover:text-[#EEEAE1]">SHOP <ChevronDown size={12} /></Link>
                  <Link href="/shop?category=tees" className="transition-colors hover:text-[#EEEAE1]">COLLECTIONS</Link>
                  <Link href="/lookbook" className="transition-colors hover:text-[#EEEAE1]">LOOKBOOK</Link>
                </>
              )}
            </nav>
          </div>

          {/* Logo Center */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              {isShoesWorld ? (
                <>
                  <span className="block text-[15px] sm:text-[20px] font-black tracking-[0.24em] text-[#80cbc4]">SHOES MAFIA</span>
                  <span className="block text-[7px] sm:text-[8px] tracking-[0.34em] text-gray-400 uppercase font-mono">FOOTWEAR VAULT</span>
                </>
              ) : (
                <>
                  <span className="block text-[15px] sm:text-[20px] font-black tracking-[0.24em] text-[#EEEAE1]">KAPDA MAFIA</span>
                  <span className="block text-[7px] sm:text-[8px] tracking-[0.34em] text-[#77746E] uppercase font-mono">CULTURE / UNIFORM</span>
                </>
              )}
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 text-[#C8C3B8] sm:gap-2">
            {/* Direct Instagram Profile CTA Button */}
            <a
              href={isShoesWorld ? 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA==' : 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-2 py-1 text-[8px] sm:text-[9px] font-bold tracking-wider text-white uppercase shadow-md shadow-rose-950/40 hover:opacity-90 hover:scale-105 transition-all cursor-pointer"
              title="Open Official Instagram Handle"
            >
              <InstagramIcon size={11} />
              <span className="hidden md:inline">{isShoesWorld ? '@shoesmafia' : '@kapdamafia'}</span>
            </a>

            {/* Direct Call hotline */}
            <a
              href="tel:08375000819"
              className="hidden xl:flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[9px] font-bold text-gray-300 hover:text-white transition-colors"
              title="Call Store Concierge"
            >
              <Phone size={11} className={isShoesWorld ? 'text-[#009688]' : 'text-[#8F1118]'} />
              <span>083750 00819</span>
            </a>

            <button onClick={() => setSearchOpen(true)} className="p-1.5 sm:p-2 transition-colors hover:text-[#EEEAE1] cursor-pointer" aria-label="Open search">
              <Search size={16} />
            </button>
            <Link href="/wishlist" className="relative hidden p-2 transition-colors hover:text-[#EEEAE1] sm:block" aria-label="Wishlist">
              <Heart size={16} />
              <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/15 bg-[#171717] text-[8px] text-[#EEEAE1]">2</span>
            </Link>
            <button
              onClick={() => setShowWorldSelector(true)}
              className="p-1.5 sm:p-2 transition-colors hover:text-white cursor-pointer"
              title="Switch World Portal"
            >
              <Layers size={16} className={isShoesWorld ? 'text-[#80cbc4]' : 'text-[#8F1118]'} />
            </button>
            <button 
              onClick={openCart} 
              className={`flex items-center gap-1 sm:gap-2 rounded-sm border px-2 py-1.5 transition-colors sm:px-3 sm:py-2 cursor-pointer ${
                isShoesWorld
                  ? 'border-[#009688]/40 hover:border-[#80cbc4] text-[#80cbc4]'
                  : 'border-white/15 hover:border-[#EEEAE1] text-[#EEEAE1]'
              }`} 
              aria-label="Open shopping bag"
            >
              <ShoppingBag size={15} />
              <span className="hidden text-[10px] font-bold tracking-wider sm:inline">
                BAG ({activeCount})
              </span>
              <span className="sm:hidden text-[9px] font-bold">
                ({activeCount})
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="space-y-4 border-t border-white/10 bg-[#0D0C0B] px-6 py-6 text-[11px] tracking-[0.16em] text-[#C8C3B8] uppercase font-mono lg:hidden">
            {/* World quick switcher for mobile */}
            <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between mb-4">
              <span className="text-[9px] text-gray-400">ACTIVE WORLD:</span>
              <button
                onClick={() => {
                  toggleWorld();
                  setMenuOpen(false);
                }}
                className="text-[10px] font-bold text-white uppercase underline"
              >
                SWITCH TO {isShoesWorld ? 'KAPDA MAFIA' : 'SHOES MAFIA'} →
              </button>
            </div>

            {isShoesWorld ? (
              <>
                <Link onClick={() => setMenuOpen(false)} href="/shoes" className="block text-white font-bold">ALL SNEAKERS & SHOES</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shoes?category=SPORT+SHOES" className="block">SPORT RUNNERS</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shoes?category=Sneaker+Shoes" className="block">SNEAKER SHOES</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shoes?category=FORMAL+SHOES" className="block">FORMAL SHOES</Link>
              </>
            ) : (
              <>
                <Link onClick={() => setMenuOpen(false)} href="/shop" className="block text-[#EEEAE1]">ALL UNIFORMS</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shop?category=tees" className="block">TEES</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shop?category=hoodies" className="block">HOODIES</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shop?category=cargos" className="block">CARGOS</Link>
                <Link onClick={() => setMenuOpen(false)} href="/ai-fit" className="block text-[#EEEAE1]">FIT STUDIO BETA</Link>
              </>
            )}
            <Link onClick={() => setMenuOpen(false)} href="/track-order" className="block">TRACK ORDER</Link>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

