'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, X } from 'lucide-react';
import SearchModal from './SearchModal';
import { useWorld } from '@/context/WorldContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { openCart, activeCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { world, setWorld, openShowroom } = useWorld();

  const isShoesWorld = world === 'shoes';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#1E1E1E] bg-[#080808]/95 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-[58px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12 font-sans">
          
          {/* LEFT: Menu Toggle & Brand Wordmark */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-[#C8C3B8] hover:text-[#F4F4F4] cursor-pointer min-h-[44px] min-w-[44px] flex items-center gap-2 -ml-2"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="w-5 h-[1.5px] bg-[#F4F4F4] block" />
                <span className="w-3.5 h-[1.5px] bg-[#F4F4F4] block" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-[#888888] hidden sm:inline">
                Menu
              </span>
            </button>

            <Link href="/" className="text-base sm:text-lg font-bold tracking-tight text-[#F4F4F4]">
              KAPDA MAFIA
            </Link>
          </div>

          {/* CENTER: Dual Store Portal Switcher */}
          <nav
            aria-label="Store World Selector"
            className="flex items-center border border-[#1E1E1E] bg-[#111111] p-0.5 text-xs font-medium"
          >
            <button
              onClick={() => setWorld('clothing')}
              className={`px-3 sm:px-4 py-1.5 transition-colors cursor-pointer ${
                !isShoesWorld
                  ? 'bg-[#F4F4F4] text-[#080808] font-semibold'
                  : 'text-[#888888] hover:text-[#F4F4F4]'
              }`}
              aria-pressed={!isShoesWorld}
            >
              Kapda Mafia
            </button>
            <button
              onClick={() => setWorld('shoes')}
              className={`px-3 sm:px-4 py-1.5 transition-colors cursor-pointer ${
                isShoesWorld
                  ? 'bg-[#1a8f7a] text-white font-semibold'
                  : 'text-[#888888] hover:text-[#1a8f7a]'
              }`}
              aria-pressed={isShoesWorld}
            >
              Shoes Mafia
            </button>
          </nav>

          {/* RIGHT: Search & Bag */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-sans text-[#F4F4F4]">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#888888] hover:text-[#F4F4F4] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Search Catalog"
            >
              <Search size={18} />
            </button>

            <button
              onClick={openCart}
              className="px-3 py-1.5 border border-[#1E1E1E] bg-[#111111] hover:border-[#333333] hover:text-white transition-colors cursor-pointer flex items-center gap-2 min-h-[44px]"
              aria-label={`Shopping bag containing ${activeCount} items`}
            >
              <ShoppingBag size={15} />
              <span className="font-semibold text-xs">{activeCount}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Clean Full-Screen Slide Navigation Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          <div className="fixed inset-y-0 left-0 w-full max-w-md bg-[#0D0D0D] border-r border-[#1E1E1E] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E]">
                <span className="text-sm font-bold tracking-tight text-[#F4F4F4]">NAVIGATION</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-[#888888] hover:text-[#F4F4F4] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                  aria-label="Close Navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-4 font-sans">
                <Link
                  href="/shop"
                  onClick={() => setMenuOpen(false)}
                  className="block text-2xl font-bold text-[#F4F4F4] hover:text-white transition-colors"
                >
                  Shop All Collections
                </Link>
                <Link
                  href="/shop?category=tees"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#C8C3B8] hover:text-white transition-colors"
                >
                  Heavyweight Tees
                </Link>
                <Link
                  href="/shop?category=hoodies"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#C8C3B8] hover:text-white transition-colors"
                >
                  Hoodies & Fleece
                </Link>
                <Link
                  href="/shop?category=cargos"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#C8C3B8] hover:text-white transition-colors"
                >
                  Tactical Cargos
                </Link>
                <Link
                  href="/shop?category=denim"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#C8C3B8] hover:text-white transition-colors"
                >
                  Denim Architecture
                </Link>
                <Link
                  href="/lookbook"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#C8C3B8] hover:text-white transition-colors"
                >
                  Lookbook Editorial
                </Link>
                <Link
                  href="/store"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-[#C8C3B8] hover:text-white transition-colors"
                >
                  Flagship Store (Faridabad)
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openShowroom();
                  }}
                  className="w-full text-left text-base text-[#F4F4F4] hover:text-white flex items-center justify-between py-2 border-t border-[#1E1E1E] mt-2 cursor-pointer font-medium"
                >
                  <span>Experience Flagship Walk-In</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#7D0A0A] text-white">Cinematic</span>
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#1E1E1E] text-xs text-[#888888] space-y-1">
              <div>KAPDA MAFIA · NIT-5 FARIDABAD</div>
              <div>Worldwide shipping · 7-day exchanges</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
