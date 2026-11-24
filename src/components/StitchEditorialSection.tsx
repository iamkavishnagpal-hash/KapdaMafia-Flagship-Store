// src/components/StitchEditorialSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { playMechanicalClick } from '@/utils/soundEffects';

export default function StitchEditorialSection() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] text-[#F4F4F4]">
      {/* Dual Editorial Split: Outerwear & Tops/Knitwear */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-[#1E1E1E] pb-4 mb-8">
          <div>
            <span className="font-mono text-xs text-[#888888] uppercase tracking-widest block">
              Curated Directives // 02
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-[var(--font-headline)] text-[#F4F4F4] mt-1">
              Editorial Campaigns
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-widest text-[#C8C3B8] hover:text-white transition-colors underline underline-offset-4 mt-2 sm:mt-0"
          >
            Explore All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Outerwear */}
          <Link
            href="/shop?category=hoodies"
            onClick={() => playMechanicalClick()}
            className="group relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/10] bg-[#111111] overflow-hidden flex items-end border border-[#1E1E1E] hover:border-[#444444] transition-all duration-300"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/ALJJyrBlN5KiblTK-lFRW741z2RnPzyqrRUb17jv1-kTSOeb2wES9OSZe-fOmvMBbHtAROa8Ziu3Nu1a8RvHNJ02ERcmt8pUuOOoGj2sN5q-Cooq8bpVd5lp85fQFWlXFyV6yn8DKK9Hm6ntkfVfyLhb7o_CnzWtrF3yxGUWlggWlgGO3N8vfb98N_aybTLR4YMKBZJbKuqT57dbJad3-2oqdW744as_zqGAbIJanLYe75_6cr8ObQ3m1D-Xye4"
              alt="Kapda Mafia Outerwear Campaign"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B6191A] font-semibold">
                Category 01 // Release
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-[var(--font-headline)] text-white">
                Outerwear & Jackets
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C3B8] font-light max-w-md">
                14oz duck canvas work jackets and weather-proof tactical shells crafted for utilitarian drape.
              </p>
              <div className="inline-flex items-center gap-2 pt-2 text-xs font-bold tracking-widest uppercase text-white group-hover:translate-x-1 transition-transform">
                <span>Shop Outerwear</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Card 2: Tops & Knitwear */}
          <Link
            href="/shop?category=tees"
            onClick={() => playMechanicalClick()}
            className="group relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/10] bg-[#111111] overflow-hidden flex items-end border border-[#1E1E1E] hover:border-[#444444] transition-all duration-300"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/ALJJyrCM1aiq78Cx-RNjC1V_8CvD5A7N_1EYnK47CN2-EfzTsuerykors9N8MoRQHhh2z4jvIvUrc6dXnV0xkCLOONEphLZXCVZksu2gSlZydUYm1St2aJoNPOH5hKsi1xRbnawLJygBzt6u8jceeIU6uNaMF7JhnGSplw0fzenyo7nWaSjgrlU5BJPQ2t8CG4NkM89bzFwKFSwV-jJDirntTkP_7h8JHAFr4wBX-zXgxCTn2hoPRkEg_-_OSg"
              alt="Kapda Mafia Tops & Knitwear Campaign"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B6191A] font-semibold">
                Category 02 // Core Archive
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-[var(--font-headline)] text-white">
                Tops & Heavy Knitwear
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C3B8] font-light max-w-md">
                Custom-milled 480 GSM terry fleece and 310 GSM combed cotton jersey in brutalist boxy silhouettes.
              </p>
              <div className="inline-flex items-center gap-2 pt-2 text-xs font-bold tracking-widest uppercase text-white group-hover:translate-x-1 transition-transform">
                <span>Shop Tops & Knits</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Full-Width Lookbook Campaign Banner */}
      <div className="border-t border-[#1E1E1E] bg-[#0A0A0A]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
          <div className="relative rounded-none border border-[#1E1E1E] bg-[#111111] overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center">
            <img
              src="https://lh3.googleusercontent.com/aida/ALJJyrCuv2rxGPHg4UOsnMPvFKXLTUhBevCJHB65Gi8Hgav6Dh5Xsyt7iti3iHjHCunjdQ1hYNL_c_-1fv86PkZ-u3G0S1qP3xrAVF3Ot2BFaT2e6tYqx33rcCgaDuTsrwZmxjZyhFeGw3PtfbYn0lQn2R3Umn3lqCcxdG8Y0J_M1e-64ugJX_NkysJUAhJIJ58dIUPiJEmd2eDmKQMRdJ7Qw2dj0lwxn4KblL2YyPUohAEOjX3J6OfK"
              alt="Winter 2026 Brutalist Concrete Lookbook"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="relative z-10 p-8 sm:p-14 max-w-2xl flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] border border-[#333333] text-xs font-mono uppercase tracking-widest text-[#F4F4F4]">
                <span className="w-1.5 h-1.5 bg-[#B6191A] rounded-full" />
                Editorial Archive // Winter 2026
              </span>
              <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight font-[var(--font-headline)] text-white">
                Concrete Courtyard Lookbook
              </h2>
              <p className="text-sm sm:text-base text-[#C8C3B8] font-normal leading-relaxed max-w-lg">
                Shot on location across brutalist industrial architecture. Documenting the intersection of raw heavyweight construction and everyday movement.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/lookbook"
                  onClick={() => playMechanicalClick()}
                  className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#F4F4F4] transition-all min-h-[44px] inline-flex items-center justify-center gap-2"
                >
                  <span>Enter Lookbook</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/shop"
                  onClick={() => playMechanicalClick()}
                  className="px-6 py-4 bg-black/60 border border-[#444444] hover:border-white text-white font-semibold text-xs uppercase tracking-widest transition-all min-h-[44px] inline-flex items-center justify-center"
                >
                  Shop Featured Looks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
