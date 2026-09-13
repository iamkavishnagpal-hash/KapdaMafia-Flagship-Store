'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#181818] text-[#B8B4AA] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Manifesto */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-black tracking-[0.35em] text-[#F3F0E8]">KAPDA MAFIA</span>
            <span className="block text-[10px] tracking-[0.4em] uppercase text-[#8C8C86] font-mono mt-1">CULTURE & UNIFORM</span>
          </Link>
          <p className="text-xs text-[#8C8C86] leading-relaxed max-w-sm">
            Not another clothing store. A digital fashion world engineered for Gen-Z rebels, architects of culture, and individuals who refuse to blend in.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#8F1118] font-semibold tracking-wider">
            FLAGSHIP RETENTION • PAN-INDIA EXPRESS SHIPPING
          </div>
        </div>

        {/* Shop Category Navigation */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F3F0E8]">SHOP UNIFORM</h4>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link href="/shop?category=tees" className="hover:text-[#F3F0E8] transition-colors">400 GSM TEES</Link></li>
            <li><Link href="/shop?category=hoodies" className="hover:text-[#F3F0E8] transition-colors">HEAVYWEIGHT HOODIES</Link></li>
            <li><Link href="/shop?category=cargos" className="hover:text-[#F3F0E8] transition-colors">TACTICAL CARGOS</Link></li>
            <li><Link href="/shop?category=denim" className="hover:text-[#F3F0E8] transition-colors">DESTROYED DENIM</Link></li>
            <li><Link href="/shop?category=sneakers" className="hover:text-[#F3F0E8] transition-colors">CHUNKY SNEAKERS</Link></li>
          </ul>
        </div>

        {/* Client Care & Tracking */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F3F0E8]">CLIENT CARE</h4>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link href="/track-order" className="hover:text-[#F3F0E8] transition-colors">TRACK YOUR ORDER</Link></li>
            <li><Link href="/store" className="hover:text-[#F3F0E8] transition-colors">VISIT STORE</Link></li>
            <li><Link href="/ai-fit" className="hover:text-[#F3F0E8] transition-colors">AI FIT STUDIO</Link></li>
            <li><span className="text-[#8C8C86]">EASY 7-DAY RETURNS & EXCHANGES</span></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F3F0E8]">ENTER THE MAFIA</h4>
          <p className="text-xs text-[#8C8C86]">Get secret drop invites, early access links, and member discounts before public launch.</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="w-full bg-[#111111] border border-[#222222] text-[#F3F0E8] placeholder-[#8C8C86] text-xs font-mono px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
            />
            <button 
              type="submit" 
              className="w-full bg-[#181818] border border-[#222222] text-[#F3F0E8] hover:bg-[#8F1118] hover:border-[#8F1118] text-xs font-mono font-bold tracking-widest uppercase py-2.5 rounded-sm transition-colors"
            >
              JOIN SECRET LIST →
            </button>
          </form>
        </div>

      </div>

      {/* Footer Copyright & Legal */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8C8C86]">
        <div>© 2026 KAPDA MAFIA INDIA. ALL RIGHTS RESERVED.</div>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
          <span>MYBILLBOOK INTEGRATED</span>
        </div>
      </div>
    </footer>
  );
}
