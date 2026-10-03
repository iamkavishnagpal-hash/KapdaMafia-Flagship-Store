'use client';

import React, { useState } from 'react';
import { ArrowRight, Shirt, Footprints, X, Sparkles } from 'lucide-react';
import { useWorld, StoreWorld } from '@/context/WorldContext';
import { playSubBassThud, playMechanicalClick } from '@/utils/soundEffects';

export default function WorldSelectorModal() {
  const { showWorldSelector, setShowWorldSelector, setWorld, world } = useWorld();
  const [shoeFlying, setShoeFlying] = useState(false);

  if (!showWorldSelector) return null;

  const handleSelectWorld = (selected: StoreWorld) => {
    playMechanicalClick();
    if (selected === 'shoes') {
      playSubBassThud();
      setShoeFlying(true);
      setTimeout(() => {
        setWorld('shoes');
        setShoeFlying(false);
        setShowWorldSelector(false);
      }, 1500);
    } else {
      setWorld(selected);
      setShowWorldSelector(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in font-sans text-[#F4F4F4]">
      <div className="relative w-full max-w-3xl overflow-hidden border border-[#1E1E1E] bg-[#111111]/95 p-6 sm:p-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setShowWorldSelector(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#888888] hover:text-white transition-colors cursor-pointer z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Portal Switcher"
        >
          <X size={20} />
        </button>

        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#7D0A0A]/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#1a8f7a]/15 blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616] border border-[#1E1E1E] text-xs uppercase tracking-wider text-[#C8C3B8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A]" />
            <span>Select Shopping World</span>
          </div>
          <h2 className="type-heading-xl text-[#F4F4F4]">
            Where would you like to shop?
          </h2>
          <p className="text-xs sm:text-sm text-[#888888] max-w-md mx-auto mt-2">
            Browse two distinct universes under one account. You can switch worlds anytime from
            the top bar.
          </p>
        </div>

        {/* The Two Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* PORTAL 1: KAPDA MAFIA */}
          <div
            onClick={() => handleSelectWorld('clothing')}
            className={`group relative overflow-hidden border p-6 cursor-pointer transition-all duration-300 ${
              world === 'clothing'
                ? 'border-[#7D0A0A] bg-[#161213] shadow-xl shadow-[#7D0A0A]/20'
                : 'border-[#1E1E1E] bg-[#141414] hover:border-[#7D0A0A]/60 hover:bg-[#181314]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-[#7D0A0A]/20 border border-[#7D0A0A]/40 flex items-center justify-center text-[#F4F4F4] group-hover:scale-105 transition-transform">
                <Shirt size={22} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#7D0A0A] text-white">
                Flagship Store
              </span>
            </div>

            <h3 className="type-heading-md text-[#F4F4F4] mb-2 group-hover:text-white transition-colors">
              KAPDA MAFIA
            </h3>
            <p className="text-xs text-[#888888] leading-relaxed mb-6">
              Heavyweight 400 GSM Tees, Tactical Baggy Cargos, Acid Wash Denim & Luxury Streetwear.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E] text-xs font-semibold text-[#F4F4F4]">
              <span className="text-[#888888]">Apparel Collection</span>
              <span className="flex items-center gap-1 text-[#F4F4F4] group-hover:translate-x-1 transition-transform">
                Enter World <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* PORTAL 2: SHOES MAFIA */}
          <div
            onClick={() => handleSelectWorld('shoes')}
            className={`group relative overflow-hidden border p-6 cursor-pointer transition-all duration-300 ${
              world === 'shoes'
                ? 'border-[#1a8f7a] bg-[#0e1715] shadow-xl shadow-[#1a8f7a]/20'
                : 'border-[#1E1E1E] bg-[#141414] hover:border-[#1a8f7a]/60 hover:bg-[#111817]'
            }`}
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
              Official Footwear Line: Chunky Street Runners, Sport Trainers & Court High-Tops.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E] text-xs font-semibold text-[#F4F4F4]">
              <span className="text-[#888888]">Footwear Line</span>
              <span className="flex items-center gap-1 text-[#1a8f7a] group-hover:translate-x-1 transition-transform">
                Enter World <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-[#666666]">
          Switch between stores anytime via the top navigation bar
        </div>

        {/* 3D Flying Sneaker Animation on Shoes Selection */}
        {shoeFlying && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/95 overflow-hidden">
            <div className="absolute h-80 w-80 rounded-full border border-teal-500/40 animate-shockwave pointer-events-none" />
            <div className="absolute h-56 w-56 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-80 sm:w-96 aspect-[16/10] animate-shoe-fly-camera flex items-center justify-center">
                <img
                  src="/media/flying-sneaker-3d.jpg"
                  alt="3D Flying Sneaker"
                  className="w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(26,143,122,0.85)]"
                />
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <Sparkles size={12} /> <span>Entering Shoes Mafia Vault...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
