'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
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

  // If in SHOES world, render the Bunnyboss Shoes Mafia storefront
  if (world === 'shoes') {
    return <ShoesMafiaView products={shoeProducts} />;
  }

  // Otherwise render the Kapda Mafia streetwear digital flagship
  return (
    <div className="bg-[#090909]">
      <Hero />
      <NewDropSection products={clothingProducts} />
      <SeenInMotion />
      <LimitedDropBanner />
      <CategoryGrid />
      <BrandStory />
      <LookbookSection lookbooks={lookbooks} />
      <FabricStory />
      <InstagramLiveFeed />
      <section className="border-b border-white/10 bg-[#0D0C0B] py-20 text-[#EEEAE1] sm:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-7">
            <div className="mb-3 text-[10px] tracking-[0.28em] text-[#8F1118] uppercase font-mono">
              PRECISION FIT STUDIO / AI MEASUREMENT
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold leading-[0.9] tracking-[-0.05em] uppercase sm:text-6xl">
              STOP GUESSING<br />
              <span className="text-[#C8C3B8]">YOUR SIZE.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#77746E]">
              Calibrated for relaxed streetwear proportions. Enter your height, weight, and preferred drape to get an exact recommendation for every piece.
            </p>
            <Link 
              href="/ai-fit" 
              className="mt-8 inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase transition-colors hover:border-[#EEEAE1] font-mono"
            >
              CALCULATE YOUR FIT <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 border-l border-white/10 pl-5 text-center font-mono lg:col-span-5">
            <div className="bg-[#171717] px-3 py-7">
              <div className="text-4xl font-bold text-[#EEEAE1]">L</div>
              <div className="mt-2 text-[9px] tracking-[0.16em] text-[#77746E]">RECOMMENDED</div>
            </div>
            <div className="bg-[#171717] px-3 py-7">
              <div className="text-4xl font-bold text-[#EEEAE1]">92%</div>
              <div className="mt-2 text-[9px] tracking-[0.16em] text-[#77746E]">CONFIDENCE</div>
            </div>
            <div className="bg-[#171717] px-3 py-7">
              <div className="text-4xl font-bold text-[#EEEAE1]">RELAXED</div>
              <div className="mt-2 text-[9px] tracking-[0.16em] text-[#77746E]">INTENDED FIT</div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#171717] py-7 text-[#EEEAE1]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-5 text-[9px] tracking-[0.13em] text-[#C8C3B8] uppercase font-mono sm:grid-cols-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3"><ShieldCheck size={18} /> Premium quality</div>
          <div className="flex items-center gap-3"><CreditCard size={18} /> Secure payments</div>
          <div className="flex items-center gap-3"><RotateCcw size={18} /> Easy returns</div>
          <div className="flex items-center gap-3"><Truck size={18} /> Track every order</div>
        </div>
      </section>
    </div>
  );
}
