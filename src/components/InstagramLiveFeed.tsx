'use client';

import React, { useState } from 'react';
import { Play, Eye, Heart, MessageCircle, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { useWorld } from '@/context/WorldContext';
import { InstagramIcon } from './InstagramIcon';

export interface ReelData {
  id: string;
  handle: string;
  profileUrl: string;
  videoSrc?: string;
  poster: string;
  views: string;
  likes: string;
  caption: string;
  tag: string;
  isLatest: boolean;
  storeWorld: 'clothing' | 'shoes';
}

const LIVE_REELS: ReelData[] = [
  {
    id: 'reel-km-1',
    handle: '@kapdamafia.store',
    profileUrl: 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly',
    poster: '/media/campaign-after-dark.png',
    views: '142K',
    likes: '18.4K',
    caption: 'DROP 09 LIVE: Heavyweight 400 GSM Acid wash & Selvedge barrel fit jeans on the street 🔥',
    tag: '⚡ LATEST LIVE REEL',
    isLatest: true,
    storeWorld: 'clothing'
  },
  {
    id: 'reel-sm-1',
    handle: '@shoesmafia.store',
    profileUrl: 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA==',
    poster: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
    views: '98K',
    likes: '12.9K',
    caption: 'Model 1239 High-Street Sneaker unboxing & on-feet review! Sizes 7–10 now in stock 👟',
    tag: '⚡ LATEST LIVE REEL',
    isLatest: true,
    storeWorld: 'shoes'
  },
  {
    id: 'reel-km-2',
    handle: '@kapdamafia.store',
    profileUrl: 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly',
    poster: '/media/product-cargo.png',
    views: '86K',
    likes: '9.2K',
    caption: 'Tactical Baggy Cargos engineered for effortless drape and high-mobility streetwear styling.',
    tag: 'TRENDING FIT',
    isLatest: false,
    storeWorld: 'clothing'
  },
  {
    id: 'reel-sm-2',
    handle: '@shoesmafia.store',
    profileUrl: 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA==',
    poster: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788695961_IMG_2627.PNG',
    views: '115K',
    likes: '14.8K',
    caption: 'Model 24 Court High-Top: Real leather texture and vintage basketball sole test 🏀',
    tag: 'COURT EDITION',
    isLatest: false,
    storeWorld: 'shoes'
  }
];

export default function InstagramLiveFeed() {
  const { world } = useWorld();
  const [activeTab, setActiveTab] = useState<'ALL' | 'KAPDA' | 'SHOES'>('ALL');
  const [activeReelModal, setActiveReelModal] = useState<ReelData | null>(null);

  const filteredReels = LIVE_REELS.filter(reel => {
    if (activeTab === 'ALL') {
      // Prioritize current world's reel first
      return true;
    }
    if (activeTab === 'KAPDA') return reel.storeWorld === 'clothing';
    if (activeTab === 'SHOES') return reel.storeWorld === 'shoes';
    return true;
  }).sort((a, b) => {
    // If user is currently browsing shoes, prioritize shoes reels on default
    if (world === 'shoes') {
      if (a.storeWorld === 'shoes' && b.storeWorld !== 'shoes') return -1;
      if (b.storeWorld === 'shoes' && a.storeWorld !== 'shoes') return 1;
    }
    return b.isLatest ? 1 : -1;
  });

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] border-t border-b border-white/10 py-16 sm:py-24 text-[#EEEAE1] font-mono">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#E1306C]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-gradient-to-l from-[#833AB4]/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F77737]/20 border border-[#E1306C]/40 text-[#E1306C] text-[9px] tracking-[0.25em] font-bold uppercase mb-3">
              <InstagramIcon size={12} className="text-[#E1306C] animate-pulse" />
              <span>LIVE INSTAGRAM RADAR · REAL-TIME REELS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              SEEN ON <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">INSTAGRAM</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#8C8C86] max-w-xl">
              Always tracked live: watch the latest reels, outfit styling, and unboxings directly from the official handles.
            </p>
          </div>

          {/* Social Links & Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/15 text-[10px]">
              {(['ALL', 'KAPDA', 'SHOES'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white shadow-lg shadow-[#E1306C]/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'ALL' ? 'ALL REELS' : tab === 'KAPDA' ? '@KAPDAMAFIA' : '@SHOESMAFIA'}
                </button>
              ))}
            </div>

            <a
              href={world === 'shoes' ? 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA==' : 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-white shadow-lg shadow-[#E1306C]/30 hover:opacity-90 hover:scale-105 transition-all cursor-pointer"
            >
              <InstagramIcon size={14} />
              <span>FOLLOW ON INSTA</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Both Handles Direct Info Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          
          {/* Handle 1: Kapda Mafia */}
          <a
            href="https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#121212] hover:border-[#E1306C]/50 hover:bg-[#181214] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0e0e0e]">
                  <InstagramIcon size={22} className="text-[#FD1D1D]" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">kapdamafia.store</span>
                  <CheckCircle2 size={13} className="text-sky-400" />
                </div>
                <span className="text-[10px] text-gray-400">Menswear Streetwear & Uniforms Flagship</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#E1306C] group-hover:translate-x-1 transition-transform">
              <span>VISIT PROFILE</span>
              <ExternalLink size={13} />
            </div>
          </a>

          {/* Handle 2: Shoes Mafia */}
          <a
            href="https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA=="
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#121212] hover:border-[#009688]/50 hover:bg-[#101817] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#009688] via-[#00b4d8] to-[#833AB4] p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0e0e0e]">
                  <InstagramIcon size={22} className="text-[#00b4d8]" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">shoesmafia.store</span>
                  <CheckCircle2 size={13} className="text-sky-400" />
                </div>
                <span className="text-[10px] text-gray-400">Exclusive Sneaker Vault & Chunky Runners</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#009688] group-hover:translate-x-1 transition-transform">
              <span>VISIT PROFILE</span>
              <ExternalLink size={13} />
            </div>
          </a>

        </div>

        {/* 9:16 Vertical Instagram Reels Grid (Gen-Z TikTok/Reels Layout) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReelModal(reel)}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 bg-[#141414] shadow-2xl cursor-pointer hover:border-[#E1306C]/70 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Background Poster Image */}
              <img
                src={reel.poster}
                alt={reel.caption}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Top Bar with Live Tag */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase text-white shadow-md ${
                  reel.isLatest
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 animate-pulse'
                    : 'bg-black/60 backdrop-blur-md border border-white/20'
                }`}>
                  {reel.tag}
                </span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white group-hover:bg-[#E1306C] transition-colors">
                  <Play size={12} fill="currentColor" />
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              </div>

              {/* Bottom Details with Gradient Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between text-[9px] text-gray-300 font-bold mb-1.5">
                  <span className="text-[#FD1D1D]">{reel.handle}</span>
                  <span className="flex items-center gap-1">
                    <Eye size={10} /> {reel.views}
                  </span>
                </div>

                <p className="text-[10px] text-gray-200 line-clamp-2 leading-relaxed mb-3">
                  {reel.caption}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px]">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Heart size={10} className="text-rose-500 fill-rose-500" /> {reel.likes}
                  </span>
                  <a
                    href={reel.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#E1306C] hover:text-white flex items-center gap-1 font-bold underline underline-offset-2"
                  >
                    WATCH ON INSTA →
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Physical Store & Owner Contact Quick Connect Banner */}
        <div className="mt-12 rounded-3xl border border-white/15 bg-gradient-to-r from-[#171113] via-[#121212] to-[#0d1615] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2">
              <div className="text-[9px] font-bold tracking-[0.25em] text-[#8F1118] uppercase">
                DIRECT BRAND VAULT & STORE DETAILS
              </div>
              <h3 className="text-xl sm:text-3xl font-black uppercase text-white tracking-tight">
                KAPDA MAFIA & SHOES MAFIA FLAGSHIP
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                Visit the physical store in Faridabad NIT-5 or order online for direct dispatch across India. Direct owner assistance and WhatsApp concierge available 24/7.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-300 font-mono">
                <a 
                  href="tel:08375000819"
                  className="flex items-center gap-1.5 text-white font-bold hover:text-[#8F1118] transition-colors"
                >
                  <Phone size={14} className="text-[#8F1118]" /> 083750 00819
                </a>
                <span className="text-white/20">|</span>
                <a
                  href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwigr4D5oOyWAxUAAAAAHQAAAAAQBQ..i&rlz=1C1PNFE_enIN1090IN1091&fvr=1&pvq=Cg0vZy8xMXl6ZDFuOW04IhEKC2thcGRhIG1hZmlhEAIYAw&lqi=CgtrYXBkYSBtYWZpYUjozOjA-b2AgAhaHRAAEAEYABgBIgtrYXBkYSBtYWZpYSoGCAIQABABkgEOY2xvdGhpbmdfc3RvcmU&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cdd1ee5a5bafd:0xc177aa65e376a724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MapPin size={14} className="text-[#009688]" /> NIT-5, Faridabad, Haryana
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#E1306C]/25 hover:opacity-90 transition-all text-center"
              >
                <InstagramIcon size={16} /> OPEN @KAPDAMAFIA.STORE
              </a>

              <a
                href="https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-[#009688] hover:bg-[#00796b] text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#009688]/25 transition-all text-center"
              >
                <InstagramIcon size={16} /> OPEN @SHOESMAFIA.STORE
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Reel Preview Modal */}
      {activeReelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in font-mono">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-[#121212] overflow-hidden p-6 shadow-2xl text-white">
            <button
              onClick={() => setActiveReelModal(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-gray-300 hover:text-white"
            >
              ✕
            </button>

            <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden bg-black mb-4">
              <img
                src={activeReelModal.poster}
                alt={activeReelModal.caption}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <a
                  href={activeReelModal.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-bold uppercase tracking-wider shadow-2xl hover:scale-105 transition-transform"
                >
                  <Play size={16} fill="currentColor" /> Play On Instagram
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#FD1D1D]">{activeReelModal.handle}</span>
                <span className="text-gray-400">{activeReelModal.views} Views</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {activeReelModal.caption}
              </p>
              <a
                href={activeReelModal.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink size={14} /> Open Instagram Post
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
