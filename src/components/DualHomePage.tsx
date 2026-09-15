'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, MapPin, Package, MessageCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import NewDropSection from '@/components/NewDropSection';
import BrandStory from '@/components/BrandStory';
import FabricStory from '@/components/FabricStory';
import LookbookSection from '@/components/LookbookSection';
import LimitedDropBanner from '@/components/LimitedDropBanner';
import CategoryGrid from '@/components/CategoryGrid';
import SeenInMotion from '@/components/SeenInMotion';
import ShoesMafiaView from '@/components/ShoesMafiaView';
import InstagramLiveFeed from '@/components/InstagramLiveFeed';
import { useWorld } from '@/context/WorldContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Product, Lookbook } from '@/types/ecommerce';

interface DualHomePageProps {
  clothingProducts: Product[];
  shoeProducts: Product[];
  lookbooks: Lookbook[];
}

export default function DualHomePage({
  clothingProducts,
  shoeProducts,
  lookbooks
}: DualHomePageProps) {
  const { world } = useWorld();
  const scrollRef = useScrollReveal();

  // If in SHOES world, render the Bunnyboss Shoes Mafia storefront
  if (world === 'shoes') {
    return <ShoesMafiaView products={shoeProducts} />;
  }

  // Otherwise render the Kapda Mafia streetwear digital flagship
  return (
    <div ref={scrollRef} className="bg-[#080808]">
      <Hero />
      
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <NewDropSection products={clothingProducts} />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <SeenInMotion />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <LimitedDropBanner />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <CategoryGrid />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <BrandStory />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <LookbookSection lookbooks={lookbooks} />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <FabricStory />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <InstagramLiveFeed />
      </div>

      {/* Drape Lab CTA Section */}
      <section className="border-b border-[#1E1E1E] bg-[#080808] py-20 text-[#F4F4F4] sm:py-28 reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-7">
            <div className="mb-3 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
              SILHOUETTE ARCHIVE // CALIBRATION LAB
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-black leading-[0.9] tracking-[-0.05em] uppercase sm:text-6xl text-[#F4F4F4]">
              Proportional<br />
              <span className="text-[#666666]">Drape Lab.</span>
            </h2>
            <p className="mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-[#666666] font-mono">
              Calibrated for heavyweight 440 GSM streetwear silhouettes. Input height, mass, and volumetric bias to eliminate sizing guesswork.
            </p>
            <Link 
              href="/ai-fit" 
              className="mt-8 inline-flex items-center gap-3 border border-[#1E1E1E] bg-[#FFFFFF] text-[#080808] px-6 py-3.5 text-xs font-mono font-black tracking-widest uppercase transition-colors hover:bg-[#F4F4F4]"
            >
              <span>ENTER DRAPE LAB</span> <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-px bg-[#1E1E1E] border border-[#1E1E1E] text-center font-mono lg:col-span-5">
            <div className="bg-[#111111] px-2 sm:px-3 py-5 sm:py-7">
              <div className="text-3xl sm:text-4xl font-bold text-[#F4F4F4]">L</div>
              <div className="mt-2 text-[10px] tracking-widest text-[#666666] uppercase">ARCHIVE SIZE</div>
            </div>
            <div className="bg-[#111111] px-2 sm:px-3 py-5 sm:py-7">
              <div className="text-3xl sm:text-4xl font-bold text-[#7D0A0A]">94%</div>
              <div className="mt-2 text-[10px] tracking-widest text-[#666666] uppercase">CONFIDENCE</div>
            </div>
            <div className="bg-[#111111] px-2 sm:px-3 py-5 sm:py-7">
              <div className="text-3xl sm:text-4xl font-bold text-[#F4F4F4]">440</div>
              <div className="mt-2 text-[10px] tracking-widest text-[#666666] uppercase">DRAPE GSM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Branded Trust Specification Bar — Industrial Coordinates & Origin */}
      <section className="border-b border-[#1E1E1E] bg-[#080808] py-8 text-[#F4F4F4]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-5 text-xs tracking-wider text-[#888888] uppercase font-mono sm:grid-cols-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-[#7D0A0A] shrink-0" />
            <span className="text-[#F4F4F4]">440 GSM Lab-Tested Cotton</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-[#7D0A0A] shrink-0" />
            <span className="text-[#F4F4F4]">NIT-5 Faridabad Origin</span>
          </div>
          <div className="flex items-center gap-3">
            <Package size={16} className="text-[#7D0A0A] shrink-0" />
            <span className="text-[#F4F4F4]">250-Unit Limited Runs</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle size={16} className="text-[#7D0A0A] shrink-0" />
            <span className="text-[#F4F4F4]">Direct WhatsApp Concierge</span>
          </div>
        </div>
      </section>
    </div>
  );
}
