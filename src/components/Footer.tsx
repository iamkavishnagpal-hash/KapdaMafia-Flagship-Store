'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  return (
    <footer className="bg-[#080808] border-t border-[#181818] text-[#B8B4AA] pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Manifesto: Issue 14 Fix (Standardized vertical rhythm) */}
        <div className="lg:col-span-2 space-y-3">
          <Link href="/" className="inline-block">
            <span className="text-xl sm:text-2xl font-black tracking-widest text-[#F3F0E8]">KAPDA MAFIA</span>
            <span className="block text-xs tracking-wider uppercase text-[#8C8C86] font-mono mt-1">CULTURE & UNIFORM</span>
          </Link>
          <p className="text-xs text-[#8C8C86] leading-relaxed max-w-sm">
            A digital fashion world engineered for Gen-Z rebels, architects of culture, and individuals who refuse to blend in.
          </p>
          <div className="text-xs font-mono text-[#8F1118] font-semibold tracking-wide pt-1">
            FLAGSHIP STORE: NIT-5, FARIDABAD · TEL: 083750 00819
          </div>
          
          {/* Issue 31 Fix: Subtle monochrome social pills that do not distract from newsletter CTA */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-[#C8C3B8] hover:text-white transition-colors"
            >
              <span>@kapdamafia.store</span>
            </a>
            <a
              href="https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#00695c]/30 bg-[#00695c]/10 hover:bg-[#00695c]/20 text-xs font-mono font-medium text-[#80cbc4] hover:text-white transition-colors"
            >
              <span>@shoesmafia.store</span>
            </a>
          </div>
        </div>

        {/* Shop Category Navigation: Issue 12 Fix (Semantic h3 instead of skipped h4) */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#F3F0E8] font-bold">SHOP UNIFORM</h3>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link href="/shop?category=tees" className="hover:text-[#F3F0E8] transition-colors">400 GSM TEES</Link></li>
            <li><Link href="/shop?category=hoodies" className="hover:text-[#F3F0E8] transition-colors">HEAVYWEIGHT HOODIES</Link></li>
            <li><Link href="/shop?category=cargos" className="hover:text-[#F3F0E8] transition-colors">TACTICAL CARGOS</Link></li>
            <li><Link href="/shop?category=denim" className="hover:text-[#F3F0E8] transition-colors">DESTROYED DENIM</Link></li>
            <li><Link href="/shoes" className="hover:text-[#80cbc4] text-[#80cbc4] transition-colors">SHOES MAFIA VAULT →</Link></li>
          </ul>
        </div>

        {/* Client Care & Tracking: Issue 12 Fix */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#F3F0E8] font-bold">CLIENT CARE</h3>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link href="/track-order" className="hover:text-[#F3F0E8] transition-colors">TRACK YOUR ORDER</Link></li>
            <li><Link href="/store" className="hover:text-[#F3F0E8] transition-colors">VISIT FLAGSHIP STORE</Link></li>
            <li><Link href="/ai-fit" className="hover:text-[#F3F0E8] transition-colors">VIRTUAL MIRROR STUDIO</Link></li>
            <li><Link href="/track-order" className="hover:text-[#F3F0E8] text-[#8C8C86] transition-colors">EASY 7-DAY RETURNS & EXCHANGES</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription: Issue 30 Fix (Consistent vertical gap) */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#F3F0E8] font-bold">ENTER THE MAFIA</h3>
          <p className="text-xs text-[#8C8C86] leading-relaxed">
            Get secret drop invites, early access links, and member discounts before public launch.
          </p>
          {newsletterSubmitted ? (
            <div className="bg-[#111111] border border-[#7D0A0A]/40 px-3.5 py-4 text-center space-y-1.5">
              <div className="text-[#7D0A0A] font-bold text-xs tracking-widest uppercase">✓ YOU'RE IN THE VAULT</div>
              <div className="text-[10px] text-[#8C8C86]">Secret drop access activated. Check your inbox.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true); }} className="space-y-2 pt-1">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                required
                className="w-full bg-[#111111] border border-[#222222] text-[#F3F0E8] placeholder-[#8C8C86] text-xs font-mono px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                aria-label="Email address for secret list"
              />
              <button 
                type="submit" 
                className="w-full h-10 bg-[#F3F0E8] hover:bg-white text-black text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
              >
                JOIN SECRET LIST →
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Payment Grid: Minimal monochrome text tags */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#1E1E1E] flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-[0.12em] text-[#888888]">
        <div className="flex items-center gap-2">
          <span>ACCEPTED VAULT TENDERS:</span>
          <div className="flex flex-wrap gap-1.5 text-[#F4F4F4]">
            <span className="px-2 py-0.5 bg-[#111111] border border-[#1E1E1E]">[UPI]</span>
            <span className="px-2 py-0.5 bg-[#111111] border border-[#1E1E1E]">[APPLE PAY]</span>
            <span className="px-2 py-0.5 bg-[#111111] border border-[#1E1E1E]">[VISA]</span>
            <span className="px-2 py-0.5 bg-[#111111] border border-[#1E1E1E]">[MASTERCARD]</span>
            <span className="px-2 py-0.5 bg-[#111111] border border-[#1E1E1E]">[AMEX]</span>
          </div>
        </div>
        <div className="text-[#888888]">
          256-BIT ENCRYPTED CHECKOUT
        </div>
      </div>

      {/* Footer Copyright & Legal */}
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] font-mono">
        <div>ENGINEERED IN FARIDABAD. ALL RIGHTS RESERVED.</div>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
          <Link href="/terms" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          <span className="text-[#888888]">Flagship Store · Faridabad</span>
        </div>
      </div>
    </footer>
  );
}
