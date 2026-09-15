'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X, Shirt, Footprints } from 'lucide-react';
import SearchModal from './SearchModal';
import { useWorld } from '@/context/WorldContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { openCart, activeCount, clothingCount, shoeCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { world, setWorld } = useWorld();

  const isShoesWorld = world === 'shoes';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isShoesWorld
          ? 'border-[#009688]/30 bg-[#0c141a]/95'
          : 'border-white/10 bg-[#090909]/95'
      }`}>
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12 font-mono">
          
          {/* LEFT: KAPDA MAFIA (Logo) + Integrated Switcher (Issues 13, 21, 22) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setMenuOpen((value) => !value)} 
              className="p-2 text-[#C8C3B8] lg:hidden cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center" 
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <span className={`text-lg sm:text-xl font-black tracking-[-0.03em] font-[var(--font-display)] uppercase transition-colors ${
                isShoesWorld ? 'text-[#80cbc4]' : 'text-[#F3F0E8]'
              }`}>
                {isShoesWorld ? 'SHOES MAFIA' : 'KAPDA MAFIA'}
              </span>
            </Link>

            {/* Accessible Portal Switcher with clear visual separation */}
            <span className="hidden sm:inline-block h-4 w-px bg-white/20" aria-hidden="true" />

            <nav aria-label="Store selection" className="flex items-center border border-white/15 bg-black/60 text-xs font-mono">
              <button
                onClick={() => setWorld('clothing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-bold uppercase transition-colors cursor-pointer min-h-[36px] ${
                  !isShoesWorld
                    ? 'bg-[#8F1118] text-white'
                    : 'text-[#8C8C86] hover:text-[#F3F0E8]'
                }`}
                aria-pressed={!isShoesWorld}
              >
                <Shirt size={12} />
                <span>KAPDA</span>
                {clothingCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded bg-black/40 text-[10px]" aria-label={`${clothingCount} items in Kapda bag`}>
                    {clothingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setWorld('shoes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-bold uppercase transition-colors cursor-pointer min-h-[36px] ${
                  isShoesWorld
                    ? 'bg-[#009688] text-white'
                    : 'text-[#8C8C86] hover:text-[#F3F0E8]'
                }`}
                aria-pressed={isShoesWorld}
              >
                <Footprints size={12} />
                <span>SHOES</span>
                {shoeCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded bg-black/40 text-[10px]" aria-label={`${shoeCount} items in Shoes bag`}>
                    {shoeCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* CENTER: Clean editorial links (Issues 6, 17) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 text-xs tracking-wider uppercase text-[#C8C3B8]">
            {isShoesWorld ? (
              <>
                <Link href="/shoes" className="transition-colors hover:text-white font-bold">Vault Drops</Link>
                <Link href="/shoes?category=SPORT+SHOES" className="transition-colors hover:text-white">Runners</Link>
                <Link href="/shoes?category=Sneaker+Shoes" className="transition-colors hover:text-white">Sneakers</Link>
                <Link href="/shoes?category=FORMAL+SHOES" className="transition-colors hover:text-white">Formal</Link>
              </>
            ) : (
              <>
                <Link href="/shop" className="transition-colors hover:text-[#F3F0E8] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#8F1118]" />
                  <span>Current Drop</span>
                </Link>
                <Link href="/lookbook" className="transition-colors hover:text-[#F3F0E8]">
                  Lookbook
                </Link>
                <Link href="/ai-fit" className="transition-colors hover:text-[#F3F0E8] flex items-center gap-1.5">
                  <span className="text-[#8F1118]">✦</span>
                  <span>Virtual Mirror</span>
                </Link>
              </>
            )}
          </nav>

          {/* RIGHT: Search, Wishlist, Bag */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#C8C3B8]">
            <button 
              onClick={() => setSearchOpen(true)} 
              className="p-2 transition-colors hover:text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center" 
              aria-label="Search catalog"
            >
              <Search size={18} />
            </button>

            <Link 
              href="/wishlist" 
              className="p-2 transition-colors hover:text-white cursor-pointer relative min-h-[44px] min-w-[44px] flex items-center justify-center" 
              aria-label="Wishlist (Saved items)"
            >
              <Heart size={18} />
            </Link>

            <button 
              onClick={openCart} 
              className="flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer min-h-[40px] text-[#F3F0E8]" 
              aria-label={`Open shopping bag with ${activeCount} items`}
            >
              <ShoppingBag size={15} />
              <span>Bag [{activeCount}]</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="space-y-4 border-t border-white/10 bg-[#090909] px-6 py-6 text-xs tracking-wider text-[#C8C3B8] font-mono lg:hidden">
            {isShoesWorld ? (
              <>
                <Link onClick={() => setMenuOpen(false)} href="/shoes" className="block text-white font-bold py-1">ALL SNEAKERS</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shoes?category=SPORT+SHOES" className="block py-1">SPORT RUNNERS</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shoes?category=Sneaker+Shoes" className="block py-1">SNEAKER SHOES</Link>
                <Link onClick={() => setMenuOpen(false)} href="/shoes?category=FORMAL+SHOES" className="block py-1">FORMAL SHOES</Link>
              </>
            ) : (
              <>
                <Link onClick={() => setMenuOpen(false)} href="/shop" className="block text-[#EEEAE1] font-bold py-1">CURRENT ARCHIVE</Link>
                <Link onClick={() => setMenuOpen(false)} href="/lookbook" className="block py-1">EDITORIAL LOOKBOOK</Link>
                <Link onClick={() => setMenuOpen(false)} href="/ai-fit" className="block text-[#8F1118] font-bold py-1">✦ VIRTUAL MIRROR STUDIO</Link>
              </>
            )}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#8C8C86]">
              <span>ACTIVE WORLD: {isShoesWorld ? 'SHOES MAFIA' : 'KAPDA MAFIA'}</span>
              <button
                onClick={() => {
                  setWorld(isShoesWorld ? 'clothing' : 'shoes');
                  setMenuOpen(false);
                }}
                className="text-white underline font-bold"
              >
                SWITCH
              </button>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
