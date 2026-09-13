'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LookbookPage() {
  const outfits = [
    {
      id: 'look-01',
      tag: 'LOOK 01',
      title: 'AFTER DARK',
      description: 'Oversized crest tee paired with tactical cargo pants.',
      image: '/media/campaign-after-dark.png',
      pieces: '2 PIECES / ONE LOOK',
      link: '/shop'
    },
    {
      id: 'look-02',
      tag: 'LOOK 02',
      title: 'MONOLITH REBEL',
      description: 'Heavyweight flame hoodie styled with parachute cargos.',
      image: '/media/product-jacket.png',
      pieces: '2 PIECES / ONE LOOK',
      link: '/shop'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-mono selection:bg-[#8F1118] selection:text-white">
      {/* Editorial Hero Banner */}
      <section className="relative pt-32 pb-20 border-b border-[#181818] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="text-[10px] tracking-[0.35em] text-[#8C8C86] uppercase font-bold mb-3">
            LOOKBOOK / DROP 09 / AFTER DARK
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9] text-white">
            COMPLETE<br />OUTFITS.
          </h1>
          <p className="mt-6 max-w-md text-xs sm:text-sm text-[#8C8C86] leading-relaxed">
            The full Kapda Mafia uniform, styled for nights that do not need a dress code.
          </p>
        </div>
      </section>

      {/* The Edit — Curated Looks Section in exact Genrage styling */}
      <section className="bg-[#F5F2EB] py-20 text-[#000000]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex items-end justify-between mb-12 border-b border-black/10 pb-6">
            <div>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#666660] mb-2">
                CURATED LOOKS / SHOP THE OUTFIT
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] uppercase text-black">
                THE EDIT
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-black flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              SHOP ALL <ArrowRight size={14} />
            </Link>
          </div>

          {/* Lookbook 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outfits.map((outfit) => (
              <article key={outfit.id} className="group bg-white border border-black/10 flex flex-col justify-between">
                <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                  <img
                    src={outfit.image}
                    alt={outfit.title}
                    className="w-full h-full object-cover grayscale-[.15] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 border border-white/20 text-white text-[9px] font-bold tracking-[0.18em] px-2.5 py-1 uppercase">
                    {outfit.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-[#8F1118] uppercase font-bold mb-2">
                      {outfit.title}
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed">
                      {outfit.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase font-bold text-black">
                    <span className="text-[#888]">{outfit.pieces}</span>
                    <Link
                      href={outfit.link}
                      className="inline-flex items-center gap-2 hover:text-[#8F1118] transition-colors"
                    >
                      SHOP THIS LOOK <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
