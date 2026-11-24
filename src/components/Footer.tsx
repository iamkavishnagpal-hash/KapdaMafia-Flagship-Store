'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1E1E1E] text-[#C8C3B8] pt-14 pb-12 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
        {/* Brand Information (2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-3.5 pr-0 lg:pr-8">
          <Link href="/" className="inline-block">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F4F4F4] uppercase font-[var(--font-headline)]">
              KAPDA MAFIA
            </span>
            <span className="block text-xs tracking-[0.06em] text-[#888888] mt-0.5">
              Streetwear flagship and studio · NIT-5
            </span>
          </Link>

          <p className="text-sm text-[#C8C3B8] leading-relaxed max-w-sm">
            Heavyweight menswear and casual streetwear engineered for intentional fit and daily
            durability. Designed and fulfilled from Faridabad.
          </p>

          <div className="text-sm text-[#C8C3B8] font-medium pt-1">
            Flagship Store: NIT-5, Faridabad, Haryana · Tel: 083750 00819
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#222222] bg-[#111111] hover:border-white hover:text-white text-xs text-[#C8C3B8] transition-colors min-h-[44px]"
            >
              <span>Instagram: @kapdamafia.store</span>
            </a>
          </div>
        </div>

        {/* Collection Links */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F4] font-mono">
            Collections
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/shop?category=tees" className="hover:text-white transition-colors py-2 inline-block min-h-11">
                Heavyweight Tees
              </Link>
            </li>
            <li>
              <Link href="/shop?category=hoodies" className="hover:text-white transition-colors py-1 inline-block">
                Loopback Hoodies
              </Link>
            </li>
            <li>
              <Link href="/shop?category=cargos" className="hover:text-white transition-colors py-1 inline-block">
                Tactical Cargos
              </Link>
            </li>
            <li>
              <Link href="/shop?category=denim" className="hover:text-white transition-colors py-1 inline-block">
                Rigid Denim
              </Link>
            </li>
            <li>
              <Link href="/shoes" className="hover:text-[#00695c] transition-colors py-1 inline-block font-semibold">
                Shoes Mafia Portal →
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F4] font-mono">
            Customer Care
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/track-order" className="hover:text-white transition-colors py-2 inline-block min-h-11">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors py-1 inline-block">
                Returns &amp; Exchanges
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-white transition-colors py-1 inline-block">
                Visit Flagship Store
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors py-1 inline-block">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors py-1 inline-block">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F4] font-mono">
            Drop Notifications
          </h3>
          <p className="text-sm text-[#C8C3B8] leading-relaxed">
            Subscribe for notification emails when small-batch runs are released.
          </p>

          {newsletterSubmitted ? (
            <div className="bg-[#111111] border border-[#222222] p-3 text-xs text-[#F4F4F4]">
              Thank you. You have been added to our release notification list.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#111111] border border-[#222222] text-[#F4F4F4] placeholder-[#666666] text-xs px-3.5 py-3 rounded-none focus:outline-none focus:border-white min-h-[44px]"
                aria-label="Email address for drop updates"
              />
              <button
                type="submit"
                className="w-full h-11 bg-white hover:bg-[#E8E6E0] text-black text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer min-h-[44px]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-12 pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
        <div>© {new Date().getFullYear()} KAPDA MAFIA. All rights reserved. Flagship NIT-5 Faridabad.</div>
        
        {/* Genrage-Style Payment Badges */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-[#888888]">
          <span className="bg-[#111111] border border-[#222222] px-2 py-0.5 rounded text-white font-bold">UPI / GPAY</span>
          <span className="bg-[#111111] border border-[#222222] px-2 py-0.5 rounded text-white font-bold">CARDS</span>
          <span className="bg-[#111111] border border-[#222222] px-2 py-0.5 rounded text-emerald-400 font-bold">CASH ON DELIVERY</span>
          <span className="bg-[#111111] border border-[#222222] px-2 py-0.5 rounded text-[#A09D94]">100% SECURE SSL</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-[#888888] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#888888] transition-colors">Terms</Link>
          <Link href="/returns" className="hover:text-[#888888] transition-colors">Shipping & Returns</Link>
        </div>
      </div>
    </footer>
  );
}
