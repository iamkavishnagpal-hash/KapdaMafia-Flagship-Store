'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  id: number;
  badge: string;
  headline: string;
  subheadline: string;
  spec: string;
  image: string;
  href: string;
  ctaText: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    badge: 'RUN 001 // EDITION OF 250',
    headline: 'AFTER DARK // 440 GSM',
    subheadline: 'HEAVYWEIGHT DRAPE ARCHIVE',
    spec: '440 GSM COMBED TERRY · NITRO-WASHED · OVERSIZED FIT',
    image: '/media/hero/hero-slide-1.jpg',
    href: '#drop-archive',
    ctaText: 'ENTER DROP'
  },
  {
    id: 2,
    badge: 'ARCHIVE DROP 002 // RESTRICTED RUN',
    headline: 'SELVEDGE // BARREL CUT',
    subheadline: 'RAW INDIGO STREET ARCHITECTURE',
    spec: '14.5 OZ RIGID DENIM · ARTICULATED KNEE · HAND-SANDED',
    image: '/media/hero/hero-slide-2.jpg',
    href: '/shop?category=denim',
    ctaText: 'ENTER DROP'
  },
  {
    id: 3,
    badge: 'TACTICAL MATRIX // RUN 003',
    headline: 'MODULAR // CARGO VAULT',
    subheadline: 'DEEP POCKET VOLUMETRIC UTILITY',
    spec: '380 GSM HEAVY TWILL · D-RING HARDWARE · RELAXED TAPER',
    image: '/media/hero/hero-slide-3.jpg',
    href: '/shop?category=cargos',
    ctaText: 'ENTER DROP'
  }
];

import { playMechanicalClick, playSubBassThud } from '@/utils/soundEffects';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchStartXRef = React.useRef<number | null>(null);

  const nextSlide = () => {
    playSubBassThud();
    setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    playSubBassThud();
    setCurrentSlide((curr) => (curr - 1 + SLIDES.length) % SLIDES.length);
  };

  // 5-second auto transition with continuous progress bar
  useEffect(() => {
    setProgress(0);
    const intervalTime = 50; // updates every 50ms for smooth 60fps progress
    const totalTime = 5000;
    const step = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartXRef.current = null;
  };

  const active = SLIDES[currentSlide];

  return (
    <section 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100svh] sm:h-[calc(100svh-56px)] min-h-[620px] sm:max-h-[1080px] bg-[#080808] text-[#F4F4F4] border-b border-[#1E1E1E] overflow-hidden select-none font-mono"
    >
      
      {/* Asymmetric 60/40 Split: Right-Anchored Street Model Visual */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <div className="relative w-full h-full sm:w-[60%] sm:ml-auto">
            <img
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-cover object-top sm:object-center transform scale-100 transition-transform duration-1000"
            />
            {/* Deep gradient blending model softly into left black column */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent sm:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/50 to-transparent hidden sm:block" />
          </div>
          {/* Background Void Base for Left Text Column */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent sm:w-[55%] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
        </div>
      ))}

      {/* Foreground Left Column Content Block — 100% Unobstructed Clean Typography */}
      <div className="relative z-20 h-full max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 flex flex-col justify-end pb-8 sm:pb-16 pointer-events-none">
        
        <div className="max-w-2xl space-y-4 sm:space-y-6 pointer-events-auto">
          {/* Tactical Spec Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#080808]/95 backdrop-blur-md border border-[#1E1E1E] text-[10px] sm:text-[11px] font-mono tracking-[0.12em] uppercase text-[#888888]">
            <span className="w-1.5 h-1.5 bg-[#7D0A0A] animate-pulse" />
            <span>{active.badge}</span>
          </div>

          {/* Compressed Brutalist Headline: AFTER DARK // 440 GSM */}
          <div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[-0.05em] leading-[0.92] text-[#F4F4F4] font-[var(--font-display)]">
              {active.headline}
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-[0.12em] text-[#888888] uppercase mt-2.5">
              {active.subheadline}
            </p>
          </div>

          {/* Micro Hairline Spec */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.12em] text-[#888888] uppercase">
            <span className="text-[#F4F4F4] font-bold">{active.spec}</span>
          </div>

          {/* Direct 1-Tap CTA Action */}
          <div className="pt-2 flex items-center gap-4">
            <Link
              href={active.href}
              className="w-full sm:w-72 h-14 bg-[#FFFFFF] hover:bg-[#F4F4F4] active:scale-[0.99] text-[#080808] font-mono font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-2xl transition-all cursor-pointer"
            >
              <span>[{active.ctaText}]</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/lookbook"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#F4F4F4] hover:text-[#7D0A0A] uppercase px-4 py-3 border border-white/20 hover:border-white transition-colors bg-black/50 backdrop-blur-md"
            >
              <span>LOOKBOOK</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Slide Controls & Continuous Smooth Progress Bar */}
        <div className="pt-8 sm:pt-10 flex items-center justify-between pointer-events-auto border-t border-white/10 mt-6 sm:mt-8">
          
          <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
            <span className="text-white font-bold">0{currentSlide + 1}</span>
            <span>/</span>
            <span>0{SLIDES.length}</span>
          </div>

          {/* Progress Bar Line */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-4 sm:mx-8 h-0.5 bg-[#1E1E1E] overflow-hidden">
            <div
              className="h-full bg-[#FFFFFF] transition-all duration-75 ease-linear will-change-transform"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Arrow Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              onMouseEnter={playMechanicalClick}
              className="p-2 bg-[#111111] hover:bg-white hover:text-black border border-[#1E1E1E] text-white transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              onMouseEnter={playMechanicalClick}
              className="p-2 bg-[#111111] hover:bg-white hover:text-black border border-[#1E1E1E] text-white transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}

