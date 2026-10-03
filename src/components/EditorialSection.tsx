'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function EditorialSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#080808] border-b border-[#1E1E1E]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Craft & Form"
          title="Heavyweight Fabric."
          titleAccent="Natural Drape."
          subtitle="Engineered with dense combed cotton, dropped shoulders, and proportions that command presence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Editorial Visual */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-[#111111] border border-[#222222] overflow-hidden group shadow-2xl">
              <img
                src="/media/lookbook-concrete-studio.jpg"
                alt="Kapda Mafia Streetwear Studio Editorial"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#C8C3B8] font-sans">
                <span className="bg-black/80 px-3 py-1 border border-white/10 uppercase tracking-wider text-[11px]">
                  Studio Fit Check
                </span>
                <span className="text-[#A0A0A0] hidden sm:inline">
                  440 GSM Denim & Heavy Terry
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Spread & Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] bg-[#111111] border border-[#222222] overflow-hidden group shadow-xl">
              <img
                src="/media/lookbook-rain-editorial.jpg"
                alt="Kapda Mafia Streetwear Movement Study"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-4 pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#7D0A0A] font-semibold">
                <span>Tailored Form</span>
              </div>
              <h3 className="type-heading-md text-[#F4F4F4] leading-tight">
                Silhouettes that never collapse against the body.
              </h3>
              <p className="type-body-md text-[#9E9E9E] leading-relaxed">
                Conventional thin cotton clings and loses its shape after three washes. By spinning
                combed yarns at 280 to 500 GSM, our tees, hoodies, and cargos maintain an effortless
                architectural presence on the street.
              </p>
              <div>
                <Link
                  href="/lookbook"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#F4F4F4] hover:text-[#7D0A0A] uppercase tracking-wider transition-colors border-b border-[#333] hover:border-[#7D0A0A] pb-1"
                >
                  <span>Explore Full Visual Lookbook</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
