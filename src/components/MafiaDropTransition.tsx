'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Shirt, Footprints, Zap } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';

export default function MafiaDropTransition() {
  // Startup Sequence:
  // 1. shutter-closed: 100% clean authentic graffiti shutter artwork (ZERO text, NO headers).
  // 2. shutter-opening: metal shutter smoothly rolls up with mechanical tension.
  // 3. glass-opening: luxury tempered sliding glass doors glide open (left & right).
  // 4. store-selection: "WHERE DO YOU WANT TO SHOP?" portal choice (KAPDA MAFIA vs SHOES MAFIA).
  // 5. completed: fades out into the chosen store world.
  const [phase, setPhase] = useState<
    'shutter-closed' | 'shutter-opening' | 'glass-opening' | 'store-selection' | 'completed'
  >('shutter-closed');
  const [removed, setRemoved] = useState(false);
  const { setWorld } = useWorld();

  useEffect(() => {
    // Step 1: Hold the pure artwork shutter clean for 1.1s
    const t1 = window.setTimeout(() => {
      setPhase('shutter-opening');
    }, 1100);

    // Step 2: Shutter completes roll-up, tempered glass sliding doors start opening (2.3s)
    const t2 = window.setTimeout(() => {
      setPhase('glass-opening');
    }, 2300);

    // Step 3: Glass doors fully parted, reveal store selector portal (3.4s)
    const t3 = window.setTimeout(() => {
      setPhase('store-selection');
    }, 3400);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const handleSelectStore = (selected: StoreWorld) => {
    setWorld(selected);
    setPhase('completed');
    setTimeout(() => {
      setRemoved(true);
    }, 600);
  };

  if (removed) return null;

  const isShutterUp = phase !== 'shutter-closed';
  const isGlassOpen = phase === 'glass-opening' || phase === 'store-selection' || phase === 'completed';

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        phase === 'completed' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={phase === 'completed'}
    >
      {/* 1. STORE WORLD SELECTION PORTAL (Revealed behind glass doors) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505] p-4 font-mono text-[#EEEAE1]">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[#8F1118]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-[#009688]/20 blur-[120px] pointer-events-none" />

        <div
          className={`relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#0d0d0d]/95 p-6 sm:p-10 shadow-2xl transition-all duration-700 ${
            phase === 'store-selection' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest text-[#C8C3B8] uppercase mb-3 font-mono font-bold">
              <Zap size={13} className="text-amber-400" /> SELECT YOUR SHOPPING WORLD
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-wider text-[#EEEAE1] uppercase font-editorial">
              WHERE DO YOU WANT TO SHOP?
            </h2>
            <p className="text-xs sm:text-sm tracking-wider text-[#8C8C86] max-w-lg mx-auto mt-2">
              Browse two distinct universes under one flagship. Switch anytime from the top navigation bar!
            </p>
          </div>

          {/* Store Portals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* PORTAL 1: KAPDA MAFIA */}
            <button
              onClick={() => handleSelectStore('clothing')}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#141414] hover:border-[#8F1118] hover:bg-[#181314] p-6 text-left transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-[#8F1118]/20 border border-[#8F1118]/40 flex items-center justify-center text-[#8F1118] group-hover:scale-110 transition-transform">
                  <Shirt size={24} />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#8F1118] text-white">
                  FLAGSHIP APPAREL
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white mb-2 group-hover:text-[#8F1118] transition-colors">
                KAPDA MAFIA
              </h3>
              <p className="text-xs sm:text-sm text-[#8C8C86] leading-relaxed mb-6">
                Heavyweight 400 GSM Tees, Tactical Baggy Cargos, Acid Wash Denim &amp; Luxury Streetwear Uniforms.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-[#EEEAE1]">
                <span className="text-xs text-[#C8C3B8] tracking-wider uppercase">Shop Apparel Collection</span>
                <span className="flex items-center gap-1.5 text-[#8F1118] group-hover:translate-x-1 transition-transform">
                  Enter <ArrowRight size={14} />
                </span>
              </div>
            </button>

            {/* PORTAL 2: SHOES MAFIA */}
            <button
              onClick={() => handleSelectStore('shoes')}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#141414] hover:border-[#009688] hover:bg-[#111c1a] p-6 text-left transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-[#009688]/20 border border-[#009688]/40 flex items-center justify-center text-[#009688] group-hover:scale-110 transition-transform">
                  <Footprints size={24} />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#009688] text-white">
                  FOOTWEAR COLLECTION
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white mb-2 group-hover:text-[#009688] transition-colors">
                SHOES MAFIA
              </h3>
              <p className="text-xs sm:text-sm text-[#8C8C86] leading-relaxed mb-6">
                Official Footwear Line: Chunky Sneakers, Sport Runners, Court High-Tops &amp; Premium Street Kicks.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-[#EEEAE1]">
                <span className="text-xs text-[#C8C3B8] tracking-wider uppercase">Shop Footwear Line</span>
                <span className="flex items-center gap-1.5 text-[#009688] group-hover:translate-x-1 transition-transform">
                  Enter <ArrowRight size={14} />
                </span>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center text-xs tracking-wider text-[#8C8C86] uppercase font-mono">
            Switch anytime via the portal switcher at the top bar
          </div>
        </div>
      </div>

      {/* 2. LUXURY TEMPERED GLASS SLIDING DOORS */}
      <div
        className={`absolute inset-0 z-20 flex overflow-hidden pointer-events-none transition-opacity duration-700 ${
          isShutterUp ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Glass Door */}
        <div
          className={`relative w-1/2 h-full bg-[#0a0a0a]/75 backdrop-blur-[4px] border-r border-white/20 shadow-2xl flex items-center justify-end pr-8 transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isGlassOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Glass reflection line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          {/* Luxury Stainless Steel Handle */}
          <div className="w-1.5 h-48 rounded-full bg-gradient-to-b from-[#777] via-[#f0f0f0] to-[#555] shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/40" />
        </div>

        {/* Right Glass Door */}
        <div
          className={`relative w-1/2 h-full bg-[#0a0a0a]/75 backdrop-blur-[4px] border-l border-white/20 shadow-2xl flex items-center justify-start pl-8 transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isGlassOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Glass reflection line */}
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent pointer-events-none" />
          {/* Luxury Stainless Steel Handle */}
          <div className="w-1.5 h-48 rounded-full bg-gradient-to-b from-[#777] via-[#f0f0f0] to-[#555] shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/40" />
        </div>
      </div>

      {/* 3. PURE AUTHENTIC SHUTTER: 100% clean graffiti artwork (NO text, NO headers, NO stretch) */}
      <div
        className="absolute inset-0 z-30 overflow-hidden bg-[#050505] transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none"
        style={{
          transform: isShutterUp ? 'translateY(-101%)' : 'translateY(0%)'
        }}
      >
        <div className="relative w-full h-full bg-[#050505] flex items-center justify-center">
          <img
            src="/media/kapda-mafia-storefront-hero.jpg"
            alt="Kapda Mafia Shutter"
            className="w-full h-full object-cover object-center"
          />

          {/* Realistic Corrugated Metal Shutter Grooves overlay */}
          <div className="absolute inset-0 shutter-metal-grooves pointer-events-none opacity-20 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}
