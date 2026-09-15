'use client';

import React, { useState } from 'react';
import { ArrowRight, Shirt, Footprints, Zap, X, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-2xl animate-fade-in font-mono text-[#EEEAE1]">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-[#0d0d0d] p-6 sm:p-10 shadow-2xl shadow-black/80">
        
        {/* Close Button */}
        <button
          onClick={() => setShowWorldSelector(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-20"
          aria-label="Close Portal Switcher"
        >
          <X size={18} />
        </button>

        {/* Background glow */}
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#8F1118]/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#00695c]/20 blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] tracking-[0.25em] text-[#C8C3B8] uppercase mb-3">
            <Zap size={11} className="text-amber-400" /> SELECT YOUR SHOPPING WORLD
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-[0.15em] text-[#EEEAE1] uppercase">
            WHERE DO YOU WANT TO SHOP?
          </h2>
          <p className="text-xs tracking-wider text-[#77746E] max-w-lg mx-auto mt-2">
            Just like Swiggy & Instamart, browse two distinct universes in one account. Switch anytime from the top bar!
          </p>
        </div>

        {/* The Two Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* PORTAL 1: KAPDA MAFIA */}
          <div
            onClick={() => handleSelectWorld('clothing')}
            className={`group relative overflow-hidden rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
              world === 'clothing'
                ? 'border-[#8F1118] bg-gradient-to-b from-[#1c1214] to-[#121212] shadow-xl shadow-[#8F1118]/20'
                : 'border-white/15 bg-[#141414] hover:border-[#8F1118]/60 hover:bg-[#181516]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#8F1118]/20 border border-[#8F1118]/40 flex items-center justify-center text-[#8F1118] group-hover:scale-110 transition-transform">
                <Shirt size={24} />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-[#8F1118] text-white">
                FLAGSHIP STORE
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white mb-2 group-hover:text-[#8F1118] transition-colors">
              KAPDA MAFIA
            </h3>
            <p className="text-xs text-[#8C8C86] leading-relaxed mb-6">
              Heavyweight 400 GSM Tees, Tactical Baggy Cargos, Acid Wash Denim, Boxy Cuts & Luxury Gen-Z Menswear.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-[#EEEAE1]">
              <span className="text-[10px] text-[#C8C3B8] tracking-widest uppercase">12+ UNIFORM PIECES</span>
              <span className="flex items-center gap-1 text-[#8F1118] group-hover:translate-x-1 transition-transform">
                ENTER WORLD <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* PORTAL 2: SHOES MAFIA (Bunnyboss Style) */}
          <div
            onClick={() => handleSelectWorld('shoes')}
            className={`group relative overflow-hidden rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
              world === 'shoes'
                ? 'border-[#00695c] bg-gradient-to-b from-[#0f1f1d] to-[#121212] shadow-xl shadow-[#00695c]/20'
                : 'border-white/15 bg-[#141414] hover:border-[#00695c]/60 hover:bg-[#121a19]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#00695c]/20 border border-[#00695c]/40 flex items-center justify-center text-[#00695c] group-hover:scale-110 transition-transform">
                <Footprints size={24} />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-[#00695c] text-white">
                KAPDA MAFIA FOOTWEAR
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white mb-2 group-hover:text-[#00695c] transition-colors">
              SHOES MAFIA
            </h3>
            <p className="text-xs text-[#8C8C86] leading-relaxed mb-6">
              Official Kapda Mafia Shoes Collection: Runners, Chunky Sneakers, Sport Shoes & Court High-Tops starting at ₹499.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-[#EEEAE1]">
              <span className="text-[10px] text-[#C8C3B8] tracking-widest uppercase">SIZES 6 — 10 IN STOCK</span>
              <span className="flex items-center gap-1 text-[#00695c] group-hover:translate-x-1 transition-transform">
                ENTER WORLD <ArrowRight size={14} />
              </span>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] tracking-[0.2em] text-[#77746E] uppercase">
          Switch anytime via the portal switcher at the top of your screen
        </div>

        {/* 3D UGC Flying Shoe Launch Animation inside World Selector Modal */}
        {shoeFlying && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/95 overflow-hidden">
            <div className="absolute h-80 w-80 rounded-full border border-teal-500/50 animate-shockwave pointer-events-none" />
            <div className="absolute h-56 w-56 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-80 sm:w-96 aspect-[16/10] animate-shoe-fly-camera flex items-center justify-center">
                <img
                  src="/media/flying-sneaker-3d.jpg"
                  alt="3D Flying Sneaker"
                  className="w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(0,105,92,0.85)]"
                />
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-400 text-teal-300 font-mono text-xs font-bold uppercase tracking-widest animate-pulse">
                <Sparkles size={12} /> ENTERING SHOES MAFIA VAULT...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
