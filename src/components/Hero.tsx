'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { playMechanicalClick, playSubBassThud } from '@/utils/soundEffects';

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
    badge: 'DROP 04 // CONCRETE & ASH',
    headline: 'CONCRETE & ASH',
    subheadline: 'Architectural outerwear & 480 GSM custom-milled jersey',
    spec: 'Engineered cold-weather utility · Drop shoulder · Raw edge finish',
    image: 'https://lh3.googleusercontent.com/aida/ALJJyrCuv2rxGPHg4UOsnMPvFKXLTUhBevCJHB65Gi8Hgav6Dh5Xsyt7iti3iHjHCunjdQ1hYNL_c_-1fv86PkZ-u3G0S1qP3xrAVF3Ot2BFaT2e6tYqx33rcCgaDuTsrwZmxjZyhFeGw3PtfbYn0lQn2R3Umn3lqCcxdG8Y0J_M1e-64ugJX_NkysJUAhJIJ58dIUPiJEmd2eDmKQMRdJ7Qw2dj0lwxn4KblL2YyPUohAEOjX3J6OfK',
    href: '/shop',
    ctaText: 'SHOP DROP 04'
  },
  {
    id: 2,
    badge: 'DROP 002',
    headline: 'BARREL DENIM',
    subheadline: 'Deep indigo 14.5 oz rigid denim',
    spec: 'Curved leg · rigid cotton · signature hardware',
    image: '/media/hero/hero-slide-2.jpg',
    href: '/shop?category=denim',
    ctaText: 'SHOP DROP 002'
  },
  {
    id: 3,
    badge: 'DROP 003',
    headline: 'CARGO PANTS',
    subheadline: '380 GSM heavy twill balloon taper',
    spec: 'Deep pockets · cotton twill · adjustable hem',
    image: '/media/hero/hero-slide-3.jpg',
    href: '/shop?category=cargos',
    ctaText: 'SHOP DROP 003'
  }
];

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
    const intervalTime = 50;
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
      className="relative w-full h-[100svh] sm:h-[calc(100svh-56px)] min-h-[620px] sm:max-h-[1080px] bg-[#080808] text-[#F4F4F4] border-b border-[#1E1E1E] overflow-hidden select-none"
    >
      {/* 100svh Full-Bleed Male Street Model Visual Canvas */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover object-top sm:object-center transform scale-100 transition-transform duration-1000"
          />
          {/* Vignette & Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-[#080808]/30 to-transparent sm:w-2/3" />
        </div>
      ))}

      {/* Foreground Content Block */}
      <div className="relative z-20 h-full max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 flex flex-col justify-end pb-6 sm:pb-16 pointer-events-none">
        
        <div className="max-w-3xl space-y-4 sm:space-y-6 pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#080808]/90 border border-[#1E1E1E] text-xs font-medium tracking-[0.08em] uppercase text-[#C8C3B8]">
            <span className="w-1.5 h-1.5 bg-[#B6191A]" />
            <span>{active.badge}</span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] leading-[0.95] text-[#F4F4F4] font-[var(--font-headline)] drop-shadow-2xl">
              {active.headline}
            </h1>
            <p className="text-xs sm:text-base font-normal tracking-[0.04em] text-[#D0CCC3] uppercase mt-2 font-[var(--font-body)]">
              {active.subheadline}
            </p>
          </div>

          {/* Spec */}
          <div className="flex items-center gap-3 text-xs tracking-[0.05em] text-[#B9B5AC] uppercase font-[var(--font-mono)]">
            <span>{active.spec}</span>
          </div>

          {/* CTA Row with dual actions (Shop Drop 04 + View Lookbook) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={active.href}
              className="w-full sm:w-64 h-14 bg-white hover:bg-[#F4F4F4] active:scale-[0.99] text-black font-bold text-xs tracking-[0.12em] uppercase flex items-center justify-center gap-3 shadow-2xl transition-all cursor-pointer"
            >
              <span>{active.ctaText}</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/lookbook"
              className="w-full sm:w-56 h-14 bg-transparent hover:bg-white/5 active:scale-[0.99] text-[#F4F4F4] border border-[#333333] hover:border-white font-bold text-xs tracking-[0.12em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>View Lookbook</span>
            </Link>
          </div>
        </div>

        {/* Slide Controls & Progress */}
        <div className="pt-8 sm:pt-10 flex items-center justify-between pointer-events-auto border-t border-white/10 mt-6 sm:mt-8">
          
          <div className="flex items-center gap-3 text-xs text-[#888888]">
            <span className="text-white font-bold">0{currentSlide + 1}</span>
            <span>/</span>
            <span>0{SLIDES.length}</span>
          </div>

          <div className="flex-1 max-w-xs sm:max-w-md mx-4 sm:mx-8 h-0.5 bg-[#1E1E1E] overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-75 ease-linear will-change-transform"
              style={{ width: `${progress}%` }}
            />
          </div>

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
