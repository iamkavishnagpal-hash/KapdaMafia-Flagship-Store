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
            <div className="mb-3 text-xs tracking-wider text-[#8F1118] uppercase font-semibold">
              Fit &amp; Silhouette Lab
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-black leading-[0.9] tracking-[-0.05em] uppercase sm:text-6xl">
              Stop Guessing<br />
              <span className="text-[#C8C3B8]">Your Fit.</span>
            </h2>
            <p className="mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-[#8C8C86]">
              Calibrated for heavyweight streetwear silhouettes. Match your height, build, and preferred volume to eliminate sizing guesswork.
            </p>
            <Link 
              href="/ai-fit" 
              className="mt-8 inline-flex items-center gap-3 border border-white/20 bg-[#121212] px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#EEEAE1]"
            >
              Fit Assistant <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-5 text-center font-mono lg:col-span-5">
            <div className="bg-[#171717] px-2 sm:px-3 py-5 sm:py-7">
              <div className="text-3xl sm:text-4xl font-bold text-[#EEEAE1]">L</div>
              <div className="mt-2 text-xs tracking-wider text-[#8C8C86]">RECOMMENDED</div>
            </div>
            <div className="bg-[#171717] px-2 sm:px-3 py-5 sm:py-7">
              <div className="text-3xl sm:text-4xl font-bold text-[#EEEAE1]">92%</div>
              <div className="mt-2 text-xs tracking-wider text-[#8C8C86]">CONFIDENCE</div>
            </div>
            <div className="bg-[#171717] px-2 sm:px-3 py-5 sm:py-7">
              <div className="text-3xl sm:text-4xl font-bold text-[#EEEAE1]">RELAXED</div>
              <div className="mt-2 text-xs tracking-wider text-[#8C8C86]">INTENDED FIT</div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#171717] py-7 text-[#EEEAE1]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-5 text-xs tracking-wider text-[#C8C3B8] uppercase font-mono sm:grid-cols-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3"><ShieldCheck size={18} /> Premium quality</div>
          <div className="flex items-center gap-3"><CreditCard size={18} /> Secure payments</div>
          <div className="flex items-center gap-3"><RotateCcw size={18} /> Easy returns</div>
          <div className="flex items-center gap-3"><Truck size={18} /> Track every order</div>
        </div>
      </section>
    </div>
  );
}
