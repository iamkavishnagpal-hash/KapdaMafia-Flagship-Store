'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Truck, RotateCcw, ArrowRight, Award } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Award,
    title: '280–440 GSM FABRICS',
    subtitle: 'Heavy cotton and rigid denim',
    desc: 'Clear fabric weights and fit details are listed on every product page.'
  },
  {
    icon: Truck,
    title: 'TRACKED DISPATCH',
    subtitle: 'Pan-India delivery',
    desc: 'Order updates and tracking are available once your parcel leaves the store.'
  },
  {
    icon: RotateCcw,
    title: '7-DAY SIZE EXCHANGE',
    subtitle: 'Easy fit support',
    desc: 'Need a different size? Start an exchange from your order page.'
  }
];

export default function BrandProofSection() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 sm:py-20 text-[#F4F4F4]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. BRAND STORY & FLAGSHIP ORIGIN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-20 border-b border-[#1E1E1E]">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[10px] text-[#A09D94] uppercase tracking-widest">
              <MapPin size={12} className="text-[#7D0A0A]" />
              <span>NIT-5, FARIDABAD</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] text-[#F4F4F4] leading-[0.95] font-[var(--font-display)]">
              Made in Faridabad.<br />
              <span className="text-[#888888]">Built to be worn.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed max-w-xl">
              Kapda Mafia is a menswear label from NIT-5, Faridabad. We make heavyweight everyday pieces with direct product details, useful fit information, and simple service.
            </p>

            <div className="grid grid-cols-3 gap-px bg-[#1E1E1E] border border-[#1E1E1E] max-w-lg text-center">
              <div className="bg-[#111111] p-4">
                <div className="text-xl sm:text-2xl font-bold text-white">NIT-5</div>
                <div className="text-xs uppercase tracking-wider text-[#888888] mt-1">Store location</div>
              </div>
              <div className="bg-[#111111] p-4">
                <div className="text-xl sm:text-2xl font-bold text-white">440 GSM</div>
                <div className="text-xs uppercase tracking-wider text-[#888888] mt-1">Fabric range</div>
              </div>
              <div className="bg-[#111111] p-4">
                <div className="text-xl sm:text-2xl font-bold text-white">7 DAYS</div>
                <div className="text-xs uppercase tracking-wider text-[#888888] mt-1">Size exchange</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/store"
                className="px-6 py-3.5 bg-white hover:bg-[#F4F4F4] text-black text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
              >
                <span>VISIT FLAGSHIP STORE</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-[#111111] border border-[#1E1E1E] overflow-hidden group shadow-2xl">
              <Image
                src="/media/hero-editorial-model.jpg"
                alt="Kapda Mafia Streetwear Flagship Model"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md border border-[#222222] px-4 py-2 text-xs flex justify-between items-center text-[#C8C3B8]">
                <span>KAPDA MAFIA · NIT-5</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. THREE CORE TRUST PILLARS */}
        <div className="py-16 border-b border-[#1E1E1E]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E1E1E] border border-[#1E1E1E]">
            {TRUST_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="bg-[#111111] p-6 sm:p-8 hover:bg-[#141414] transition-colors">
                  <div className="w-10 h-10 bg-white/5 border border-[#222222] flex items-center justify-center text-[#7D0A0A] mb-5">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs text-[#7D0A0A] font-bold uppercase tracking-wider mb-2">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
