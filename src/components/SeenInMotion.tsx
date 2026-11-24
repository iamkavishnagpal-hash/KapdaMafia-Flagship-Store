'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface MovementCard {
  id: string;
  title: string;
  subtitle: string;
  poster: string;
  spec: string;
  href: string;
}

const CARDS: MovementCard[] = [
  {
    id: 'm1',
    title: 'THE STRIPED FIT',
    subtitle: '280 GSM Boxy Striped Tee',
    poster: '/media/motion-card-1.jpg',
    spec: '280 GSM COMBED COTTON',
    href: '/product/black-and-white-striped-t-shirt'
  },
  {
    id: 'm2',
    title: 'THE SILHOUETTE',
    subtitle: 'Tactical Relaxed Cargo',
    poster: '/media/motion-card-2.jpg',
    spec: '380 GSM HEAVY TWILL',
    href: '/product/grey-melange-paneled-baggy-trackpant'
  },
  {
    id: 'm3',
    title: 'THE BARREL DENIM',
    subtitle: '440 GSM Selvedge Barrel Denim',
    poster: '/media/motion-card-3.jpg',
    spec: '440 GSM RIGID SELVEDGE',
    href: '/product/dark-blue-barrel-fit-jeans'
  },
  {
    id: 'm4',
    title: 'THE RESORT LINEN',
    subtitle: 'Relaxed Resort Camp Collar',
    poster: '/media/motion-card-4.jpg',
    spec: '190 GSM AIRY LINEN',
    href: '/product/natural-embroidery-linen-shirt'
  }
];

export default function SeenInMotion() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 sm:py-24 text-[#F4F4F4]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7D0A0A] uppercase tracking-[0.14em] font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#7D0A0A]" />
              <span>On the street</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] text-[#F4F4F4] leading-[0.95] font-[var(--font-display)]">
              Seen in Motion
            </h2>
          </div>
          
          <span className="text-xs text-[#888888] max-w-sm leading-relaxed">
            A closer look at the fit, fabric and proportion away from the product page.
          </span>
        </div>

        {/* 4-Card Vertical Editorial Reel Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {CARDS.map((card) => (
            <article 
              key={card.id} 
              className="group relative aspect-[9/14] overflow-hidden bg-[#111111] border border-[#1E1E1E] transition-all hover:border-[#444444]"
            >
              <Image 
                src={card.poster} 
                alt={card.subtitle} 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Top Spec Tag */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-black/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#C8C3B8]">
                  {card.spec}
                </span>
              </div>

              {/* Bottom Details & Shop Fit CTA */}
              <div className="absolute bottom-3 left-3 right-3 text-[#F4F4F4]">
                <div className="text-xs text-[#AAAAAA] uppercase tracking-wider mb-1">
                  {card.title}
                </div>
                <div className="text-xs sm:text-sm font-bold leading-snug line-clamp-1 mb-3 text-white">
                  {card.subtitle}
                </div>

                <Link 
                  href={card.href} 
                  className="w-full py-2.5 bg-white hover:bg-[#F4F4F4] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md min-h-[44px]"
                  aria-label={`Shop fit for ${card.subtitle}`}
                >
                  <span>SHOP FIT</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
