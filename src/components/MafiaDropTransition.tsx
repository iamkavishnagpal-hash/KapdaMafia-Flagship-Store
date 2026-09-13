'use client';

import { useEffect, useState } from 'react';

export default function MafiaDropTransition() {
  const [phase, setPhase] = useState<'shutter-closed' | 'shutter-opening' | 'welcome-bouncing' | 'completed'>('shutter-closed');
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Step 1: User sees the authentic painted metal shop shutter (1.2s)
    const openTimer = window.setTimeout(() => {
      setPhase('shutter-opening');
    }, 1200);

    // Step 2: Shutter rolls up, revealing the clothing quote and bouncing Welcome screen
    const bounceTimer = window.setTimeout(() => {
      setPhase('welcome-bouncing');
    }, 2400);

    // Step 3: Transition finishes smoothly and hands over to the storefront
    const finishTimer = window.setTimeout(() => {
      setPhase('completed');
      setRemoved(true);
    }, 4200);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(bounceTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ${
        phase === 'completed' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Background Reveal Container with Clothing Quote & Bouncing Welcome */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#090909] text-center px-4 font-mono">
        <div className="max-w-xl flex flex-col items-center space-y-5">
          {/* Streetwear Clothing Quote */}
          <div className="inline-flex items-center gap-2 border border-[#8F1118]/60 bg-[#8F1118]/10 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#C8C3B8] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#8F1118] animate-ping" />
            &quot;FASHION FADES, BUT STREETWEAR ATTITUDE REMAINS ETERNAL&quot;
          </div>

          {/* Bouncing Welcome to KAPDA MAFIA */}
          <div
            className={`transition-all duration-700 ${
              phase === 'welcome-bouncing' || phase === 'shutter-opening'
                ? 'animate-welcome-bounce opacity-100'
                : 'opacity-0 scale-90'
            }`}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.05em] text-[#F3F0E8] leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              WELCOME TO<br />
              <span className="text-[#8F1118] inline-block tracking-[0.05em] mt-2">
                KAPDA MAFIA
              </span>
            </h2>
            <div className="mt-4 text-[10px] sm:text-xs text-[#77746E] tracking-[0.35em] uppercase font-bold">
              EST. 2026 • DIGITAL FLAGSHIP STORE OPEN
            </div>
          </div>
        </div>
      </div>

      {/* The Authentic Shop Rolling Shutter with Exact User Artwork */}
      <div
        className="absolute inset-0 z-20 overflow-hidden shadow-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transform:
            phase === 'shutter-opening' || phase === 'welcome-bouncing' || phase === 'completed'
              ? 'translateY(-102%)'
              : 'translateY(0%)'
        }}
      >
        {/* Shutter Top Roll Box / Mechanical Housing */}
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#1a1a1a] via-[#111111] to-[#0a0a0a] border-b-2 border-[#333] shadow-lg flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#333] border border-white/20" />
            <span className="w-3 h-3 rounded-full bg-[#333] border border-white/20" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#888] uppercase font-bold">
            KAPDA MAFIA SHUTTER SYSTEM • ROLLING OPEN
          </span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#333] border border-white/20" />
            <span className="w-3 h-3 rounded-full bg-[#333] border border-white/20" />
          </div>
        </div>

        {/* Shutter Main Body with Exact Uploaded Graffiti Artwork */}
        <div className="relative w-full h-full bg-[#141414] flex items-center justify-center">
          <img
            src="/media/kapda-mafia-shutter.jpg"
            alt="Kapda Mafia Authentic Shop Shutter Art"
            className="w-full h-full object-cover object-center"
          />

          {/* Shutter Metal Horizontal Grooves Overlay for Photorealistic Depth */}
          <div className="absolute inset-0 shutter-metal-grooves pointer-events-none opacity-40 mix-blend-overlay" />

          {/* Shutter Bottom Handle Bar with Padlocks */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-[#222222] border-t-2 border-[#444] flex items-center justify-between px-8 shadow-2xl z-30">
            <div className="w-14 h-3 rounded-sm bg-[#444] border border-white/20 shadow-inner" />
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#B8B4AA] uppercase font-bold">
                [ UNLOCKING SHUTTER ]
              </span>
            </div>
            <div className="w-14 h-3 rounded-sm bg-[#444] border border-white/20 shadow-inner" />
          </div>
        </div>
      </div>
    </div>
  );
}
