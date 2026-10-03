import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const pillars = [
  {
    icon: Award,
    title: '280–500 GSM Heavyweight Cotton',
    description: 'High-density combed terry and loopback fleece that retains its drape and structural shape wash after wash.'
  },
  {
    icon: ShieldCheck,
    title: '100% Original Flagship Production',
    description: 'Every piece is inspected, tagged, and fulfilled directly from our Faridabad store and warehouse.'
  },
  {
    icon: Truck,
    title: 'Express Tracked Delivery',
    description: 'Fast, traceable courier dispatch across all major Indian pincodes with live SMS and WhatsApp status updates.'
  },
  {
    icon: RotateCcw,
    title: '7-Day Easy Exchange Policy',
    description: 'Hassle-free size replacement support so you get the exact silhouette that fits your proportions.'
  }
];

export default function TrustSection() {
  return (
    <section className="border-b border-[#1E1E1E] bg-[#080808] py-20 sm:py-24 text-[#F4F4F4]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Craftsmanship & Service"
          title="Built on"
          titleAccent="Standards"
          subtitle="Our principles for fabrication, logistics, and customer care."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E1E1E] border border-[#1E1E1E]">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#111111] p-6 sm:p-8 flex flex-col justify-between space-y-4 hover:bg-[#141414] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-[#1E1E1E] flex items-center justify-center mb-6 text-[#7D0A0A]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F4F4] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
