// src/components/DualHomePage.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, MapPin, Package, MessageCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import StoryCategories from '@/components/StoryCategories';
import NewDropSection from '@/components/NewDropSection';
import SpotlightDrop from '@/components/SpotlightDrop';
import CategoryGrid from '@/components/CategoryGrid';
import BundleOffersSection from '@/components/BundleOffersSection';
import BrandStory from '@/components/BrandStory';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import LookbookSection from '@/components/LookbookSection';
import FabricStory from '@/components/FabricStory';
import TrustSection from '@/components/TrustSection';
import LimitedDropBanner from '@/components/LimitedDropBanner';
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

  // Otherwise render the Kapda Mafia streetwear digital flagship (Genrage-Elevated Architecture)
  return (
    <div ref={scrollRef} className="bg-[#080808]">
      {/* 1. HERO CAMPAIGN SLIDER */}
      <Hero />
      
      {/* 2. GENRAGE SIGNATURE: STORY CATEGORY BUBBLES SCROLLER */}
      <StoryCategories />

      {/* 3. DROP ARCHIVE WITH INTERACTIVE CATEGORY TABS & SORTING */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <NewDropSection products={clothingProducts} />
      </div>

      {/* 4. GENRAGE SIGNATURE: SPOTLIGHT DROP OF THE WEEK & FULL OUTFIT CAPSULE */}
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <SpotlightDrop />
      </div>

      {/* Gradient transition: dark → light for SeenInMotion */}
      <div className="h-14 sm:h-20 bg-gradient-to-b from-[#080808] to-[#EEEAE1]" />
      
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <SeenInMotion />
      </div>

      {/* Gradient transition: light → dark */}
      <div className="h-14 sm:h-20 bg-gradient-to-b from-[#EEEAE1] to-[#0D0C0B]" />

      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <LimitedDropBanner />
      </div>

      {/* 5. SHOP BY CATEGORY TILES */}
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <CategoryGrid />
      </div>

      {/* 6. GENRAGE MERCHANDISING: STREETWEAR COMBO BUNDLE OFFERS */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <BundleOffersSection />
      </div>

      {/* 7. VERIFIED CUSTOMER REVIEWS & UGC ("WORN BY THE CULTURE") */}
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <CustomerReviewsSection />
      </div>

      {/* 8. BRAND ETHOS & MANIFESTO */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <BrandStory />
      </div>

      {/* 9. RUNWAY LOOKBOOK ARCHIVE */}
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <LookbookSection lookbooks={lookbooks} />
      </div>

      {/* Gradient transition: dark → light for FabricStory */}
      <div className="h-14 sm:h-20 bg-gradient-to-b from-[#090909] to-[#EEEAE1]" />

      {/* 10. HEAVYWEIGHT FABRICATION LAB (440 GSM LOOPKNIT TERRY) */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <FabricStory />
      </div>

      {/* Gradient transition: light → dark */}
      <div className="h-14 sm:h-20 bg-gradient-to-b from-[#EEEAE1] to-[#080808]" />

      {/* 11. TRUST & VALUE PROPOSITIONS (COD, FREE SHIPPING, 7-DAY EXCHANGES) */}
      <TrustSection />

      {/* 12. INSTAGRAM LIVE COMMUNITY FEED */}
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <InstagramLiveFeed />
      </div>

      {/* 13. DRAPE LAB SILHOUETTE CALIBRATION */}
      <section className="border-b border-[#1E1E1E] bg-[#080808] py-16 sm:py-24 text-[#F4F4F4] reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-7">
            <div className="mb-3 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
              SILHOUETTE ARCHIVE // CALIBRATION LAB
            </div>
            <h2 className="font-[var(--font-display)] text-3xl font-black leading-[0.92] tracking-[-0.04em] uppercase sm:text-5xl lg:text-6xl text-[#F4F4F4]">
              Proportional<br />
              <span className="text-[#666666]">Drape Lab.</span>
            </h2>
            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-[#888888] font-mono">
              Calibrated for heavyweight 440 GSM streetwear silhouettes. Input height, mass, and volumetric drape preference to eliminate sizing guesswork.
            </p>
            <Link 
              href="/ai-fit" 
              className="mt-6 inline-flex items-center gap-3 border border-white bg-white text-black px-6 py-3.5 text-xs font-mono font-black tracking-widest uppercase transition-colors hover:bg-[#F4F4F4]"
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

      {/* 14. STOREFRONT ORIGIN SPECIFICATION */}
      <section className="border-b border-white/10 bg-[#0C0C0C] py-6 text-[#EEEAE1]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-5 text-xs tracking-wider text-[#C8C3B8] uppercase font-mono sm:grid-cols-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-2.5">
            <Zap size={15} className="text-[#7D0A0A] shrink-0" />
            <span className="truncate">440 GSM Heavyweight Cotton</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-[#7D0A0A] shrink-0" />
            <span className="truncate">NIT-5 Faridabad Origin</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Package size={15} className="text-[#7D0A0A] shrink-0" />
            <span className="truncate">250-Unit Limited Runs</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageCircle size={15} className="text-[#7D0A0A] shrink-0" />
            <span className="truncate">Direct WhatsApp Concierge</span>
          </div>
        </div>
      </section>
    </div>
  );
}
