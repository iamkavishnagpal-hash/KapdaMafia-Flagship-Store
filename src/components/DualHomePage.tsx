// src/components/DualHomePage.tsx
'use client';

import React from 'react';
import Hero from '@/components/Hero';
import StoryCategories from '@/components/StoryCategories';
import NewDropSection from '@/components/NewDropSection';
import CuratedComboBuilder from '@/components/CuratedComboBuilder';
import SeenInMotion from '@/components/SeenInMotion';
import BrandProofSection from '@/components/BrandProofSection';
import ShoesMafiaView from '@/components/ShoesMafiaView';
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
}: DualHomePageProps) {
  const { world } = useWorld();
  const scrollRef = useScrollReveal();

  // If in SHOES world, render the Shoes Mafia storefront
  if (world === 'shoes') {
    return <ShoesMafiaView products={shoeProducts} />;
  }

  // Otherwise render the Kapda Mafia streetwear digital flagship:
  // Consolidated strictly into 6 high-converting, purposeful sections (plus footer in layout):
  // 1. Hero
  // 2. StoryCategories (Quick Shop Bubbles)
  // 3. NewDropSection (Main Product Grid with 1-Badge Rule & Single-Row Size Pills)
  // 4. CuratedComboBuilder (1 Pant + 1 Tee Bundle @ ₹2,499)
  // 5. SeenInMotion (On-Street Real Drape Movement Reel)
  // 6. BrandProofSection (Flagship Origin, 3 Trust Pillars & Verified Customer Proof)
  return (
    <div ref={scrollRef} className="bg-[#080808]">
      {/* 1. HERO CAMPAIGN SLIDER */}
      <Hero />
      
      {/* 2. CATEGORY BUBBLES SCROLLER */}
      <StoryCategories />

      {/* 3. DROP ARCHIVE WITH INTERACTIVE CATEGORY TABS & SORTING */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <NewDropSection products={clothingProducts} />
      </div>

      {/* 4. CURATED COMBO BUILDER (1 PANT + 1 TEE @ ₹2,499) */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <CuratedComboBuilder />
      </div>

      {/* 5. ON-STREET MOVEMENT REEL */}
      <div className="reveal" style={{ '--reveal-delay': '50ms' } as React.CSSProperties}>
        <SeenInMotion />
      </div>

      {/* 6. BRAND PROOF: NIT-5 ORIGIN, 3 PILLARS & REVIEWS */}
      <div className="reveal" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
        <BrandProofSection />
      </div>
    </div>
  );
}
