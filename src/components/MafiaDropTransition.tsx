'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Shirt, Footprints, Sparkles } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';
import { playSubBassThud, playMechanicalClick } from '@/utils/soundEffects';

export default function MafiaDropTransition() {
  const [phase, setPhase] = useState<
    'shutter-closed' | 'shutter-opening' | 'glass-opening' | 'store-selection' | 'shoe-launch-3d' | 'completed'
  >('shutter-closed');
  const [removed, setRemoved] = useState(false);
  const { setWorld } = useWorld();

  useEffect(() => {
    // Check if user already entered in this session
    try {
      if (sessionStorage.getItem('km_entered_portal') === 'true') {
        setRemoved(true);
        return;
      }
    } catch {
      // ignore
    }

    // Step 1: Clean graffiti shutter hold (350ms)
    const t1 = window.setTimeout(() => {
      setPhase('shutter-opening');
    }, 350);

    // Step 2: Shutter rolls up smoothly, sliding glass doors glide open (900ms)
    const t2 = window.setTimeout(() => {
      setPhase('glass-opening');
    }, 950);

    // Step 3: Glass doors open, reveal portal choice (1400ms)
    const t3 = window.setTimeout(() => {
      setPhase('store-selection');
    }, 1450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const handleSelectStore = (selected: StoreWorld) => {
    playMechanicalClick();
    try {
      sessionStorage.setItem('km_entered_portal', 'true');
    } catch {
      // ignore
    }

    if (selected === 'shoes') {
      // Trigger 3D UGC Sneaker Launch
      playSubBassThud();
      setPhase('shoe-launch-3d');
      setTimeout(() => {
        setWorld('shoes');
        setPhase('completed');
        setTimeout(() => setRemoved(true), 400);
      }, 1500);
    } else {
      setWorld(selected);
      setPhase('completed');
      setTimeout(() => setRemoved(true), 400);
    }
  };

  if (removed) return null;

  const isShutterUp = phase !== 'shutter-closed';
  const isGlassOpen =
    phase === 'glass-opening' ||
    phase === 'store-selection' ||
    phase === 'shoe-launch-3d' ||
    phase === 'completed';

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-400 font-sans ${
        phase === 'completed' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={phase === 'completed'}
    >
      {/* 1. DUAL STORE PORTAL SELECTION */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#080808] p-4 text-[#F4F4F4]">
        {/* Subtle glow */}
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-[#7D0A0A]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#1a8f7a]/15 blur-[120px] pointer-events-none" />

        <div
          className={`relative w-full max-w-3xl overflow-hidden border border-[#1E1E1E] bg-[#111111]/95 p-6 sm:p-10 shadow-2xl transition-all duration-700 ${
            phase === 'store-selection'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Header with refined typography */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616] border border-[#1E1E1E] text-xs text-[#C8C3B8] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A]" />
              <span>Select Shopping World</span>
            </div>
            <h2 className="type-heading-xl text-[#F4F4F4]">
              Where would you like to enter?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#888888] max-w-md mx-auto">
              Two distinct universes under one flagship. You can switch worlds at any time from
              the top navigation bar.
            </p>
          </div>

          {/* Both Store Paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* PATH 1: KAPDA MAFIA */}
            <button
              onClick={() => handleSelectStore('clothing')}
              className="group relative overflow-hidden border border-[#1E1E1E] bg-[#141414] hover:border-[#7D0A0A] hover:bg-[#181213] p-6 text-left transition-all duration-300 shadow-xl cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-[#7D0A0A]/20 border border-[#7D0A0A]/40 flex items-center justify-center text-[#F4F4F4] group-hover:scale-105 transition-transform">
                  <Shirt size={22} />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#7D0A0A] text-white">
                  Apparel Flagship
                </span>
              </div>

              <h3 className="type-heading-md text-[#F4F4F4] mb-2 group-hover:text-white transition-colors">
                KAPDA MAFIA
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed mb-6">
                Heavyweight 400 GSM Tees, Tactical Cargos, Acid Wash Denim & Proportional Streetwear.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E] text-xs font-semibold text-[#F4F4F4]">
                <span className="text-[#888888]">Enter Apparel Store</span>
                <span className="flex items-center gap-1.5 text-[#F4F4F4] group-hover:translate-x-1 transition-transform">
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
            </button>

            {/* PATH 2: SHOES MAFIA */}
            <button
              onClick={() => handleSelectStore('shoes')}
              className="group relative overflow-hidden border border-[#1E1E1E] bg-[#141414] hover:border-[#1a8f7a] hover:bg-[#101716] p-6 text-left transition-all duration-300 shadow-xl cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-[#1a8f7a]/20 border border-[#1a8f7a]/40 flex items-center justify-center text-[#1a8f7a] group-hover:scale-105 transition-transform">
                  <Footprints size={22} />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#1a8f7a] text-white">
                  Footwear Portal
                </span>
              </div>

              <h3 className="type-heading-md text-[#F4F4F4] mb-2 group-hover:text-[#1a8f7a] transition-colors">
                SHOES MAFIA
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed mb-6">
                High-Street Sneaker Line: Chunky Street Runners, Sport Trainers & Court High-Tops.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E] text-xs font-semibold text-[#F4F4F4]">
                <span className="text-[#888888]">Enter Footwear Line</span>
                <span className="flex items-center gap-1.5 text-[#1a8f7a] group-hover:translate-x-1 transition-transform">
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-[#666666]">
            Easily toggle between Kapda and Shoes anytime from the top bar
          </div>
        </div>
      </div>

      {/* 2. 3D FLYING SNEAKER UGC LAUNCH ANIMATION */}
      {phase === 'shoe-launch-3d' && (
        <div className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden bg-black/95 text-[#F4F4F4] pointer-events-none">
          <div className="absolute h-[500px] w-[500px] rounded-full border border-teal-500/40 animate-shockwave pointer-events-none" />
          <div className="absolute h-[300px] w-[300px] rounded-full bg-teal-500/20 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative w-[320px] sm:w-[500px] md:w-[620px] aspect-[16/10] flex items-center justify-center animate-shoe-fly-camera">
              <img
                src="/media/flying-sneaker-3d.jpg"
                alt="3D Flying Sneaker"
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(26,143,122,0.7)] filter contrast-105"
              />
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/80 border border-teal-500/40 text-xs text-teal-300 font-semibold tracking-wider uppercase">
                <Sparkles size={12} className="text-teal-300" />
                <span>Footwear Line Activated</span>
              </div>
              <h2 className="type-heading-xl text-white mt-1">
                SHOES <span className="text-teal-400">MAFIA</span>
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* 3. LUXURY TEMPERED GLASS SLIDING DOORS */}
      <div
        className={`absolute inset-0 z-20 flex overflow-hidden pointer-events-none transition-opacity duration-300 ${
          isShutterUp ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Glass Door */}
        <div
          className={`relative w-1/2 h-full bg-[#0a0a0a]/80 backdrop-blur-md border-r border-white/20 shadow-2xl flex items-center justify-end pr-8 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isGlassOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <div className="w-1.5 h-48 rounded-full bg-gradient-to-b from-[#777] via-[#f0f0f0] to-[#555] shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/40" />
        </div>

        {/* Right Glass Door */}
        <div
          className={`relative w-1/2 h-full bg-[#0a0a0a]/80 backdrop-blur-md border-l border-white/20 shadow-2xl flex items-center justify-start pl-8 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isGlassOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent pointer-events-none" />
          <div className="w-1.5 h-48 rounded-full bg-gradient-to-b from-[#777] via-[#f0f0f0] to-[#555] shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/40" />
        </div>
      </div>

      {/* 4. CLEAN GRAFFITI SHUTTER */}
      <div
        className="absolute inset-0 z-30 overflow-hidden bg-[#050505] transition-transform duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
        style={{
          transform: isShutterUp ? 'translateY(-101%)' : 'translateY(0%)'
        }}
      >
        <div className="relative w-full h-full bg-[#050505] flex items-center justify-center">
          <img
            src="/media/kapda-mafia-storefront-hero.jpg"
            alt="Kapda Mafia Flagship Shutter"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 shutter-metal-grooves pointer-events-none opacity-20 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}
