'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorld } from '@/context/WorldContext';

export default function SpatialGatewayPortal() {
  const router = useRouter();
  const { setWorld } = useWorld();
  
  // Hover expansion state: 'none' | 'apparel' | 'footwear'
  const [hoveredSide, setHoveredSide] = useState<'none' | 'apparel' | 'footwear'>('none');
  const [isExiting, setIsExiting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check session persistence
    const alreadySelected = sessionStorage.getItem('km_portal_selected');
    if (!alreadySelected) {
      setIsActive(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Listen for manual trigger from header ("GATEWAY")
  useEffect(() => {
    const handleReopenGateway = () => {
      setIsActive(true);
      setIsExiting(false);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('km_reopen_gateway', handleReopenGateway);
    return () => window.removeEventListener('km_reopen_gateway', handleReopenGateway);
  }, []);

  const handleSelectPortal = (destination: 'apparel' | 'footwear') => {
    if (isExiting) return;
    setIsExiting(true);

    if (destination === 'apparel') {
      setWorld('clothing');
    } else {
      setWorld('shoes');
    }

    sessionStorage.setItem('km_portal_selected', 'true');

    // Trigger smooth scale & opacity exit (400ms)
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      setIsActive(false);
      setIsExiting(false);
      router.push(destination === 'apparel' ? '/apparel' : '/footwear');
    }, 400);
  };

  if (!mounted || !isActive) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-black select-none font-mono transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'scale-[1.05] opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Spatial Gateway Portal Selection"
    >
      {/* Container: 50/50 horizontal on mobile (<768px), 50/50 vertical with hover-split on desktop (>=768px) */}
      <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
        
        {/* ========================================================================= */}
        {/* LEFT / TOP: 01 // APPAREL — KAPDA MAFIA                                   */}
        {/* ========================================================================= */}
        <section
          onMouseEnter={() => setHoveredSide('apparel')}
          onMouseLeave={() => setHoveredSide('none')}
          onClick={() => handleSelectPortal('apparel')}
          style={{
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={`relative group cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-[#1C1C1C] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#080808] ${
            // Mobile: 50% height
            // Desktop: 50vw by default, 60vw on apparel hover, 40vw on footwear hover
            hoveredSide === 'apparel'
              ? 'md:w-[60vw] h-1/2 md:h-full'
              : hoveredSide === 'footwear'
              ? 'md:w-[40vw] h-1/2 md:h-full'
              : 'md:w-[50vw] h-1/2 md:h-full'
          }`}
        >
          {/* Subtle Silhouette Background Imagery (Draping & Architectural Texture) */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-35 mix-blend-luminosity filter contrast-125"
            style={{ backgroundImage: `url('/media/campaign-after-dark.png')` }}
          />

          {/* Deep charcoal/matte black tonal overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#090909]/80 to-[#0A0A0A]/90 pointer-events-none" />

          {/* Top Architectural Telemetry */}
          <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.25em] text-[#737373] uppercase">
            <span className="font-bold text-[#E5E5E5]">01 // APPAREL</span>
            <span className="hidden sm:inline">PAVILION ALPHA · 440 GSM</span>
          </div>

          {/* Center Brand Identity (Strict Brutalist Luxury) */}
          <div className="relative z-10 space-y-3 sm:space-y-4 my-auto">
            <div className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8F1118] uppercase font-bold">
              HEAVYWEIGHT DRAPE ARCHIVE
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-[#F3F0E8] font-editorial leading-[0.92]">
              KAPDA MAFIA
            </h2>
            
            <p className="text-[11px] sm:text-xs text-[#A3A3A3] tracking-[0.14em] uppercase max-w-sm">
              440 GSM ARCHIVE & DENIM
            </p>
          </div>

          {/* Bottom Action Trigger */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs">
            <span className="text-[10px] tracking-[0.2em] text-[#737373] uppercase">
              DELHI-NCR VAULT
            </span>
            <div className="px-5 py-2.5 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-[#8F1118] group-hover:text-white flex items-center gap-2 shadow-lg">
              <span>[ ENTER ]</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* RIGHT / BOTTOM: 02 // FOOTWEAR — SHOES MAFIA                              */}
        {/* ========================================================================= */}
        <section
          onMouseEnter={() => setHoveredSide('footwear')}
          onMouseLeave={() => setHoveredSide('none')}
          onClick={() => handleSelectPortal('footwear')}
          style={{
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className={`relative group cursor-pointer overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#090D0F] ${
            // Mobile: 50% height
            // Desktop: 50vw by default, 60vw on footwear hover, 40vw on apparel hover
            hoveredSide === 'footwear'
              ? 'md:w-[60vw] h-1/2 md:h-full'
              : hoveredSide === 'apparel'
              ? 'md:w-[40vw] h-1/2 md:h-full'
              : 'md:w-[50vw] h-1/2 md:h-full'
          }`}
        >
          {/* Industrial Steel/Gunmetal Background Imagery (Footwear Tread Visual) */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-30 mix-blend-luminosity filter contrast-125"
            style={{ backgroundImage: `url('/media/flying-sneaker-3d.jpg')` }}
          />

          {/* Industrial gunmetal overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060A0C] via-[#091114]/80 to-[#0C1518]/90 pointer-events-none" />

          {/* Top Architectural Telemetry */}
          <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.25em] text-[#737373] uppercase">
            <span className="font-bold text-[#E5E5E5]">02 // FOOTWEAR</span>
            <span className="hidden sm:inline">PAVILION BETA · DUAL DENSITY</span>
          </div>

          {/* Center Brand Identity (Strict Brutalist Luxury) */}
          <div className="relative z-10 space-y-3 sm:space-y-4 my-auto">
            <div className="text-[10px] sm:text-xs tracking-[0.3em] text-[#00897B] uppercase font-bold">
              KINETIC TREAD ENGINE
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-[#F3F0E8] font-editorial leading-[0.92]">
              SHOES MAFIA
            </h2>
            
            <p className="text-[11px] sm:text-xs text-[#A3A3A3] tracking-[0.14em] uppercase max-w-sm">
              CHUNKY SOLES & HIGH-TOPS
            </p>
          </div>

          {/* Bottom Action Trigger */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs">
            <span className="text-[10px] tracking-[0.2em] text-[#737373] uppercase">
              NIT-5 HUB
            </span>
            <div className="px-5 py-2.5 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-[#00695c] group-hover:text-white flex items-center gap-2 shadow-lg">
              <span>[ ENTER ]</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
