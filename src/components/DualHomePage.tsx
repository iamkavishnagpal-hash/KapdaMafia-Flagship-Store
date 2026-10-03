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
import BundleOffersSection from '@/components/BundleOffersSection';
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
    <div ref={scrollRef} className="bg-[#090909]">
      <Hero />
      
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <NewDropSection products={clothingProducts} />
      </div>

      {/* Gradient transition: dark → light for SeenInMotion */}
      <div className="h-16 sm:h-24 bg-gradient-to-b from-[#080808] to-[#EEEAE1]" />
      
      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <SeenInMotion />
      </div>

      {/* Gradient transition: light → dark */}
      <div className="h-16 sm:h-24 bg-gradient-to-b from-[#EEEAE1] to-[#0D0C0B]" />

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <LimitedDropBanner />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <CategoryGrid />
      </div>

      {/* Tripr & Genrage Merchandising: Streetwear Combo Bundles */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <BundleOffersSection />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <BrandStory />
      </div>

      <div className="reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <LookbookSection lookbooks={lookbooks} />
      </div>

      {/* Gradient transition: dark → light for FabricStory */}
      <div className="h-16 sm:h-24 bg-gradient-to-b from-[#090909] to-[#EEEAE1]" />

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <FabricStory />
      </div>

      {/* Gradient transition: light → dark for Instagram */}
      <div className="h-16 sm:h-24 bg-gradient-to-b from-[#EEEAE1] to-[#0a0a0a]" />

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

      {/* Branded Trust Specification Bar — NOT generic trust icons */}
      <section className="border-b border-white/10 bg-[#111111] py-7 text-[#EEEAE1]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-5 text-xs tracking-wider text-[#C8C3B8] uppercase font-mono sm:grid-cols-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-[#7D0A0A] shrink-0" />
            <span>440 GSM Lab-Tested Cotton</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-[#7D0A0A] shrink-0" />
            <span>NIT-5 Faridabad Origin</span>
          </div>
          <div className="flex items-center gap-3">
            <Package size={16} className="text-[#7D0A0A] shrink-0" />
            <span>250-Unit Limited Runs</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle size={16} className="text-[#7D0A0A] shrink-0" />
            <span>Direct WhatsApp Concierge</span>
          </div>
        </div>
      </section>
    </div>
  );
}
