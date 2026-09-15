import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Kapda Mafia & Shoes Mafia',
  description: 'Terms of service and terms of sale for Kapda Mafia and Shoes Mafia.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EEEAE1] py-20 px-4 sm:px-8 max-w-4xl mx-auto font-mono">
      <div className="mb-10 pb-6 border-b border-white/10">
        <div className="text-xs text-[#8F1118] uppercase tracking-widest font-bold mb-2">TERMS OF SALE & ALLOCATION</div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white">Terms of Service</h1>
        <p className="text-xs text-[#8C8C86] mt-2">Effective Date: January 1, 2026</p>
      </div>

      <div className="space-y-8 text-sm text-[#C8C3B8] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-white tracking-wider">1. Limited Production & Drops</h2>
          <p>
            All garments and footwear featured across Kapda Mafia and Shoes Mafia are manufactured in strictly limited small-batches (150–350 units per cut). Once an allocation is exhausted, restocks are not guaranteed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-white tracking-wider">2. Easy 7-Day Returns & Exchanges</h2>
          <p>
            Unworn items in original packaging with all security tags intact are eligible for return or size exchange within 7 days of verified door delivery.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-white tracking-wider">3. Pricing & Currency</h2>
          <p>
            All prices are quoted in Indian Rupees (INR, ₹) and are inclusive of applicable GST taxes.
          </p>
        </section>

        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <Link href="/shop" className="text-xs font-bold text-white hover:text-[#8F1118] uppercase tracking-wider">
            ← Return to Collection
          </Link>
          <span className="text-xs text-[#666]">Kapda Mafia & Shoes Mafia</span>
        </div>
      </div>
    </div>
  );
}
