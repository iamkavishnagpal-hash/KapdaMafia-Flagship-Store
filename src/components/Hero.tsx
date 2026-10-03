'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative bg-[#080808] border-b border-[#1E1E1E] overflow-hidden">
      {/* Editorial Top Meta Strip */}
      <div className="border-b border-[#1E1E1E] bg-[#0A0A0A] px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-between text-xs text-[#888888]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A]" />
          <span className="tracking-wider uppercase font-sans font-medium text-[#C8C3B8]">AUTUMN / WINTER 2026</span>
          <span className="text-[#333] hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#888]">FLAGSHIP STORE: NIT-5, FARIDABAD</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-sans tracking-wide text-[#A0A0A0]">
          <span>PAN-INDIA DISPATCH</span>
          <span className="text-[#F4F4F4] font-medium hidden md:inline">280–500 GSM EDITIONS</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Headline & Direct CTAs (7 columns) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] border border-[#222222] text-xs font-sans text-[#C8C3B8]">
              <span className="text-[#7D0A0A] font-semibold uppercase tracking-wider">NEW COLLECTION</span>
              <span className="text-[#444]">/</span>
              <span className="tracking-wide">Autumn & Winter Essentials</span>
            </div>

            <h1 className="type-display text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-[#F4F4F4] tracking-[-0.045em] leading-[0.94]">
              Heavyweight drape.<br />
              <span className="font-serif italic font-normal text-[#C8C3B8] pr-2">Constructed</span>
              <span className="text-[#888888]">to endure.</span>
            </h1>

            <p className="type-body-lg text-[#9E9E9E] max-w-xl text-base sm:text-lg leading-relaxed">
              Streetwear crafted from dense, combed cotton with relaxed proportions and reinforced seams.
              Designed and tailored in Faridabad for lasting comfort and form.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/shop">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
                  Shop Autumn Collection
                </Button>
              </Link>
              <Link href="#drops">
                <Button size="lg" variant="secondary" className="hover:border-[#7D0A0A]">
                  Explore New Drops
                </Button>
              </Link>
            </div>

            {/* Premium Editorial Craftsmanship Pillars */}
            <div className="pt-8 border-t border-[#1E1E1E] grid grid-cols-3 gap-6 text-xs text-[#888888] font-sans">
              <div className="space-y-1">
                <div className="text-[#F4F4F4] text-base font-semibold tracking-tight">280–500 GSM</div>
                <div className="text-[11px] text-[#777] uppercase tracking-wider">Combed Terry & Fleece</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#F4F4F4] text-base font-semibold tracking-tight">Pan-India Air</div>
                <div className="text-[11px] text-[#777] uppercase tracking-wider">3–4 Day Tracked Delivery</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#F4F4F4] text-base font-semibold tracking-tight">NIT-5 Flagship</div>
                <div className="text-[11px] text-[#777] uppercase tracking-wider">Faridabad Studio Walk-in</div>
              </div>
            </div>
          </div>

          {/* High-Impact Campaign Editorial Visual (5 columns) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] bg-[#111111] border border-[#222222] overflow-hidden group shadow-2xl shadow-black/80">
              <img
                src="/media/hero/hero-slide-1.jpg"
                alt="Kapda Mafia Heavyweight Streetwear Campaign"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Editorial Frame Badging */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-sans tracking-wide text-white/90">
                <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 uppercase font-medium text-[11px]">
                  NEW ARRIVAL
                </span>
                <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[#C8C3B8] text-[11px]">
                  440 GSM COTTON
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#222] flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#888888] font-medium block">
                    FEATURED PIECE
                  </span>
                  <span className="text-sm font-semibold text-[#F4F4F4]">
                    Flame Graphic Heavyweight Hoodie
                  </span>
                </div>
                <Link
                  href="/product/flame-graphic-heavyweight-hoodie"
                  className="p-2.5 bg-white text-black hover:bg-[#F4F4F4] transition-colors"
                  aria-label="View featured hoodie"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
