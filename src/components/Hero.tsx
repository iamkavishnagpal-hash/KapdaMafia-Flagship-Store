'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#080808] overflow-hidden flex items-center justify-center border-b border-[#181818]">
      
      {/* Editorial Menswear Campaign Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1920&auto=format&fit=crop" 
          alt="Kapda Mafia Menswear Campaign" 
          className="w-full h-full object-cover object-center opacity-35 scale-100 transition-transform duration-1000"
        />
        {/* Editorial Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]"></div>
        <div className="absolute inset-0 grain-overlay pointer-events-none"></div>
      </div>

      {/* Hero Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        
        {/* Subtle Eyebrow Metadata */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[#B8B4AA] text-[10px] font-mono tracking-[0.3em] uppercase rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
          DROP 09 • AFTER DARK PROTOCOL
        </div>

        {/* Editorial Display Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#F3F0E8] uppercase max-w-5xl leading-[0.95] mb-6">
          BUILT FOR THE ONES WHO <span className="text-[#8C8C86]">DON’T BLEND IN.</span>
        </h1>

        {/* Brand Manifesto Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-[#B8B4AA] font-mono max-w-xl leading-relaxed mb-10">
          400–500 GSM custom French Terry, tactical cargo silhouettes, and uncompromised streetwear craftsmanship.
        </p>

        {/* Max 3 Restrained CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-mono text-xs">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto px-8 py-4 bg-[#F3F0E8] hover:bg-[#B8B4AA] text-[#080808] font-bold tracking-[0.25em] uppercase transition-colors flex items-center justify-center gap-3"
          >
            SHOP NEW DROP
            <ArrowRight size={14} />
          </Link>

          <Link 
            href="/ai-fit" 
            className="w-full sm:w-auto px-8 py-4 bg-[#111111] border border-[#222222] hover:border-[#8C8C86] text-[#F3F0E8] font-bold tracking-[0.25em] uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles size={14} className="text-[#B8B4AA]" />
            TRY YOUR FIT (AI)
          </Link>

          <Link 
            href="/shop?category=tees" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#222222] hover:border-[#F3F0E8] text-[#B8B4AA] hover:text-[#F3F0E8] font-bold tracking-[0.25em] uppercase transition-colors flex items-center justify-center"
          >
            EXPLORE LOOKBOOK
          </Link>
        </div>

        {/* Technical Specification Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#181818] text-left w-full max-w-4xl text-[10px] font-mono text-[#8C8C86]">
          <div>
            <span className="block text-[#F3F0E8] font-bold">400–500 GSM</span>
            Custom French Cotton
          </div>
          <div>
            <span className="block text-[#F3F0E8] font-bold">LIMITED DROPS</span>
            No Mass Re-prints
          </div>
          <div>
            <span className="block text-[#F3F0E8] font-bold">SMART FIT ENGINE</span>
            AI Size Recommendation
          </div>
          <div>
            <span className="block text-[#F3F0E8] font-bold">EXPRESS SHIPPING</span>
            Pan-India Delivery
          </div>
        </div>

      </div>
    </section>
  );
}
