'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Shirt, Footprints, Play, RotateCcw, Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';
import { 
  playSubBassThud, 
  playMechanicalClick, 
  playPneumaticHiss, 
  playStorefrontArrivalChime,
  setSoundEnabled as persistSoundEnabled,
  isSoundEnabled
} from '@/utils/soundEffects';

export type EntranceScene = 
  | 'scene-00-black'      // Pitch black canvas + ambient room tone
  | 'scene-01-shutter'    // Heavy corrugated showroom shutter roll-up (~1.4s)
  | 'scene-02-exterior'   // Evening exterior street facade, warm reflections
  | 'scene-03-glass'      // Sensor-guided sliding tempered glass doors + pneumatic hiss & chime
  | 'scene-04-lobby'      // Grand split lobby: Left Kapda, Right Shoes
  | 'scene-05-transition' // Spatial camera push into chosen world
  | 'completed';          // Seamless handoff to live digital flagship

interface SpatialShowroomSequenceProps {
  onComplete?: (world: StoreWorld) => void;
  autoPlay?: boolean;
}

export default function SpatialShowroomSequence({
  onComplete,
  autoPlay = true
}: SpatialShowroomSequenceProps) {
  const { setWorld, isShowroomOpen, closeShowroom } = useWorld();
  const [currentScene, setCurrentScene] = useState<EntranceScene>('scene-00-black');
  const [soundEnabled, setSoundEnabledState] = useState(() => isSoundEnabled());
  const [selectedWorld, setSelectedWorld] = useState<StoreWorld | null>(null);
  const [cameraZoom, setCameraZoom] = useState<'normal' | 'entering-left' | 'entering-right'>('normal');
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    persistSoundEnabled(next);
  };

  const clearAllTimers = () => {
    timerRef.current.forEach(t => clearTimeout(t));
    timerRef.current = [];
  };

  const startContinuousSequence = () => {
    clearAllTimers();
    setCurrentScene('scene-00-black');
    setSelectedWorld(null);
    setCameraZoom('normal');

    if (soundEnabled) {
      playSubBassThud();
    }

    // SCENE 00 -> SCENE 01: Hydraulic shutter begins rolling up with mechanical latch release
    const t1 = setTimeout(() => {
      if (soundEnabled) playMechanicalClick();
      setCurrentScene('scene-01-shutter');
    }, 1200);

    // SCENE 01 -> SCENE 02: Exterior facade emerges through the shutter reveal
    const t2 = setTimeout(() => {
      setCurrentScene('scene-02-exterior');
    }, 2800);

    // SCENE 02 -> SCENE 03: Approaching glass portals — automatic motion sensor triggers pneumatic seal release & soft acoustic chime
    const t3 = setTimeout(() => {
      if (soundEnabled) {
        playPneumaticHiss();
        setTimeout(() => playStorefrontArrivalChime(), 180);
      }
      setCurrentScene('scene-03-glass');
    }, 5600);

    // SCENE 03 -> SCENE 04: Gliding past threshold into Grand Dual Lobby
    const t4 = setTimeout(() => {
      setCurrentScene('scene-04-lobby');
    }, 8400);

    timerRef.current = [t1, t2, t3, t4];
  };

  useEffect(() => {
    if (isShowroomOpen && autoPlay) {
      startContinuousSequence();
    }
    return () => clearAllTimers();
  }, [isShowroomOpen, autoPlay]);

  // Keyboard accessibility: ESC or Space to advance or exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isShowroomOpen) return;
      if (e.key === 'Escape') {
        dismissSequence('clothing');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShowroomOpen]);

  const dismissSequence = (world: StoreWorld) => {
    clearAllTimers();
    setWorld(world);
    setCurrentScene('completed');
    closeShowroom();
    if (onComplete) onComplete(world);
  };

  const handleSelectWorld = (world: StoreWorld) => {
    clearAllTimers();
    setSelectedWorld(world);
    setCameraZoom(world === 'clothing' ? 'entering-left' : 'entering-right');
    if (soundEnabled) {
      playSubBassThud();
    }

    // Trigger Scene 05 spatial push
    setCurrentScene('scene-05-transition');

    const t = setTimeout(() => {
      setWorld(world);
      setCurrentScene('completed');
      closeShowroom();
      if (onComplete) onComplete(world);
    }, 1800);

    timerRef.current.push(t);
  };

  const jumpToScene = (scene: EntranceScene) => {
    clearAllTimers();
    setCurrentScene(scene);
    setCameraZoom('normal');
  };

  if (!isShowroomOpen || currentScene === 'completed') return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#080808] text-[#F4F4F4] overflow-hidden select-none font-sans"
      aria-label="Kapda Mafia Digital Flagship Spatial Showroom Entrance"
    >
      {/* PERSISTENT CINEMATIC AUDIO / REPLAY SCRUBBER CONTROLS (Top Right) */}
      <aside aria-label="Showroom Controls" className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-[#111111]/90 backdrop-blur-md border border-[#222222] p-1.5 text-xs">
        <button
          onClick={toggleSound}
          className="p-1.5 hover:text-white text-[#888888] transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        <button
          onClick={startContinuousSequence}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#252525] text-[#C8C3B8] hover:text-white transition-colors cursor-pointer text-[11px] font-mono uppercase"
        >
          <RotateCcw size={12} />
          <span>Replay Sequence</span>
        </button>

        <button
          onClick={() => dismissSequence('clothing')}
          className="px-2.5 py-1 bg-[#7D0A0A] hover:bg-[#9B1111] text-white font-medium text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
        >
          Enter Store
        </button>
      </aside>

      {/* CONTINUOUS CAMERA RIG CONTAINER */}
      <div 
        className={`relative w-full h-full transition-transform duration-[1400ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          cameraZoom === 'entering-left' 
            ? 'scale-[1.35] -translate-x-[18%] translate-y-[4%]' 
            : cameraZoom === 'entering-right' 
            ? 'scale-[1.35] translate-x-[18%] translate-y-[4%]' 
            : currentScene === 'scene-03-glass'
            ? 'scale-[1.08]'
            : currentScene === 'scene-04-lobby'
            ? 'scale-[1.02]'
            : 'scale-100'
        }`}
      >

        {/* =========================================================================
            LAYER 01: GRAND LOBBY INTERIOR (Base Canvas, Revealed sequentially)
            ========================================================================= */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between bg-[#080808]">
          
          {/* Ceiling Grid with 2700K Architectural Pin-spots */}
          <div className="w-full h-24 bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-transparent border-b border-[#1E1E1E]/50 flex items-center justify-between px-8 text-xs font-mono text-[#666666]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#7D0A0A] animate-pulse" />
              <span className="tracking-widest uppercase text-[#999]">FLAGSHIP SHOWROOM // NIT-5 FARIDABAD</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[11px] tracking-wider text-[#777]">
              <span>CEILING: 4.8M WAFFLE CONCRETE</span>
              <span>LIGHTING: 2700K TUNGSTEN CRI 98</span>
              <span>EST. 2024</span>
            </div>
          </div>

          {/* Grand Lobby Core: The Two Architectural Portals */}
          <div className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center">
            
            {/* Lobby Wayfinding Header */}
            <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
              currentScene === 'scene-04-lobby' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#222222] text-[11px] font-mono uppercase tracking-widest text-[#C8C3B8] mb-3">
                <span>SCENE 04 // GRAND LOBBY</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F4F4]">
                Choose Your Retail World
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#888888] max-w-lg mx-auto">
                One digital building. Two distinct universes. Shared unified bag, checkout, and inventory.
              </p>
            </div>

            {/* THE TWO PHYSICAL SHOWROOM WINGS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">

              {/* -------------------------------------------------------------
                  LEFT WING: KAPDA MAFIA (Menswear & Heavyweight Apparel)
                  ------------------------------------------------------------- */}
              <div
                onClick={() => handleSelectWorld('clothing')}
                className={`group relative overflow-hidden border border-[#222222] bg-[#0E0E0E] p-6 sm:p-10 cursor-pointer transition-all duration-700 hover:border-[#7D0A0A] shadow-2xl ${
                  selectedWorld === 'clothing' ? 'ring-2 ring-[#7D0A0A] bg-[#141011]' : ''
                } ${
                  currentScene === 'scene-04-lobby' || currentScene === 'scene-05-transition'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                {/* Warm 2700K Architectural Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#7D0A0A]/15 blur-[120px] pointer-events-none group-hover:bg-[#7D0A0A]/25 transition-all duration-700" />

                {/* Real Indian Editorial Fashion Photography */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#161616] border border-[#222222] mb-6">
                  <img
                    src="/media/hero/hero-slide-1.jpg"
                    alt="Kapda Mafia Heavyweight Apparel Showroom"
                    className="w-full h-full object-cover object-top filter contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-[#C8C3B8]">
                    WEST WING // APPAREL
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#C8C3B8]">
                    <span className="font-mono text-[11px]">440 GSM Loopback Cotton</span>
                    <span className="font-semibold text-white">Autumn / Winter '26</span>
                  </div>
                </div>

                {/* Architectural Typography & Specs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F4] group-hover:text-white transition-colors">
                      KAPDA MAFIA
                    </h2>
                    <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 bg-[#7D0A0A] text-white">
                      Apparel Showroom
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    Heavyweight drop-shoulder tees, double-hood fleece, rigid selvedge denim, and tactical cargos engineered in Faridabad.
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[#1E1E1E] text-xs font-semibold">
                    <span className="text-[#888888] font-mono uppercase text-[11px]">18 Silhouettes In Stock</span>
                    <span className="inline-flex items-center gap-1.5 text-[#F4F4F4] group-hover:text-[#C8C3B8] group-hover:translate-x-1 transition-all">
                      <span>Enter Showroom</span>
                      <ArrowRight size={14} className="text-[#7D0A0A]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  RIGHT WING: SHOES MAFIA (Footwear & Sneaker Pedestals)
                  ------------------------------------------------------------- */}
              <div
                onClick={() => handleSelectWorld('shoes')}
                className={`group relative overflow-hidden border border-[#222222] bg-[#0A0E10] p-6 sm:p-10 cursor-pointer transition-all duration-700 hover:border-[#1A8F7A] shadow-2xl ${
                  selectedWorld === 'shoes' ? 'ring-2 ring-[#1A8F7A] bg-[#0c1417]' : ''
                } ${
                  currentScene === 'scene-04-lobby' || currentScene === 'scene-05-transition'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '250ms' }}
              >
                {/* Cold-Cyan Surgical Sole Glow */}
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#1A8F7A]/15 blur-[120px] pointer-events-none group-hover:bg-[#1A8F7A]/25 transition-all duration-700" />

                {/* Monolithic Pedestal Display with Real Footwear Line */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1519] border border-[#16252C] mb-6 flex items-center justify-center">
                  <img
                    src="/media/flying-sneaker-3d.jpg"
                    alt="Shoes Mafia Street Footwear Line"
                    className="w-full h-full object-contain p-4 drop-shadow-[0_20px_35px_rgba(26,143,122,0.6)] filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-teal-500/30 text-[10px] font-mono tracking-widest uppercase text-teal-400">
                    EAST WING // FOOTWEAR
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#C8C3B8]">
                    <span className="font-mono text-[11px] text-teal-300">Dual-Density Sole</span>
                    <span className="font-semibold text-white">UK 6 — UK 10 Available</span>
                  </div>
                </div>

                {/* Architectural Typography & Specs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F4F4] group-hover:text-white transition-colors">
                      SHOES MAFIA
                    </h2>
                    <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 bg-[#1A8F7A] text-white">
                      Footwear Vault
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    Chunky high-street runners, retro court high-tops, and vulcanized sneakers engineered for shock absorption and raw presence.
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[#16252C] text-xs font-semibold">
                    <span className="text-[#888888] font-mono uppercase text-[11px]">8 Colorways In Stock</span>
                    <span className="inline-flex items-center gap-1.5 text-[#F4F4F4] group-hover:text-teal-400 group-hover:translate-x-1 transition-all">
                      <span>Enter Vault</span>
                      <ArrowRight size={14} className="text-[#1A8F7A]" />
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Micro-Cement Terrazzo Floor Trim */}
          <div className="w-full h-12 bg-gradient-to-t from-[#141414] to-transparent border-t border-[#1E1E1E]/50 flex items-center justify-between px-8 text-[11px] font-mono text-[#555]">
            <span>HONED MATTE MICRO-CEMENT // SATIN FINISH</span>
            <span>PRESS ESC FOR IMMEDIATE COMMERCE GRID</span>
          </div>

        </div>

        {/* =========================================================================
            LAYER 02: SCENE 03 — DUAL SLIDING TEMPERED GLASS DOORS
            ========================================================================= */}
        <div 
          className={`absolute inset-0 z-20 flex overflow-hidden pointer-events-none transition-opacity duration-700 ${
            currentScene === 'scene-00-black' || currentScene === 'scene-01-shutter'
              ? 'opacity-0'
              : 'opacity-100'
          }`}
        >
          {/* Left Glass Leaf */}
          <div 
            className={`relative w-1/2 h-full bg-[#0a0a0a]/75 backdrop-blur-[6px] border-r border-white/20 shadow-2xl flex items-center justify-end pr-8 transition-transform duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1) ${
              currentScene === 'scene-03-glass' || currentScene === 'scene-04-lobby' || currentScene === 'scene-05-transition'
                ? '-translate-x-full'
                : 'translate-x-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            <div className="w-1.5 h-64 rounded-full bg-gradient-to-b from-[#666] via-[#eee] to-[#444] shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/40" />
            <div className="absolute top-1/4 right-12 text-[10px] font-mono text-white/40 uppercase tracking-widest rotate-90">
              TEMPERED 12MM LOW-IRON
            </div>
          </div>

          {/* Right Glass Leaf */}
          <div 
            className={`relative w-1/2 h-full bg-[#0a0a0a]/75 backdrop-blur-[6px] border-l border-white/20 shadow-2xl flex items-center justify-start pl-8 transition-transform duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1) ${
              currentScene === 'scene-03-glass' || currentScene === 'scene-04-lobby' || currentScene === 'scene-05-transition'
                ? 'translate-x-full'
                : 'translate-x-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent pointer-events-none" />
            <div className="w-1.5 h-64 rounded-full bg-gradient-to-b from-[#666] via-[#eee] to-[#444] shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/40" />
            <div className="absolute top-1/4 left-12 text-[10px] font-mono text-white/40 uppercase tracking-widest -rotate-90">
              ELECTROMAGNETIC SENSOR
            </div>
          </div>
        </div>

        {/* =========================================================================
            LAYER 03: SCENE 02 — SHOWROOM EXTERIOR FACADE & EVENING REFLECTIONS
            ========================================================================= */}
        <div 
          className={`absolute inset-0 z-30 transition-opacity duration-1000 pointer-events-none ${
            currentScene === 'scene-02-exterior' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative w-full h-full bg-black/40 flex flex-col justify-between p-8 text-xs font-mono text-[#C8C3B8]">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-black/80 border border-white/10 uppercase tracking-widest text-[10px]">
                SCENE 02 // EXTERIOR FACADE
              </span>
              <span>2700K WARM ARCHITECTURAL BLEED</span>
            </div>

            <div className="text-center space-y-2 mb-16">
              <div className="text-[#888888] uppercase tracking-widest text-xs">Flagship Showroom Entrance</div>
              <h2 className="text-3xl font-bold text-white tracking-tight">KAPDA MAFIA × SHOES MAFIA</h2>
              <p className="text-xs text-[#999] max-w-sm mx-auto">
                Approaching the main glass facade. Automatic sliding sensors activating...
              </p>
            </div>

            <div className="text-center text-[10px] text-[#666]">
              CLICK OR TAP ANYWHERE TO ENTER
            </div>
          </div>
        </div>

        {/* =========================================================================
            LAYER 04: SCENE 01 — INDUSTRIAL CORRUGATED METAL ROLLING SHUTTER
            ========================================================================= */}
        <div 
          className={`absolute inset-0 z-40 bg-[#080808] transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) pointer-events-none ${
            currentScene === 'scene-00-black'
              ? 'translate-y-0'
              : currentScene === 'scene-01-shutter'
              ? '-translate-y-full'
              : '-translate-y-full'
          }`}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#070707]">
            {/* Real Storefront Shutter Photography / Metal Plating */}
            <img
              src="/media/kapda-mafia-storefront-hero.jpg"
              alt="Kapda Mafia Heavyweight Shutter"
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
            />
            {/* Corrugated Shutter Shadow Grooves */}
            <div className="absolute inset-0 shutter-metal-grooves pointer-events-none opacity-40 mix-blend-overlay" />

            {/* Embossed Metal Brand Mark */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <div className="px-4 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-[0.25em] text-[#C8C3B8] mb-3">
                FLAGSHIP STORE // NIT-5 FARIDABAD
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F4F4] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                KAPDA MAFIA
              </h1>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-[#888888]">
                SCENE 01 · HYDRAULIC ROLLING SHUTTER LIFT
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LAYER 05: SCENE 00 — PITCH BLACK CANVAS & MINIMAL WORDMARK
            ========================================================================= */}
        <div 
          className={`absolute inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-700 pointer-events-none ${
            currentScene === 'scene-00-black' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="space-y-4">
            <span className="w-2 h-2 rounded-full bg-[#7D0A0A] inline-block animate-ping" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-[#F4F4F4]">
              KAPDA MAFIA
            </h1>
            <p className="text-xs font-mono text-[#666666] uppercase tracking-widest">
              A CUSTOM DIGITAL FLAGSHIP STORE
            </p>
          </div>
        </div>

      </div>

      {/* TIMELINE INTERACTIVE SCRUBBER BAR (Bottom Overlay) */}
      <footer aria-label="Showroom Navigation Bar" className="absolute bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto bg-[#0E0E0E]/95 backdrop-blur-md border border-[#222222] p-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide py-1">
          {[
            { id: 'scene-00-black', label: '00. Black' },
            { id: 'scene-01-shutter', label: '01. Shutter' },
            { id: 'scene-02-exterior', label: '02. Exterior' },
            { id: 'scene-03-glass', label: '03. Glass Doors' },
            { id: 'scene-04-lobby', label: '04. Grand Lobby' },
          ].map((scene) => (
            <button
              key={scene.id}
              onClick={() => jumpToScene(scene.id as EntranceScene)}
              className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                currentScene === scene.id
                  ? 'bg-[#F4F4F4] text-[#080808] font-bold'
                  : 'text-[#888888] hover:text-[#F4F4F4] hover:bg-[#1a1a1a]'
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[#777] text-[11px]">
          <span>STATUS: <span className="text-[#C8C3B8] font-semibold">{currentScene.toUpperCase()}</span></span>
        </div>
      </footer>
    </div>
  );
}
