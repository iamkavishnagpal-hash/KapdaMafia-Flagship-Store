'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#090909]/92 backdrop-blur-md">
        <div className="flex h-7 items-center justify-center border-b border-white/10 px-3 text-center text-[8px] tracking-[0.24em] text-[#C8C3B8] uppercase font-mono">PREPAID ORDERS SHIP FREE ABOVE ₹1,999 · DROP 09 / AFTER DARK</div>
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-5">
            <button onClick={() => setMenuOpen((value) => !value)} className="-ml-2 p-2 text-[#C8C3B8] lg:hidden" aria-label="Toggle navigation">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
            <nav className="hidden items-center gap-7 text-[10px] tracking-[0.18em] text-[#C8C3B8] uppercase font-mono lg:flex">
              <Link href="/shop" className="transition-colors hover:text-[#EEEAE1]">NEW DROP</Link>
              <Link href="/shop" className="flex items-center gap-1 transition-colors hover:text-[#EEEAE1]">SHOP <ChevronDown size={12} /></Link>
              <Link href="/shop?category=tees" className="transition-colors hover:text-[#EEEAE1]">COLLECTIONS</Link>
              <Link href="/lookbook" className="transition-colors hover:text-[#EEEAE1]">LOOKBOOK</Link>
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center lg:static lg:translate-x-0">
            <span className="block text-[17px] font-black tracking-[0.28em] text-[#EEEAE1] sm:text-[20px]">KAPDA MAFIA</span>
            <span className="block text-[8px] tracking-[0.34em] text-[#77746E] uppercase font-mono">CULTURE / UNIFORM</span>
          </Link>

          <div className="flex items-center gap-1 text-[#C8C3B8] sm:gap-2">
            <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 p-2 transition-colors hover:text-[#EEEAE1]" aria-label="Open search"><Search size={17} /><span className="hidden text-[10px] tracking-wider xl:inline">SEARCH</span></button>
            <Link href="/wishlist" className="relative hidden p-2 transition-colors hover:text-[#EEEAE1] sm:block" aria-label="Wishlist"><Heart size={17} /><span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/15 bg-[#171717] text-[8px] text-[#EEEAE1]">2</span></Link>
            <Link href="/account" className="hidden p-2 transition-colors hover:text-[#EEEAE1] lg:block" aria-label="Account"><User size={17} /></Link>
            <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 rounded-sm border border-white/15 p-2 transition-colors hover:border-[#EEEAE1] sm:px-3 sm:py-2" aria-label="Open shopping bag"><ShoppingBag size={16} /><span className="hidden text-[10px] font-bold tracking-wider sm:inline">BAG (1)</span></button>
          </div>
        </div>
        {menuOpen && <div className="space-y-4 border-t border-white/10 bg-[#0D0C0B] px-6 py-6 text-[11px] tracking-[0.16em] text-[#C8C3B8] uppercase font-mono lg:hidden"><Link onClick={() => setMenuOpen(false)} href="/shop" className="block text-[#EEEAE1]">ALL UNIFORMS</Link><Link onClick={() => setMenuOpen(false)} href="/shop?category=tees" className="block">TEES</Link><Link onClick={() => setMenuOpen(false)} href="/shop?category=hoodies" className="block">HOODIES</Link><Link onClick={() => setMenuOpen(false)} href="/shop?category=cargos" className="block">CARGOS</Link><Link onClick={() => setMenuOpen(false)} href="/ai-fit" className="block text-[#EEEAE1]">FIT STUDIO BETA</Link><Link onClick={() => setMenuOpen(false)} href="/track-order" className="block">TRACK ORDER</Link></div>}
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
