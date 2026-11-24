// src/components/CinematicEntrance.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Footprints, ArrowRight, FastForward } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';
import { 
  playSubBassThud, 
  playMechanicalClick, 
  playPneumaticHiss, 
  playStorefrontArrivalChime 
} from '@/utils/soundEffects';

type EntranceStage = 
  | 'closed'             // Shutter fully down
  | 'shutter-rolling'    // Shutter rolls up mechanically
  | 'doors-opening'      // Glass doors part left & right
  | 'welcome-quote'      // Refined welcome quote
  | 'wing-selection'     // 50/50 foyer: Kapda Mafia vs Shoes Mafia
  | 'exiting-apparel'    // Smooth camera transition into apparel world
  | 'exiting-footwear'   // Smooth camera transition into footwear world
  | 'dismissed';         // Entrance unmounted

const ENTRANCE_STORAGE_KEY = 'km_entrance_bypassed';

export default function CinematicEntrance() {
  const { setWorld } = useWorld();
  const [stage, setStage] = useState<EntranceStage>('dismissed');
  const [hoveredWing, setHoveredWing] = useState<'apparel' | 'shoes' | null>(null);

  // Check returning visitor state on mount & listen for manual showroom reopening
  useEffect(() => {
    try {
      const isBypassed = localStorage.getItem(ENTRANCE_STORAGE_KEY) === 'true';
      if (!isBypassed) {
        setStage('closed');
      }
    } catch {
      setStage('closed');
    }

    const handleReopenShowroom = () => {
      setStage('closed');
    };

    window.addEventListener('km_open_showroom', handleReopenShowroom);
    return () => window.removeEventListener('km_open_showroom', handleReopenShowroom);
  }, []);

  // Lock body scroll while entrance is active
  useEffect(() => {
    if (stage !== 'dismissed') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'auto';
      };
    }
  }, [stage]);

  const triggerSound = useCallback((fn: () => void) => {
    try {
      fn();
    } catch {
      // safe fallback
    }
  }, []);

  // Physical Showroom Sequence:
  // Closed -> Shutter Rolls Up (at 0.9s) -> Doors Open (at 2.3s) -> Welcome Quote (at 3.7s) -> Wing Selection (at 5.4s)
  useEffect(() => {
    if (stage === 'closed') {
      const t1 = setTimeout(() => {
        setStage('shutter-rolling');
        triggerSound(playSubBassThud);
      }, 900);
      return () => clearTimeout(t1);
    }

    if (stage === 'shutter-rolling') {
      const t2 = setTimeout(() => {
        setStage('doors-opening');
        triggerSound(playPneumaticHiss);
        setTimeout(() => triggerSound(playStorefrontArrivalChime), 350);
      }, 1400);
      return () => clearTimeout(t2);
    }

    if (stage === 'doors-opening') {
      const t3 = setTimeout(() => {
        setStage('welcome-quote');
      }, 1300);
      return () => clearTimeout(t3);
    }

    if (stage === 'welcome-quote') {
      const t4 = setTimeout(() => {
        setStage('wing-selection');
      }, 2300);
      return () => clearTimeout(t4);
    }
  }, [stage, triggerSound]);

  // Click shutter early to trigger immediate roll up
  const handleShutterInteract = () => {
    if (stage === 'closed') {
      setStage('shutter-rolling');
      triggerSound(playSubBassThud);
    }
  };

  // Instant Skip Option
  const handleSkip = (targetWorld: StoreWorld = 'clothing') => {
    try {
      localStorage.setItem(ENTRANCE_STORAGE_KEY, 'true');
    } catch {}
    setWorld(targetWorld);
    document.body.style.overflow = 'auto';
    setStage('dismissed');
  };

  // Select Wing Handlers
  const handleSelectApparel = () => {
    try {
      localStorage.setItem(ENTRANCE_STORAGE_KEY, 'true');
    } catch {}
    triggerSound(playMechanicalClick);
    triggerSound(playSubBassThud);
    setStage('exiting-apparel');
    setTimeout(() => {
      setWorld('clothing');
      document.body.style.overflow = 'auto';
      setStage('dismissed');
    }, 750);
  };

  const handleSelectFootwear = () => {
    try {
      localStorage.setItem(ENTRANCE_STORAGE_KEY, 'true');
    } catch {}
    triggerSound(playMechanicalClick);
    triggerSound(playSubBassThud);
    setStage('exiting-footwear');
    setTimeout(() => {
      setWorld('shoes');
      document.body.style.overflow = 'auto';
      setStage('dismissed');
    }, 750);
  };

  if (stage === 'dismissed') return null;

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[1000] overflow-hidden bg-[#070707] select-none text-[#F4F4F4]"
      data-testid="cinematic-entrance-root"
    >
      {/* =========================================================================
          BACKGROUND LAYER: STOREFRONT INTERIOR
          ========================================================================= */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out">
          <Image
            src="/media/kapda-mafia-storefront-hero.jpg"
            alt="Kapda Mafia Flagship Interior"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-radial from-[#1E1A17]/70 via-[#0C0B0A]/90 to-[#050505] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-[#EAE4D8]/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
          INTERIOR CONTENT LAYER: WELCOME & DUAL WING SELECTOR
          ========================================================================= */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 sm:p-8">
        
        {/* MINIMAL TOP BAR (Clean, no fake coordinates or bracketed text) */}
        <header className="absolute top-0 inset-x-0 h-16 sm:h-20 flex items-center justify-between px-6 sm:px-12 border-b border-white/5 bg-[#080808]/40 backdrop-blur-sm z-30">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A]" />
            <span className="text-xs font-bold tracking-wider text-[#C8C3B8] uppercase">
              Kapda Mafia &amp; Shoes Mafia
            </span>
          </div>

          <button
            onClick={() => handleSkip('clothing')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 text-[#D4CFC4] hover:text-white transition-all cursor-pointer rounded-sm min-h-[44px]"
          >
            <span>Skip to store</span>
            <FastForward size={14} />
          </button>
        </header>

        {/* -----------------------------------------------------------------------
            STAGE A: ELEGANT WELCOME QUOTE
            ----------------------------------------------------------------------- */}
        <AnimatePresence>
          {stage === 'welcome-quote' && (
            <motion.div
              key="welcome-quote-card"
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl text-center px-4"
            >
              <div className="inline-block px-3 py-1 mb-5 border border-white/10 bg-white/5 text-xs font-mono tracking-[0.15em] text-[#C8C3B8] uppercase rounded-full">
                Flagship storefront
              </div>

              <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F4F4] leading-[1.18] tracking-tight">
                “Raw heavyweight textiles. Architectural footwear. Step inside the dual flagship.”
              </h2>

              <p className="mt-5 text-xs font-mono tracking-wider text-[#888888] uppercase">
                Faridabad NIT-5 Store · Pan-India Dispatch
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -----------------------------------------------------------------------
            STAGE B: 50/50 FOYER WITH 60/40 FLEX HOVER EXPANSION
            ----------------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
          {stage === 'wing-selection' && (
            <motion.div
              key="wing-selector-grid"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="storefront-title"
              className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 flex flex-col items-center"
            >
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-xs font-medium tracking-[0.08em] text-[#C8C3B8] uppercase block mb-2">
                  Choose a department
                </span>
                <h2 id="storefront-title" className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F4F4] font-[var(--font-display)]">
                  Select your storefront
                </h2>
              </div>

              {/* 50/50 Desktop Flex Container with 60/40 Hover Expand, Clean Mobile Stack */}
              <div className="w-full flex flex-col lg:flex-row gap-5 sm:gap-6 items-stretch">
                
                {/* WING 01: KAPDA MAFIA (Apparel) */}
                <div
                  onMouseEnter={() => setHoveredWing('apparel')}
                  onMouseLeave={() => setHoveredWing(null)}
                  className={`group relative overflow-hidden border transition-all duration-500 min-h-[360px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 ${
                    hoveredWing === 'apparel' 
                      ? 'lg:flex-[1.35] border-[#7D0A0A]' 
                      : hoveredWing === 'shoes' 
                      ? 'lg:flex-[0.75] border-white/10 opacity-75' 
                      : 'lg:flex-1 border-white/10'
                  } bg-[#0E0E0E]`}
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/media/portal-apparel-wing.jpg"
                      alt="Kapda Mafia Menswear"
                      fill
                      priority
                      className="object-cover object-top opacity-55 group-hover:opacity-75 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
                  </div>

                  <div className="relative z-10 mb-auto flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 border border-white/25 px-2.5 py-1 text-[#F4F4F4] text-xs font-medium tracking-[0.06em] uppercase">
                      <Shirt size={12} />
                      <span>Apparel</span>
                    </div>
                    <span className="text-xs tracking-[0.06em] text-[#C8C3B8] uppercase bg-black/70 px-2.5 py-1 border border-white/10">
                      280–440 GSM
                    </span>
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-[var(--font-display)]">
                      KAPDA MAFIA
                    </h3>
                    <p className="text-sm text-[#D0CCC3] mt-2 max-w-sm">
                      440 GSM Boxy Tees, Barrel Denim, Tactical Cargos &amp; Heavyweight Hoodies.
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="block text-xs tracking-[0.06em] text-[#C8C3B8] uppercase mb-4">
                        Drop 001 available now
                      </span>
                      <button type="button" onClick={handleSelectApparel} className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 bg-white hover:bg-[#F4F4F4] text-black text-sm font-semibold transition-colors">
                        <span>Shop apparel</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* WING 02: SHOES MAFIA (Footwear) */}
                <div
                  onMouseEnter={() => setHoveredWing('shoes')}
                  onMouseLeave={() => setHoveredWing(null)}
                  className={`group relative overflow-hidden border transition-all duration-500 min-h-[360px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 ${
                    hoveredWing === 'shoes' 
                      ? 'lg:flex-[1.35] border-[#1A8F7A]' 
                      : hoveredWing === 'apparel' 
                      ? 'lg:flex-[0.75] border-white/10 opacity-75' 
                      : 'lg:flex-1 border-white/10'
                  } bg-[#0B100E]`}
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/media/portal-footwear-wing.jpg"
                      alt="Shoes Mafia Footwear"
                      fill
                      priority
                      className="object-cover object-center opacity-55 group-hover:opacity-75 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060A08] via-[#060A08]/75 to-transparent" />
                  </div>

                  <div className="relative z-10 mb-auto flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 border border-white/25 px-2.5 py-1 text-[#F4F4F4] text-xs font-medium tracking-[0.06em] uppercase">
                      <Footprints size={12} />
                      <span>Footwear</span>
                    </div>
                    <span className="text-xs tracking-[0.06em] text-[#C8C3B8] uppercase bg-black/70 px-2.5 py-1 border border-white/10">
                      DUAL-DENSITY SOLES
                    </span>
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-[var(--font-display)]">
                      SHOES MAFIA
                    </h3>
                    <p className="text-sm text-[#D0CCC3] mt-2 max-w-sm">
                      Dual-Density Street Runners, Lugged Sole Chunky Trainers &amp; Court High-Tops.
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="block text-xs tracking-[0.06em] text-[#C8C3B8] uppercase mb-4">
                        New footwear available now
                      </span>
                      <button type="button" onClick={handleSelectFootwear} className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 bg-white hover:bg-[#F4F4F4] text-black text-sm font-semibold transition-colors">
                        <span>Shop footwear</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* =========================================================================
          FOREGROUND ARCHITECTURE: TEMPERED GLASS SLIDING DOORS
          ========================================================================= */}
      <AnimatePresence>
        {(stage === 'closed' || stage === 'shutter-rolling' || stage === 'doors-opening') && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex">
            {/* Left Glass Door */}
            <motion.div
              initial={{ x: '0%' }}
              animate={stage === 'doors-opening' ? { x: '-98%' } : { x: '0%' }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-1/2 h-full border-r border-white/20 bg-gradient-to-r from-white/[0.04] to-white/[0.08] backdrop-blur-[2px]"
            >
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-64 rounded-full bg-gradient-to-r from-[#DCD8D0] via-[#8E8A82] to-[#4A4742] shadow-2xl border border-white/30" />
            </motion.div>

            {/* Right Glass Door */}
            <motion.div
              initial={{ x: '0%' }}
              animate={stage === 'doors-opening' ? { x: '98%' } : { x: '0%' }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-1/2 h-full border-l border-white/20 bg-gradient-to-l from-white/[0.04] to-white/[0.08] backdrop-blur-[2px]"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-64 rounded-full bg-gradient-to-r from-[#4A4742] via-[#8E8A82] to-[#DCD8D0] shadow-2xl border border-white/30" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FOREGROUND ARCHITECTURE: REAL CORRUGATED ROLLING SHUTTER
          ========================================================================= */}
      <AnimatePresence>
        {(stage === 'closed' || stage === 'shutter-rolling') && (
          <motion.div
            key="physical-shutter-takeover"
            initial={{ y: '0%' }}
            animate={stage === 'shutter-rolling' ? { y: '-102%' } : { y: '0%' }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleShutterInteract}
            className="absolute inset-0 z-30 cursor-pointer overflow-hidden flex flex-col justify-between bg-[#121212]"
            style={{ willChange: 'transform' }}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/media/entrance-shutter.jpg"
                alt="Kapda Mafia Closed Corrugated Shutter"
                fill
                priority
                className="object-cover object-center brightness-95 contrast-105"
              />
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 22px)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Shutter Drum Box Header */}
            <div className="relative z-10 w-full h-16 sm:h-20 bg-gradient-to-b from-[#1C1C1C] to-[#0D0D0D] border-b-2 border-[#2A2A2A] shadow-2xl flex items-center justify-between px-6 sm:px-12 font-mono text-[10px] tracking-widest text-[#888888]">
              <div>FLAGSHIP STOREFRONT</div>
              <div className="text-[#C8C3B8]">NIT-5 FARIDABAD</div>
            </div>

            {/* Shutter Brand Mark */}
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#EAE6DF] font-[var(--font-display)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                KAPDA MAFIA
              </h2>
              <div className="text-base sm:text-2xl font-bold uppercase tracking-widest text-[#7D0A0A] font-mono mt-1">
                × SHOES MAFIA
              </div>
              <p className="text-xs font-mono tracking-widest text-[#C8C3B8] uppercase mt-3 bg-black/60 px-4 py-1.5 rounded backdrop-blur-sm border border-white/5">
                HEAVYWEIGHT APPAREL &amp; TECHNICAL FOOTWEAR
              </p>
            </div>

            {/* Bottom Pull Bar */}
            <div className="relative z-10 w-full pb-8 sm:pb-12 pt-6 flex flex-col items-center bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="w-full h-4 sm:h-5 bg-gradient-to-r from-[#2B2B2B] via-[#4A4A4A] to-[#2B2B2B] border-t-2 border-[#555555] border-b-2 border-black mb-5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]" />

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-24 sm:w-32 h-3.5 rounded-full bg-gradient-to-b from-[#8E8A82] to-[#3A3834] border border-[#B0ACA4]/40 shadow-xl group-hover:scale-105 transition-transform" />
                <div className="text-xs font-mono font-bold tracking-[0.25em] text-[#F4F4F4] uppercase mt-1 animate-pulse">
                  [ PULL UP TO ENTER STORE ]
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
