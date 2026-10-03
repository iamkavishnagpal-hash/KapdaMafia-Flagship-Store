'use client';

import React from 'react';
import Hero from '@/components/Hero';
import NewDropSection from '@/components/NewDropSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import EditorialSection from '@/components/EditorialSection';
import BrandStory from '@/components/BrandStory';
import CategoryGrid from '@/components/CategoryGrid';
import LookbookSection from '@/components/LookbookSection';
import InstagramLiveFeed from '@/components/InstagramLiveFeed';
import TrustSection from '@/components/TrustSection';
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
  lookbooks
}: DualHomePageProps) {
  const { world } = useWorld();
  const scrollRef = useScrollReveal();

  // If in SHOES world, render the Shoes Mafia storefront
  if (world === 'shoes') {
    return <ShoesMafiaView products={shoeProducts} />;
  }

  return (
    <div ref={scrollRef} className="bg-[#080808] min-h-screen">
      {/* 01 — HERO */}
      <Hero />

      {/* 02 — NEW DROP */}
      <div className="reveal">
        <NewDropSection products={clothingProducts} />
      </div>

      {/* 03 — FEATURED PRODUCTS */}
      <div className="reveal">
        <FeaturedProductsSection products={clothingProducts} />
      </div>

      {/* 04 — EDITORIAL */}
      <div className="reveal">
        <EditorialSection />
      </div>

      {/* 05 — BRAND STORY */}
      <div className="reveal">
        <BrandStory />
      </div>

      {/* 06 — CURATED CATEGORIES */}
      <div className="reveal">
        <CategoryGrid />
      </div>

      {/* 07 — SHOP THE LOOK (Cross-World Outfits: Kapda + Shoes) */}
      <div className="reveal">
        <LookbookSection lookbooks={lookbooks} />
      </div>

      {/* 08 — INSTAGRAM COMMUNITY IN MOTION (KAPDA + SHOES) */}
      <div className="reveal">
        <InstagramLiveFeed />
      </div>

      {/* 08 — TRUST / CRAFTSMANSHIP */}
      <div className="reveal">
        <TrustSection />
      </div>
    </div>
  );
}
