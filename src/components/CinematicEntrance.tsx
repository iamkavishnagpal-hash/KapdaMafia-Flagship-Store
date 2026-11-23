// src/components/CinematicEntrance.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Footprints, ArrowRight, Zap, Volume2, VolumeX, FastForward } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';
import { 
  playSubBassThud, 
  playMechanicalClick, 
  playPneumaticHiss, 
  playStorefrontArrivalChime, 
  isSoundEnabled, 
  setSoundEnabled 
} from '@/utils/soundEffects';

type EntranceStage = 
  | 'closed'             // Shutter fully down
  | 'shutter-rolling'    // Shutter rolls up mechanically
  | 'doors-opening'      // Glass doors part left & right
  | 'welcome-quote'      // Elegant quote appears
  | 'wing-selection'     // 2 choices: KAPDA MAFIA vs SHOES MAFIA
  | 'exiting-apparel'    // Cinematic transition into apparel world
  | 'exiting-footwear'   // Cinematic transition into footwear world
  | 'dismissed';         // Entrance unmounted

export default function CinematicEntrance() {
  const { setWorld } = useWorld();
  const [stage, setStage] = useState<EntranceStage>('closed');
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Check audio preference on mount
  useEffect(() => {
    setSoundOn(isSoundEnabled());
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

  // Audio helper
  const triggerSound = useCallback((fn: () => void) => {
    try {
      fn();
    } catch {
      // safe fallback
    }
  }, []);

  // Progression Timeline:
  // Closed -> Shutter Rolls Up (at 0.9s) -> Doors Open (at 2.4s) -> Welcome Quote (at 3.8s) -> Wing Selection (at 5.8s)
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
      }, 1500);
      return () => clearTimeout(t2);
    }

    if (stage === 'doors-opening') {
      const t3 = setTimeout(() => {
        setStage('welcome-quote');
      }, 1400);
      return () => clearTimeout(t3);
    }

    if (stage === 'welcome-quote') {
      const t4 = setTimeout(() => {
        setStage('wing-selection');
      }, 2600);
      return () => clearTimeout(t4);
    }
  }, [stage, triggerSound]);

  // Manual Trigger: User clicks shutter before auto-start
  const handleShutterInteract = () => {
    if (stage === 'closed') {
      setHasInteracted(true);
      setStage('shutter-rolling');
      triggerSound(playSubBassThud);
    }
  };

  // Instant Skip Option
  const handleSkip = (targetWorld: StoreWorld = 'clothing') => {
    setWorld(targetWorld);
    document.body.style.overflow = 'auto';
    setStage('dismissed');
  };

  // Select Wing Handlers
  const handleSelectApparel = () => {
    triggerSound(playMechanicalClick);
    triggerSound(playSubBassThud);
    setStage('exiting-apparel');
    setTimeout(() => {
      setWorld('clothing');
      document.body.style.overflow = 'auto';
      setStage('dismissed');
    }, 850);
  };

  const handleSelectFootwear = () => {
    triggerSound(playMechanicalClick);
    triggerSound(playSubBassThud);
    setStage('exiting-footwear');
    setTimeout(() => {
      setWorld('shoes');
      document.body.style.overflow = 'auto';
      setStage('dismissed');
    }, 850);
  };

  if (stage === 'dismissed') return null;

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[1000] overflow-hidden bg-[#070707] select-none text-[#F4F4F4]"
      data-testid="cinematic-entrance-root"
    >
      {/* =========================================================================
          BACKGROUND LAYER: STOREFRONT INTERIOR (Visible as shutter lifts & doors open)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A] overflow-hidden">
        {/* Subtle architectural storefront image base */}
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out">
          <Image
            src="/media/kapda-mafia-storefront-hero.jpg"
            alt="Kapda Mafia Flagship Interior"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Ambient flagship atmospheric gallery light */}
        <div className="absolute inset-0 bg-radial from-[#1E1A17]/70 via-[#0C0B0A]/90 to-[#050505] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-[#EAE4D8]/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
          INTERIOR CONTENT LAYER: WELCOME QUOTE & DUAL WING SELECTOR
          ========================================================================= */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 sm:p-8">
        
        {/* TOP STATUS BAR: Minimal Flagship HUD */}
        <header className="absolute top-0 inset-x-0 h-16 sm:h-20 flex items-center justify-between px-6 sm:px-12 border-b border-white/5 bg-[#080808]/40 backdrop-blur-sm z-30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#7D0A0A] animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#A09D94] uppercase">
              FLAGSHIP STORE // NIT-5 FARIDABAD [28.3846° N, 77.3086° E]
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const next = !soundOn;
                setSoundOn(next);
                setSoundEnabled(next);
                if (next) triggerSound(playSubBassThud);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase border border-white/10 rounded-sm hover:border-white/30 text-[#8C8C86] hover:text-white transition-colors"
              title="Toggle audio"
            >
              {soundOn ? <Volume2 size={12} className="text-emerald-400" /> : <VolumeX size={12} />}
              <span>{soundOn ? 'AUDIO ACTIVE' : 'AUDIO OFF'}</span>
            </button>

            {/* Escape Hatch / Skip Button */}
            <button
              onClick={() => handleSkip('clothing')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 text-[#D4CFC4] hover:text-white transition-all cursor-pointer rounded-sm"
            >
              <span>FAST ENTRY</span>
              <FastForward size={12} />
            </button>
          </div>
        </header>

        {/* -----------------------------------------------------------------------
            STAGE A: SHORT ELEGANT WELCOME QUOTE
            ----------------------------------------------------------------------- */}
        <AnimatePresence>
          {stage === 'welcome-quote' && (
            <motion.div
              key="welcome-quote-card"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl text-center px-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 border border-white/10 bg-white/5 text-[10px] font-mono tracking-[0.3em] text-[#C8C3B8] uppercase rounded-full">
                <Zap size={11} className="text-amber-400" /> THE DUAL STOREFRONT EXPERIENCE
              </div>

              <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F4F4] leading-[1.15] tracking-tight">
                “Raw heavyweight textiles. Architectural footwear. Step inside the dual flagship.”
              </h2>

              <p className="mt-6 text-xs sm:text-sm font-mono tracking-[0.2em] text-[#888888] uppercase">
                KAPDA MAFIA × SHOES MAFIA // EST. NEW DELHI NCR
              </p>

              <div className="mt-8 flex justify-center">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#7D0A0A] to-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -----------------------------------------------------------------------
            STAGE B: THE DUAL WING SELECTOR (KAPDA MAFIA vs SHOES MAFIA)
            ----------------------------------------------------------------------- */}
        <AnimatePresence>
          {(stage === 'wing-selection' || stage === 'exiting-apparel' || stage === 'exiting-footwear') && (
            <motion.div
              key="wing-selector-grid"
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 flex flex-col items-center"
            >
              {/* Heading */}
              <div className="text-center mb-6 sm:mb-10">
                <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] text-[#8C8C86] uppercase mb-2">
                  CHOOSE YOUR DESTINATION
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F4F4F4] font-[var(--font-display)]">
                  SELECT STOREFRONT WING
                </h1>
                <p className="text-xs sm:text-sm text-[#77746E] font-mono mt-1.5 max-w-md mx-auto">
                  Two distinct environments under one roof. Switch freely anytime from the global navigation.
                </p>
              </div>

              {/* The Two Portals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 w-full">
                
                {/* ===============================================================
                    WING 01: KAPDA MAFIA (MEN'S WEAR EXPERIENCE)
                    =============================================================== */}
                <motion.div
                  onClick={handleSelectApparel}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 ${
                    stage === 'exiting-apparel' 
                      ? 'border-[#7D0A0A] ring-2 ring-[#7D0A0A] scale-105 z-20' 
                      : 'border-white/10 hover:border-[#7D0A0A]/80 bg-[#0E0E0E]'
                  }`}
                >
                  {/* High Fashion Editorial Background Model */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/media/portal-apparel-wing.jpg"
                      alt="Kapda Mafia Menswear Editorial"
                      fill
                      priority
                      className="object-cover object-top opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
                    <div className="absolute inset-0 bg-[#7D0A0A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 mb-auto flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7D0A0A]/80 border border-[#7D0A0A] text-white text-[9px] font-mono font-bold tracking-widest uppercase">
                      <Shirt size={12} />
                      <span>WING 01 · MEN&apos;S WEAR</span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A09D94] uppercase bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                      440 GSM ARCHIVE
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 mt-6">
                    <div className="text-[11px] font-mono tracking-[0.25em] text-[#C8C3B8] uppercase mb-1">
                      HEAVYWEIGHT TEXTILE DIVISION
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#F4F4F4] tracking-tight font-[var(--font-display)] group-hover:text-white transition-colors">
                      KAPDA MAFIA
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A09D94] font-mono mt-2 leading-relaxed max-w-sm">
                      440 GSM Luxury French Terry Tees, Structured Acid Wash Cargos, Drop-Shoulder Sweaters & Boxy Tailoring.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-[10px] font-mono tracking-widest text-[#77746E] uppercase">
                        24 EXCLUSIVE PIECES
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#7D0A0A] hover:bg-[#961111] text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors group-hover:translate-x-1 duration-200">
                        <span>ENTER APPAREL</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ===============================================================
                    WING 02: SHOES MAFIA (FOOTWEAR EXPERIENCE)
                    =============================================================== */}
                <motion.div
                  onClick={handleSelectFootwear}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 ${
                    stage === 'exiting-footwear' 
                      ? 'border-[#1A8F7A] ring-2 ring-[#1A8F7A] scale-105 z-20' 
                      : 'border-white/10 hover:border-[#1A8F7A]/80 bg-[#0B100E]'
                  }`}
                >
                  {/* Luxury Footwear Boutique Display & Floating Sneaker Background */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/media/portal-footwear-wing.jpg"
                      alt="Shoes Mafia Footwear Portal"
                      fill
                      priority
                      className="object-cover object-center opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060A08] via-[#060A08]/75 to-transparent" />
                    
                    {/* Floating 3D Sneaker Accent */}
                    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 ease-out">
                      <Image
                        src="/media/flying-sneaker-3d.jpg"
                        alt="3D Floating Technical Sneaker"
                        fill
                        className="object-contain drop-shadow-[0_20px_30px_rgba(26,143,122,0.35)]"
                      />
                    </div>

                    <div className="absolute inset-0 bg-[#1A8F7A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 mb-auto flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A8F7A]/80 border border-[#1A8F7A] text-white text-[9px] font-mono font-bold tracking-widest uppercase">
                      <Footprints size={12} />
                      <span>WING 02 · FOOTWEAR STORE</span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-[#85C4B8] uppercase bg-black/60 px-2.5 py-1 rounded border border-[#1A8F7A]/30 backdrop-blur-sm">
                      DUAL-DENSITY LAB
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 mt-6">
                    <div className="text-[11px] font-mono tracking-[0.25em] text-[#85C4B8] uppercase mb-1">
                      TECHNICAL SNEAKER BOUTIQUE
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#F4F4F4] tracking-tight font-[var(--font-display)] group-hover:text-white transition-colors">
                      SHOES MAFIA
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A09D94] font-mono mt-2 leading-relaxed max-w-sm">
                      Dual-Density Street Runners, Lugged Sole Chunky Trainers, Architectural High-Tops & Speed Silhouettes.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-[10px] font-mono tracking-widest text-[#77746E] uppercase">
                        18 SNEAKER SILHOUETTES
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A8F7A] hover:bg-[#20A890] text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors group-hover:translate-x-1 duration-200">
                        <span>ENTER FOOTWEAR</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* =========================================================================
          FOREGROUND PHYSICAL ARCHITECTURE LAYER 1: TEMPERED GLASS SLIDING DOORS
          ========================================================================= */}
      <AnimatePresence>
        {(stage === 'closed' || stage === 'shutter-rolling' || stage === 'doors-opening') && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex">
            {/* Left Glass Door Panel */}
            <motion.div
              initial={{ x: '0%' }}
              animate={stage === 'doors-opening' ? { x: '-98%' } : { x: '0%' }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-1/2 h-full border-r border-white/20 bg-gradient-to-r from-white/[0.04] to-white/[0.08] backdrop-blur-[2px]"
            >
              {/* Vertical brushed metal door handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-64 rounded-full bg-gradient-to-r from-[#DCD8D0] via-[#8E8A82] to-[#4A4742] shadow-2xl border border-white/30" />
              {/* Frosted safety vision line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 border-y border-white/10 bg-white/[0.03] flex items-center justify-end pr-8">
                <span className="text-[8px] font-mono tracking-[0.3em] text-white/40 uppercase">
                  KAPDA MAFIA ARCHITECTURAL GLASS
                </span>
              </div>
            </motion.div>

            {/* Right Glass Door Panel */}
            <motion.div
              initial={{ x: '0%' }}
              animate={stage === 'doors-opening' ? { x: '98%' } : { x: '0%' }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-1/2 h-full border-l border-white/20 bg-gradient-to-l from-white/[0.04] to-white/[0.08] backdrop-blur-[2px]"
            >
              {/* Vertical brushed metal door handle */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-64 rounded-full bg-gradient-to-r from-[#4A4742] via-[#8E8A82] to-[#DCD8D0] shadow-2xl border border-white/30" />
              {/* Frosted safety vision line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 border-y border-white/10 bg-white/[0.03] flex items-center justify-start pl-8">
                <span className="text-[8px] font-mono tracking-[0.3em] text-white/40 uppercase">
                  SHOES MAFIA STOREFRONT ENTRANCE
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FOREGROUND PHYSICAL ARCHITECTURE LAYER 2: THE REAL CORRUGATED ROLLING SHUTTER
          ========================================================================= */}
      <AnimatePresence>
        {(stage === 'closed' || stage === 'shutter-rolling') && (
          <motion.div
            key="physical-shutter-takeover"
            initial={{ y: '0%' }}
            animate={stage === 'shutter-rolling' ? { y: '-102%' } : { y: '0%' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleShutterInteract}
            className="absolute inset-0 z-30 cursor-pointer overflow-hidden flex flex-col justify-between bg-[#121212]"
            style={{ willChange: 'transform' }}
          >
            {/* Shutter Photograph & Texture Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/media/entrance-shutter.jpg"
                alt="Kapda Mafia Closed Corrugated Shutter"
                fill
                priority
                className="object-cover object-center brightness-95 contrast-105"
              />
              {/* Metallic Corrugated Slats Overlay: Gives tactile ribbed industrial surface */}
              <div 
                className="absolute inset-0 opacity-45 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 22px)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Shutter Header Housing (Roll Drum Enclosure at top) */}
            <div className="relative z-10 w-full h-16 sm:h-20 bg-gradient-to-b from-[#1C1C1C] to-[#0D0D0D] border-b-2 border-[#2A2A2A] shadow-2xl flex items-center justify-between px-6 sm:px-12 font-mono text-[10px] tracking-[0.25em] text-[#888888]">
              <div>INDUSTRIAL ROLLING ENCLOSURE // MOD-01</div>
              <div className="text-[#C8C3B8]">FLAGSHIP STOREFRONT</div>
            </div>

            {/* Shutter Center Stencil & Coordinates */}
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
              <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[0.3em] text-[#C8C3B8] uppercase rounded mb-4">
                NIT-5 FARIDABAD [28.3846° N, 77.3086° E]
              </div>
              <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#EAE6DF] font-[var(--font-display)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                KAPDA MAFIA
              </h2>
              <div className="text-sm sm:text-xl font-bold uppercase tracking-widest text-[#7D0A0A] font-mono mt-1 drop-shadow-md">
                × SHOES MAFIA
              </div>
              <p className="text-[11px] font-mono tracking-widest text-[#A09D94] uppercase mt-4 max-w-md bg-black/60 px-4 py-1.5 rounded backdrop-blur-sm border border-white/5">
                HEAVYWEIGHT STREETWEAR &amp; TECHNICAL FOOTWEAR DUAL WORLDS
              </p>
            </div>

            {/* Shutter Bottom Pull Bar, Heavy Padlock & Lift Handle */}
            <div className="relative z-10 w-full pb-8 sm:pb-12 pt-6 flex flex-col items-center bg-gradient-to-t from-black via-black/80 to-transparent">
              {/* Heavy Galvanized Bottom Steel Bar */}
              <div className="w-full h-4 sm:h-6 bg-gradient-to-r from-[#2B2B2B] via-[#4A4A4A] to-[#2B2B2B] border-t-2 border-[#555555] border-b-2 border-black mb-6 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]" />

              {/* Lift Handle & Interactive Prompt */}
              <div className="flex flex-col items-center gap-2 group">
                {/* Physical Cast Steel Handle */}
                <div className="w-24 sm:w-32 h-3.5 rounded-full bg-gradient-to-b from-[#8E8A82] to-[#3A3834] border border-[#B0ACA4]/40 shadow-xl group-hover:scale-105 transition-transform" />
                
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#F4F4F4] uppercase mt-2 animate-pulse">
                  <span>[ PULL UP TO OPEN STOREFRONT ]</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#77746E] uppercase">
                  TAP ANYWHERE TO RAISE SHUTTER
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          EXITING CINEMATIC FLASH / DOLLY ACCENT OVERLAY
          ========================================================================= */}
      <AnimatePresence>
        {(stage === 'exiting-apparel' || stage === 'exiting-footwear') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className={`absolute inset-0 z-50 pointer-events-none flex items-center justify-center ${
              stage === 'exiting-apparel' ? 'bg-[#080808]' : 'bg-[#060A08]'
            }`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center font-mono"
            >
              <div className="text-xs tracking-[0.4em] uppercase text-[#888888] mb-2">
                ENTERING ARCHIVE
              </div>
              <div className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-[var(--font-display)]">
                {stage === 'exiting-apparel' ? 'KAPDA MAFIA' : 'SHOES MAFIA'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
