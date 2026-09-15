'use client';

import Link from 'next/link';
import { Play, VolumeX, ArrowRight } from 'lucide-react';

type VideoProductCardProps = { 
  title: string; 
  subtitle: string; 
  poster: string; 
  spec: string;
  timecode: string;
  videoSrc?: string; 
  href?: string;
};

export function VideoProductCard({ title, subtitle, poster, spec, timecode, videoSrc, href = '/shop' }: VideoProductCardProps) {
  return (
    <article className="group relative aspect-[9/14] overflow-hidden bg-[#111111] border border-[#1E1E1E]">
      {videoSrc ? (
        <video 
          src={videoSrc} 
          poster={poster} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="metadata" 
        />
      ) : (
        <img 
          src={poster} 
          alt={subtitle} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[#EEEAE1]">
        <span className="border border-white/20 bg-black/70 px-2 py-0.5 text-[9px] font-mono tracking-[0.12em] uppercase text-[#F4F4F4] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>REC ● {timecode}</span>
        </span>
        <span className="border border-white/20 bg-black/70 px-2 py-0.5 text-[9px] font-mono tracking-[0.12em] text-[#888888] uppercase">
          {spec}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-[#EEEAE1]">
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-[#888888] font-mono uppercase">
          <VolumeX size={11} />
          <span>EDITORIAL MOVEMENT</span>
        </div>
        
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/15 pt-2">
          <span className="text-xs font-bold leading-tight tracking-normal font-mono text-white line-clamp-1">
            {subtitle}
          </span>
          <Link 
            href={href} 
            className="shrink-0 px-2.5 py-1.5 bg-[#FFFFFF] hover:bg-[#F4F4F4] text-[#080808] text-xs font-mono font-black tracking-wider uppercase inline-flex items-center gap-1.5 transition-all min-h-[36px]"
            aria-label={`Shop look: ${title}`}
          >
            <span>Shop Look</span>
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const cards = [
  {
    title: 'THE FIT',
    subtitle: '280 GSM Boxy Striped Tee',
    poster: 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304',
    spec: '280 GSM COMBED COTTON',
    timecode: '00:14:09',
    href: '/product/black-and-white-striped-t-shirt'
  },
  {
    title: 'THE SILHOUETTE',
    subtitle: 'Tactical Relaxed Cargo',
    poster: 'https://www.powerlook.in/cdn/shop/files/5_3x_b697cc80-2592-4205-b80b-903930ceac49.jpg?v=1787549048',
    spec: '380 GSM HEAVY TWILL',
    timecode: '00:21:44',
    href: '/product/grey-melange-paneled-baggy-trackpant'
  },
  {
    title: 'THE DENIM',
    subtitle: '440 GSM Selvedge Barrel Denim',
    poster: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
    spec: '440 GSM RIGID SELVEDGE',
    timecode: '00:08:12',
    href: '/product/dark-blue-barrel-fit-jeans'
  },
  {
    title: 'THE LINEN',
    subtitle: 'Relaxed Resort Camp Collar',
    poster: 'https://www.powerlook.in/cdn/shop/files/1497220.jpg?v=1779534340',
    spec: '190 GSM AIRY LINEN',
    timecode: '00:33:50',
    href: '/product/natural-embroidery-linen-shirt'
  }
];

export default function SeenInMotion() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-20 text-[#F4F4F4] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
              Campaign Visuals // Editorial Movement
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] uppercase sm:text-6xl text-[#F4F4F4]">
              Seen in Motion
            </h2>
          </div>
          <span className="max-w-xs text-xs leading-relaxed text-[#888888] font-mono">
            Heavyweight drape in real urban environments. Natural volumetric fall and authentic street presence.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {cards.map((card) => (
            <VideoProductCard 
              key={card.title} 
              title={card.title} 
              subtitle={card.subtitle} 
              poster={card.poster}
              spec={card.spec}
              timecode={card.timecode}
              href={card.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
