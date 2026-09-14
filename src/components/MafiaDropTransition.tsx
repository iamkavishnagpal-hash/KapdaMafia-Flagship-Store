'use client';

import { useEffect, useState } from 'react';

export default function MafiaDropTransition() {
  // Sequence:
  // 1. shutter-closed: user sees the exact high-res shop shutter with neon ambient glow
  // 2. shutter-opening: metal shutter smoothly rolls up with mechanical tension
  // 3. glass-opening: premium double sliding glass doors glide open with luxury reflections
  // 4. welcome-bouncing: clothing quote + bouncing WELCOME TO KAPDA MAFIA
  // 5. completed: fades out into the flagship storefront
  const [phase, setPhase] = useState<
    'shutter-closed' | 'shutter-opening' | 'glass-opening' | 'welcome-bouncing' | 'completed'
  >(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('km_shutter_seen')) {
      return 'completed';
    }
    return 'shutter-closed';
  });
  const [removed, setRemoved] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('km_shutter_seen')) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (sessionStorage.getItem('km_shutter_seen')) {
      setRemoved(true);
      return;
    }

    // Step 1: Initial view of the authentic graffiti storefront shutter (1.0s)
    const t1 = window.setTimeout(() => {
      setPhase('shutter-opening');
    }, 1000);

    // Step 2: Shutter completes roll-up, double glass doors start sliding open (2.0s)
    const t2 = window.setTimeout(() => {
      setPhase('glass-opening');
    }, 2000);

    // Step 3: Glass doors fully apart, quote + Welcome Bouncing screen pops in (3.0s)
    const t3 = window.setTimeout(() => {
      setPhase('welcome-bouncing');
    }, 3000);

    // Step 4: Fluidly hand over to the luxury flagship experience (4.2s)
    const t4 = window.setTimeout(() => {
      setPhase('completed');
      setRemoved(true);
      try {
        sessionStorage.setItem('km_shutter_seen', 'true');
      } catch {
        // ignore
      }
    }, 4200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, []);

  if (removed) return null;

  const isShutterUp = phase !== 'shutter-closed';
  const isGlassOpen = phase === 'glass-opening' || phase === 'welcome-bouncing' || phase === 'completed';

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${
        phase === 'completed' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* 1. BACKSTAGE REVEAL: Quote & Bouncing WELCOME TO KAPDA MAFIA */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#060606] text-center px-4 font-mono">
        {/* Subtle architectural ambient spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(143,17,24,0.18)_0%,rgba(6,6,6,0.95)_70%)] pointer-events-none" />

        <div className="relative z-20 max-w-xl flex flex-col items-center space-y-6">
          {/* Streetwear Clothing Philosophy Quote */}
          <div
            className={`transition-all duration-700 ${
              phase === 'welcome-bouncing' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <div className="inline-flex items-center gap-2 border border-[#8F1118]/60 bg-[#8F1118]/15 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#C8C3B8] uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#8F1118] animate-ping" />
              &quot;CLOTHES TELL BETTER STORIES&quot;
            </div>
          </div>

          {/* Bouncing WELCOME TO KAPDA MAFIA */}
          <div
            className={`transition-all duration-700 ${
              phase === 'welcome-bouncing' ? 'animate-welcome-bounce opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.05em] text-[#F3F0E8] leading-[0.9] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
              WELCOME TO<br />
              <span className="text-[#8F1118] inline-block tracking-[0.04em] mt-2 font-[var(--font-display)]">
                KAPDA MAFIA
              </span>
            </h2>
            <div className="mt-4 text-[10px] sm:text-xs text-[#8C8C86] tracking-[0.35em] uppercase font-bold">
              PREMIUM STREETWEAR • DIGITAL FLAGSHIP OPEN
            </div>
          </div>
        </div>
      </div>

      {/* 2. LUXURY TEMPERED GLASS SLIDING DOORS */}
      <div
        className={`absolute inset-0 z-20 flex overflow-hidden transition-opacity duration-700 ${
          isShutterUp ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Glass Door */}
        <div
          className={`relative w-1/2 h-full bg-[#0a0a0a]/70 backdrop-blur-[3px] border-r border-white/20 shadow-2xl flex items-center justify-end pr-8 transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isGlassOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Glass glare line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          {/* Luxury Stainless Steel Door Handle */}
          <div className="w-1.5 h-48 rounded-full bg-gradient-to-b from-[#888] via-[#eee] to-[#666] shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/40" />
          <div className="absolute bottom-16 right-12 font-mono text-[8px] tracking-[0.3em] text-white/40 uppercase rotate-90 origin-right">
            TEMPERED GLASS / PULL
          </div>
        </div>

        {/* Right Glass Door */}
        <div
          className={`relative w-1/2 h-full bg-[#0a0a0a]/70 backdrop-blur-[3px] border-l border-white/20 shadow-2xl flex items-center justify-start pl-8 transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isGlassOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Glass glare line */}
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent pointer-events-none" />
          {/* Luxury Stainless Steel Door Handle */}
          <div className="w-1.5 h-48 rounded-full bg-gradient-to-b from-[#888] via-[#eee] to-[#666] shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/40" />
          <div className="absolute bottom-16 left-12 font-mono text-[8px] tracking-[0.3em] text-white/40 uppercase -rotate-90 origin-left">
            TEMPERED GLASS / PUSH
          </div>
        </div>
      </div>

      {/* 3. AUTHENTIC FRONT SHUTTER (Using the Newly Provided User Visual) */}
      <div
        className="absolute inset-0 z-30 overflow-hidden shadow-2xl transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transform: isShutterUp ? 'translateY(-102%)' : 'translateY(0%)'
        }}
      >
        {/* Shutter Top Mechanical Roll Housing */}
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#1c1c1c] via-[#111111] to-[#080808] border-b border-[#333] shadow-lg flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8F1118] shadow-[0_0_8px_#8F1118]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#A5A096] uppercase font-bold">
            KAPDA MAFIA • SHUTTER UNLOCKING
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8F1118] shadow-[0_0_8px_#8F1118]" />
          </div>
        </div>

        {/* Shutter Main Canvas with User's High-End Artwork */}
        <div className="relative w-full h-full bg-[#080808] flex items-center justify-center">
          <img
            src="/media/kapda-mafia-storefront-hero.jpg"
            alt="Kapda Mafia Premium Shutter Storefront"
            className="w-full h-full object-cover object-center"
          />

          {/* Realistic Corrugated Metal Shutter Grooves */}
          <div className="absolute inset-0 shutter-metal-grooves pointer-events-none opacity-30 mix-blend-overlay" />

          {/* Bottom Heavy Iron Bar */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#050505] to-[#1c1c1c] border-t-2 border-[#333] flex items-center justify-between px-8 shadow-2xl z-40">
            <div className="w-14 h-3 rounded-sm bg-[#333] border border-white/15" />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#B8B4AA] uppercase font-bold">
                [ PULL TO OPEN STORE ]
              </span>
            </div>
            <div className="w-14 h-3 rounded-sm bg-[#333] border border-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
