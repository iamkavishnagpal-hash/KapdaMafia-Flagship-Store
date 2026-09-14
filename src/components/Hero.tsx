'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] bg-[#050505] overflow-hidden flex items-center justify-center border-b border-white/10">
      
      {/* High-End Architectural Storefront Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/media/kapda-mafia-storefront-hero.jpg" 
          alt="Kapda Mafia Digital Flagship Storefront" 
          className="w-full h-full object-cover object-center opacity-45 scale-100 transition-transform duration-1000"
        />
        {/* Editorial Gradients & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/90"></div>
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-25"></div>
      </div>

      {/* Hero Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 bg-[#121212]/90 border border-white/15 text-[#C8C3B8] text-[9px] sm:text-[10px] font-mono tracking-[0.22em] sm:tracking-[0.3em] uppercase rounded-full mb-6 sm:mb-8 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] shadow-[0_0_8px_#8F1118]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-ping" />
          <span>RUN 001 // BATCH 04 // ACCESS GRANTED</span>
          <span className="text-[#555]">•</span>
          <span className="text-[#8F1118]">[NIT 5 CONCRETE VAULT // 28.3846° N, 77.3086° E]</span>
        </div>

        {/* Display Typography matching Luxury Streetwear Agencies */}
        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] text-[#F3F0E8] uppercase max-w-6xl leading-[0.9] sm:leading-[0.88] mb-4 sm:mb-6 font-[var(--font-display)] select-none">
          CLOTHES TELL <br />
          <span className="text-[#8F1118] drop-shadow-[0_0_35px_rgba(143,17,24,0.45)]">
            BETTER STORIES.
          </span>
        </h1>

        {/* Technical Lore Subtext */}
        <p className="text-xs sm:text-sm text-[#8C8C86] font-mono max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2 tracking-tight">
          [KM-ARCHIVE] // 280–440 GSM CUSTOM ACID WASHES. ENGINEERED FOR HIGH-TENSION SILHOUETTES AND UNDERGROUND CULTURE. ZERO BULK FABRICATION.
        </p>

        {/* Agency-Level Refined CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-mono text-xs">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto px-8 py-4 bg-[#F3F0E8] hover:bg-[#C8C3B8] text-[#050505] font-bold tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
          >
            ACQUIRE DROP PIECES
            <ArrowRight size={14} />
          </Link>

          <Link 
            href="/ai-fit" 
            className="w-full sm:w-auto px-8 py-4 bg-[#111111]/80 backdrop-blur-md border border-white/15 hover:border-white/40 text-[#F3F0E8] font-bold tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Sparkles size={14} className="text-[#8F1118]" />
            3D BODY ENGINE
          </Link>

          <Link 
            href="/lookbook" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 text-[#C8C3B8] hover:text-[#F3F0E8] font-bold tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center"
          >
            EDITORIAL LOOKBOOK
          </Link>
        </div>

        {/* Industrial Spec Strip */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] text-left w-full max-w-5xl text-[10px] font-mono text-[#8C8C86]">
          <div className="bg-[#080808] p-4">
            <span className="block text-[#F3F0E8] font-bold text-xs">440 GSM HEAVYWEIGHT</span>
            DENSE TERRY STRUCTURE
          </div>
          <div className="bg-[#080808] p-4">
            <span className="block text-[#F3F0E8] font-bold text-xs">ACID WASH &amp; PIGMENT</span>
            CARBON DISTRESSED FINISH
          </div>
          <div className="bg-[#080808] p-4">
            <span className="block text-[#F3F0E8] font-bold text-xs">RUN 001 // 250 UNITS</span>
            NUMBERED VAULT ALLOCATION
          </div>
          <div className="bg-[#080808] p-4">
            <span className="block text-[#F3F0E8] font-bold text-xs">DISPATCH // FARIDABAD</span>
            PRIORITY CARGO TRANSIT
          </div>
        </div>

      </div>
    </section>
  );
}
