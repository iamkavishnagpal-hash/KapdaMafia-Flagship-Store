'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';
import { 
  playSubBassThud, 
  playMechanicalClick, 
  playPneumaticHiss, 
  playStorefrontArrivalChime,
  setSoundEnabled as persistSoundEnabled,
  isSoundEnabled
} from '@/utils/soundEffects';

/**
 * ARCHITECTURAL ARRIVAL PHASES:
 * 1. 'arrival'      - Exterior street facade dusk identity. Street numbers, warm interior tungsten backlight bleed.
 * 2. 'anticipation' - User engages (or auto-timer). Pressure seal release sound, subtle focus shift, threshold draws near.
 * 3. 'entry'        - Camera dollies physically forward through the threshold (scale + depth push, glass reflections dissolve).
 * 4. 'reveal'       - Physical interior emerges: Left wing Apparel (Kapda), Right wing Footwear (Shoes Mafia).
 * 5. 'completed'    - Smooth handoff directly into chosen retail universe.
 */
export type FlagshipPhase = 'arrival' | 'anticipation' | 'entry' | 'reveal' | 'completed';

interface SpatialShowroomSequenceProps {
  onComplete?: (world: StoreWorld) => void;
  autoPlay?: boolean;
}

export default function SpatialShowroomSequence({
  onComplete,
  autoPlay = true
}: SpatialShowroomSequenceProps) {
  const { setWorld, isShowroomOpen, closeShowroom } = useWorld();
  const [phase, setPhase] = useState<FlagshipPhase>('arrival');
  const [soundEnabled, setSoundEnabledState] = useState(() => isSoundEnabled());
  const [selectedWing, setSelectedWing] = useState<StoreWorld | null>(null);
  const [hoveredWing, setHoveredWing] = useState<StoreWorld | null>(null);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    persistSoundEnabled(next);
  };

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(t => clearTimeout(t));
    timerRef.current = [];
  }, []);

  // Trigger the forward physical threshold walk-in
  const initiatePhysicalEntry = useCallback(() => {
    clearTimers();
    setPhase('anticipation');

    if (soundEnabled) {
      playMechanicalClick();
      playSubBassThud();
    }

    // 600ms later: cross threshold — pneumatic air seal release & acoustic chime
    const tEntry = setTimeout(() => {
      setPhase('entry');
      if (soundEnabled) {
        playPneumaticHiss();
        setTimeout(() => playStorefrontArrivalChime(), 160);
      }
    }, 600);

    // 1600ms later: fully within grand lobby interior, reveal dual wings
    const tReveal = setTimeout(() => {
      setPhase('reveal');
    }, 1800);

    timerRef.current = [tEntry, tReveal];
  }, [clearTimers, soundEnabled]);

  // Initial arrival pacing: allow visitor to take in the exterior street facade before gentle forward dolly
  useEffect(() => {
    if (!isShowroomOpen) return;
    clearTimers();
    setPhase('arrival');
    setSelectedWing(null);

    if (autoPlay) {
      // Give visitor 2.8 seconds to perceive exterior presence before physical forward motion begins
      const autoEntry = setTimeout(() => {
        initiatePhysicalEntry();
      }, 2800);
      timerRef.current.push(autoEntry);
    }

    return () => clearTimers();
  }, [isShowroomOpen, autoPlay, initiatePhysicalEntry, clearTimers]);

  // Accessibility: Keyboard Navigation (ESC to bypass, Space/Enter to walk in, Arrow keys for wings)
  useEffect(() => {
    if (!isShowroomOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissToStore('clothing');
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (phase === 'arrival') {
          e.preventDefault();
          initiatePhysicalEntry();
        }
      } else if (phase === 'reveal') {
        if (e.key === 'ArrowLeft') {
          handleSelectWing('clothing');
        } else if (e.key === 'ArrowRight') {
          handleSelectWing('shoes');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShowroomOpen, phase, initiatePhysicalEntry]);

  const dismissToStore = (world: StoreWorld) => {
    clearTimers();
    setWorld(world);
    setPhase('completed');
    closeShowroom();
    if (onComplete) onComplete(world);
  };

  const handleSelectWing = (world: StoreWorld) => {
    clearTimers();
    setSelectedWing(world);
    if (soundEnabled) {
      playSubBassThud();
    }

    // Deliberate, smooth camera settling into the chosen retail world
    const tFinish = setTimeout(() => {
      setWorld(world);
      setPhase('completed');
      closeShowroom();
      if (onComplete) onComplete(world);
    }, 1200);

    timerRef.current.push(tFinish);
  };

  if (!isShowroomOpen || phase === 'completed') return null;

  // Camera transforms depending on phase and chosen wing
  const isEnteringLeft = selectedWing === 'clothing';
  const isEnteringRight = selectedWing === 'shoes';

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#080808] text-[#F4F4F4] overflow-hidden select-none font-sans spatial-perspective-rig"
      aria-label="Kapda Mafia Flagship Arrival Experience"
    >
      {/* =========================================================================
          TOP RESTITUTION CONTROLS (Restrained, Discrete, Non-Intrusive)
          ========================================================================= */}
      <header className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#A0A0A0]">
            FLAGSHIP STORE // NIT-5 FARIDABAD
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 bg-[#0D0D0D]/80 backdrop-blur-md border border-[#222222] p-1.5 text-xs">
          <button
            onClick={toggleSound}
            className="p-1.5 text-[#888888] hover:text-[#F4F4F4] transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute physical acoustics' : 'Enable physical acoustics'}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          <span className="w-px h-3.5 bg-[#252525]" />

          <button
            onClick={() => dismissToStore('clothing')}
            className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#A0A0A0] hover:text-[#F4F4F4] transition-colors cursor-pointer"
            title="Skip sequence (Esc)"
          >
            Skip to Store [ESC]
          </button>
        </div>
      </header>

      {/* =========================================================================
          CONTINUOUS SPATIAL CAMERA CONTAINER (Preserves Depth & Optical Scale)
          ========================================================================= */}
      <div 
        className={`relative w-full h-full architectural-dolly-transition ${
          isEnteringLeft
            ? 'scale-[1.28] -translate-x-[20%] translate-y-[2%]'
            : isEnteringRight
            ? 'scale-[1.28] translate-x-[20%] translate-y-[2%]'
            : phase === 'reveal'
            ? 'scale-[1.03] translate-z-0'
            : phase === 'entry'
            ? 'scale-[1.12]'
            : phase === 'anticipation'
            ? 'scale-[1.04]'
            : 'scale-100'
        }`}
      >

        {/* -----------------------------------------------------------------------
            LAYER 01: THE INTERIOR SHOPPING ENVIRONMENT (BASE DEPTH LAYER)
            Already physically existing behind the facade and revealed as camera moves
            ----------------------------------------------------------------------- */}
        <div 
          className={`absolute inset-0 z-10 flex flex-col justify-between bg-[#080808] transition-opacity duration-1000 ${
            phase === 'arrival' ? 'opacity-20 filter blur-sm' : phase === 'anticipation' ? 'opacity-40 filter blur-[2px]' : 'opacity-100 filter blur-0'
          }`}
        >
          {/* Architectural Concrete Waffle Ceiling & Track Lighting */}
          <div className="w-full h-20 sm:h-24 bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-transparent border-b border-[#1E1E1E]/40 flex items-center justify-between px-6 sm:px-12 text-xs font-mono text-[#555]">
            <div className="flex items-center gap-4 text-[11px] tracking-wider">
              <span>INTERIOR LOBBY</span>
              <span className="text-[#333]">/</span>
              <span>NATURAL LIGHT RATIO: 18%</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[11px] tracking-wider text-[#666]">
              <span>2700K TUNGSTEN HALOGEN CRI 98</span>
              <span>4.8M SLAB HEIGHT</span>
              <span>MONOLITHIC CONCRETE</span>
            </div>
          </div>

          {/* Grand Dual Wings: Menswear Apparel vs Footwear Vault */}
          <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center">
            
            {/* Subtle Wayfinding Header */}
            <div className={`text-center mb-6 sm:mb-10 transition-all duration-700 ${
              phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#121212] border border-[#222222] text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8C3B8] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A]" />
                <span>CENTRAL ATRIUM // PROCEED TO WING</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F4F4]">
                The Dual Flagship Floors
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#A0A0A0] max-w-lg mx-auto leading-relaxed">
                Structured heavyweight menswear to the west. High-street vulcanized footwear to the east. Continuous session and shared bag across both wings.
              </p>
            </div>

            {/* The Two Architectural Wings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

              {/* LEFT WING: KAPDA MAFIA (Menswear & Heavyweight Apparel) */}
              <div
                onClick={() => handleSelectWing('clothing')}
                onMouseEnter={() => {
                  setHoveredWing('clothing');
                  if (soundEnabled) playMechanicalClick();
                }}
                onMouseLeave={() => setHoveredWing(null)}
                className={`group relative overflow-hidden border bg-[#0C0C0C] p-6 sm:p-8 cursor-pointer transition-all duration-500 shadow-2xl ${
                  selectedWing === 'clothing'
                    ? 'border-[#7D0A0A] bg-[#140F10] ring-1 ring-[#7D0A0A]'
                    : hoveredWing === 'clothing'
                    ? 'border-[#7D0A0A]/70 bg-[#100D0E]'
                    : 'border-[#1E1E1E]'
                } ${
                  phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
                role="button"
                tabIndex={0}
                aria-label="Enter Kapda Mafia Menswear Showroom"
              >
                {/* 2700K Architectural Warmth Bloom */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#7D0A0A]/15 blur-[100px] pointer-events-none group-hover:bg-[#7D0A0A]/25 transition-all duration-500" />

                {/* Real Editorial Studio Imagery */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#141414] border border-[#222222] mb-5">
                  <img
                    src="/media/hero/hero-slide-1.jpg"
                    alt="Kapda Mafia Heavyweight Apparel Showroom"
                    className="w-full h-full object-cover object-top filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-[#C8C3B8]">
                    WEST WING // APPAREL
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#C8C3B8]">
                    <span className="font-mono text-[11px]">440 GSM Loopback Cotton</span>
                    <span className="font-semibold text-white">Autumn / Winter '26</span>
                  </div>
                </div>

                {/* Editorial Typography & Direct Action */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F4] group-hover:text-white transition-colors">
                      KAPDA MAFIA
                    </h2>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-[#7D0A0A] text-white">
                      Apparel Showroom
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    Heavyweight drop-shoulder tees, double-hood fleece, rigid selvedge denim, and tactical cargos engineered in Faridabad.
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[#1E1E1E] text-xs font-semibold">
                    <span className="text-[#888888] font-mono uppercase text-[11px]">18 Silhouettes In Stock</span>
                    <span className="inline-flex items-center gap-1.5 text-[#F4F4F4] group-hover:text-[#C8C3B8] group-hover:translate-x-1 transition-all">
                      <span>Step Inside Apparel</span>
                      <ArrowRight size={14} className="text-[#7D0A0A]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT WING: SHOES MAFIA (Footwear & Sneaker Pedestals) */}
              <div
                onClick={() => handleSelectWing('shoes')}
                onMouseEnter={() => {
                  setHoveredWing('shoes');
                  if (soundEnabled) playMechanicalClick();
                }}
                onMouseLeave={() => setHoveredWing(null)}
                className={`group relative overflow-hidden border bg-[#090D0F] p-6 sm:p-8 cursor-pointer transition-all duration-500 shadow-2xl ${
                  selectedWing === 'shoes'
                    ? 'border-[#1A8F7A] bg-[#0B1518] ring-1 ring-[#1A8F7A]'
                    : hoveredWing === 'shoes'
                    ? 'border-[#1A8F7A]/70 bg-[#0A1215]'
                    : 'border-[#1E1E1E]'
                } ${
                  phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
                role="button"
                tabIndex={0}
                aria-label="Enter Shoes Mafia Footwear Vault"
              >
                {/* Cold Cyan Surgical Glow */}
                <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#1A8F7A]/15 blur-[100px] pointer-events-none group-hover:bg-[#1A8F7A]/25 transition-all duration-500" />

                {/* Monolithic Pedestal Display with Real Footwear Line */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0C1417] border border-[#142329] mb-5 flex items-center justify-center">
                  <img
                    src="/media/flying-sneaker-3d.jpg"
                    alt="Shoes Mafia Street Footwear Line"
                    className="w-full h-full object-contain p-4 drop-shadow-[0_15px_30px_rgba(26,143,122,0.5)] filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-teal-500/30 text-[10px] font-mono tracking-widest uppercase text-teal-400">
                    EAST WING // FOOTWEAR
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#C8C3B8]">
                    <span className="font-mono text-[11px] text-teal-300">Dual-Density Sole</span>
                    <span className="font-semibold text-white">UK 6 — UK 10 In Stock</span>
                  </div>
                </div>

                {/* Editorial Typography & Direct Action */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F4] group-hover:text-white transition-colors">
                      SHOES MAFIA
                    </h2>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-[#1A8F7A] text-white">
                      Footwear Vault
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    Chunky high-street runners, retro court high-tops, and vulcanized sneakers engineered for shock absorption and raw presence.
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[#142329] text-xs font-semibold">
                    <span className="text-[#888888] font-mono uppercase text-[11px]">8 Colorways In Stock</span>
                    <span className="inline-flex items-center gap-1.5 text-[#F4F4F4] group-hover:text-teal-400 group-hover:translate-x-1 transition-all">
                      <span>Step Inside Footwear</span>
                      <ArrowRight size={14} className="text-[#1A8F7A]" />
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </main>

          {/* Micro-Cement Terrazzo Ground Footer */}
          <footer className="w-full h-12 bg-gradient-to-t from-[#111111] to-transparent border-t border-[#1E1E1E]/40 flex items-center justify-between px-6 sm:px-12 text-[11px] font-mono text-[#555]">
            <span>HONED MATTE MICRO-CEMENT // SATIN FINISH</span>
            <span>PRESS ESC FOR IMMEDIATE COMMERCE VIEW</span>
          </footer>
        </div>

        {/* -----------------------------------------------------------------------
            LAYER 02: THE THRESHOLD GLASS SHEEN (OPTICAL TRANSITION PLANE)
            Partially reflects the dusk street and softens into the interior
            ----------------------------------------------------------------------- */}
        <div 
          className={`absolute inset-0 z-20 pointer-events-none storefront-glass-sheen transition-all duration-[1200ms] ${
            phase === 'entry' || phase === 'reveal'
              ? 'opacity-0 scale-110'
              : 'opacity-100 scale-100'
          }`}
        />

        {/* -----------------------------------------------------------------------
            LAYER 03: THE EXTERIOR STREET FACADE & MONOLITHIC STOREFRONT
            Physical concrete identity with warm 2700K tungsten interior spill
            ----------------------------------------------------------------------- */}
        <div 
          className={`absolute inset-0 z-30 transition-all duration-[1400ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            phase === 'reveal'
              ? 'opacity-0 pointer-events-none -translate-z-32 scale-125'
              : phase === 'entry'
              ? 'opacity-0 pointer-events-none scale-115'
              : 'opacity-100 scale-100 pointer-events-auto'
          }`}
        >
          {/* Architectural facade photograph with dusk mood and authentic signage */}
          <div className="relative w-full h-full bg-[#080808]">
            <img
              src="/media/kapda-mafia-storefront-hero.jpg"
              alt="Kapda Mafia Exterior Flagship Storefront NIT-5 Faridabad"
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.12]"
            />

            {/* Tungsten interior back-light spilling through facade glass */}
            <div className="absolute inset-0 tungsten-architectural-bleed pointer-events-none" />

            {/* Storefront Identity & Physical Entrance Prompt */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-12 text-center">
              
              {/* Top Architecture Plate */}
              <div className="pt-12 sm:pt-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8C3B8]">
                  <span>EST. 2024</span>
                  <span className="text-[#555]">/</span>
                  <span>FARIDABAD SECTOR 5</span>
                  <span className="text-[#555]">/</span>
                  <span className="text-[#7D0A0A] font-semibold">FLAGSHIP</span>
                </div>
              </div>

              {/* Center Monolithic Identity */}
              <div className="max-w-2xl px-4 space-y-4">
                <div className="text-[12px] font-mono uppercase tracking-[0.3em] text-[#A0A0A0]">
                  ARCHITECTURAL DIGITAL THRESHOLD
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F4F4] drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]">
                  KAPDA MAFIA
                </h1>
                
                <p className="text-xs sm:text-sm text-[#C8C3B8] font-sans max-w-md mx-auto leading-relaxed drop-shadow-md">
                  Constructed from heavyweight cotton and raw industrial metals. Step beyond the exterior facade to enter the digital flagship.
                </p>

                {/* Tactile Entry Trigger */}
                <div className="pt-4">
                  <button
                    onClick={initiatePhysicalEntry}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#7D0A0A] hover:bg-[#960E0E] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(125,10,10,0.5)] cursor-pointer hover:shadow-[0_15px_40px_rgba(125,10,10,0.7)]"
                  >
                    <span>Step Inside Flagship</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Bottom Street Coordinate Stamp */}
              <div className="pb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#777] flex items-center gap-4">
                <span>28.3882° N, 77.2990° E</span>
                <span className="hidden sm:inline text-[#444]">•</span>
                <span className="hidden sm:inline">280–500 GSM HEAVYWEIGHT EDITIONS</span>
                <span className="text-[#444]">•</span>
                <span>PRESS SPACE TO WALK IN</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
