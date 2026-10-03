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
    <footer className="bg-[#080808] border-t border-[#1E1E1E] text-[#888888] pt-16 pb-12 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Brand Information (2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F4F4]">
              KAPDA MAFIA
            </span>
            <span className="block text-xs uppercase tracking-wider text-[#888888] mt-0.5">
              Streetwear Flagship & Studio
            </span>
          </Link>

          <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-sm">
            Heavyweight menswear and casual streetwear engineered for intentional fit and daily
            durability. Designed and fulfilled from Faridabad.
          </p>

          <div className="text-xs text-[#C8C3B8] font-medium pt-1">
            Flagship Store: NIT-5, Faridabad, Haryana · Tel: 083750 00819
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1E1E1E] bg-[#111111] hover:border-[#333333] hover:text-[#F4F4F4] text-xs text-[#C8C3B8] transition-colors"
            >
              <span>Instagram: @kapdamafia.store</span>
            </a>
          </div>
        </div>

        {/* Collection Links */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F4]">
            Collections
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/shop?category=tees" className="hover:text-[#F4F4F4] transition-colors">
                Heavyweight Tees
              </Link>
            </li>
            <li>
              <Link href="/shop?category=hoodies" className="hover:text-[#F4F4F4] transition-colors">
                Loopback Hoodies
              </Link>
            </li>
            <li>
              <Link href="/shop?category=cargos" className="hover:text-[#F4F4F4] transition-colors">
                Tactical Cargos
              </Link>
            </li>
            <li>
              <Link href="/shop?category=denim" className="hover:text-[#F4F4F4] transition-colors">
                Rigid Denim
              </Link>
            </li>
            <li>
              <Link href="/shoes" className="hover:text-[#F4F4F4] transition-colors">
                Shoes Mafia Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F4]">
            Customer Care
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/track-order" className="hover:text-[#F4F4F4] transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[#F4F4F4] transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-[#F4F4F4] transition-colors">
                Visit Flagship Store
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#F4F4F4] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#F4F4F4] transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F4]">
            Drop Notifications
          </h3>
          <p className="text-xs text-[#888888] leading-relaxed">
            Subscribe for notification emails when small-batch runs are released.
          </p>

          {newsletterSubmitted ? (
            <div className="bg-[#111111] border border-[#1E1E1E] p-3 text-xs text-[#F4F4F4]">
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
                className="w-full bg-[#111111] border border-[#1E1E1E] text-[#F4F4F4] placeholder-[#666666] text-xs px-3.5 py-2.5 rounded-none focus:outline-none focus:border-[#F4F4F4]"
                aria-label="Email address for drop updates"
              />
              <button
                type="submit"
                className="w-full h-9 bg-[#F4F4F4] hover:bg-white text-black text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-12 pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
        <div>© {new Date().getFullYear()} KAPDA MAFIA. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-[#888888] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#888888] transition-colors">Terms</Link>
          <Link href="/returns" className="hover:text-[#888888] transition-colors">Shipping & Returns</Link>
        </div>
      </div>
    </footer>
  );
}
