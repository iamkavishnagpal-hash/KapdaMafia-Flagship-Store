import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Building2, Flame } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BrandStory() {
  return (
    <section className="border-b border-[#1E1E1E] bg-[#0A0A0A] py-20 sm:py-28 text-[#F4F4F4] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full bg-[#7D0A0A]/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:gap-16 px-4 sm:px-8 lg:grid-cols-12 lg:px-12 relative z-10">
        
        {/* Story copy grounded in real Faridabad roots (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#222] text-xs font-mono text-[#C8C3B8]">
            <MapPin size={12} className="text-[#7D0A0A]" />
            <span className="tracking-widest uppercase">FLAGSHIP ORIGIN // FARIDABAD</span>
          </div>

          <h2 className="type-heading-xl text-[#F4F4F4]">
            Born in Faridabad.<br />
            <span className="font-serif italic font-normal text-[#C8C3B8] pr-2">Crafted</span>
            <span className="text-[#888888]">for the culture.</span>
          </h2>

          <p className="type-body-lg text-[#9E9E9E] max-w-xl text-base sm:text-lg leading-relaxed">
            Kapda Mafia originated from our flagship store in NIT-5, Faridabad. We refused to accept
            lightweight, disposable garments. Instead, we built garments with the weight and permanence
            we needed: custom 440 GSM loopback cotton, selvedge denim curvature, and silhouettes that
            command respect.
          </p>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-[#222] max-w-lg text-xs font-sans text-[#888888]">
            <div className="space-y-1">
              <span className="block text-2xl font-bold text-[#F4F4F4] tracking-tight">NIT-5</span>
              <span className="text-[11px] uppercase tracking-wider text-[#777]">Faridabad Flagship</span>
            </div>
            <div className="space-y-1">
              <span className="block text-2xl font-bold text-[#F4F4F4] tracking-tight">440 GSM</span>
              <span className="text-[11px] uppercase tracking-wider text-[#777]">Heavyweight Benchmark</span>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <span className="block text-2xl font-bold text-[#F4F4F4] tracking-tight">100%</span>
              <span className="text-[11px] uppercase tracking-wider text-[#777]">Original Production</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/store">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight size={14} />} className="hover:border-[#7D0A0A]">
                Visit Flagship Store
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="ghost" size="md">
                Browse Full Catalog
              </Button>
            </Link>
          </div>
        </div>

        {/* Flagship Photography (5 columns) */}
        <div className="relative lg:col-span-5">
          <div className="overflow-hidden border border-[#222222] bg-[#111111] aspect-[4/5] group shadow-2xl">
            <img
              src="/media/hero-editorial-model.jpg"
              alt="Kapda Mafia Streetwear Flagship Model"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105 filter contrast-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="absolute -bottom-3 left-4 right-4 sm:right-auto border border-[#222222] bg-[#111111]/95 backdrop-blur-md px-4 py-2.5 text-xs text-[#C8C3B8] font-mono flex items-center justify-between gap-4">
            <span>Kapda Mafia Flagship // NIT-5</span>
            <span className="text-[#7D0A0A] font-bold">EST. 2024</span>
          </div>
        </div>

      </div>
    </section>
  );
}
