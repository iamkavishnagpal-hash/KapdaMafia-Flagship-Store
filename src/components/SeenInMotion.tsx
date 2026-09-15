'use client';

import Link from 'next/link';
import { Play, VolumeX, ArrowRight } from 'lucide-react';

type VideoProductCardProps = { title: string; subtitle: string; poster: string; videoSrc?: string; href?: string };

export function VideoProductCard({ title, subtitle, poster, videoSrc, href = '/shop' }: VideoProductCardProps) {
  return (
    <article className="group relative aspect-[9/14] overflow-hidden bg-[#121212]">
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/30" />
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[#EEEAE1]">
        <span className="border border-white/20 bg-black/60 px-2.5 py-1 text-xs tracking-wider font-mono uppercase">
          {title}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60">
          <Play size={11} fill="currentColor" />
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-[#EEEAE1]">
        <div className="flex items-center gap-1.5 text-xs tracking-wider text-[#8C8C86] font-mono uppercase">
          <VolumeX size={12} />
          <span>EDITORIAL ARCHIVE</span>
        </div>
        
        {/* Issue 15 & 16 Fix: Prominent Shop Look CTA with consistent arrow icon and 36px touch target */}
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/15 pt-2">
          <span className="text-xs font-bold leading-tight tracking-normal font-mono text-white line-clamp-1">
            {subtitle}
          </span>
          <Link 
            href={href} 
            className="shrink-0 px-2.5 py-1.5 bg-white/15 hover:bg-white text-[#F3F0E8] hover:text-black text-xs font-mono font-bold tracking-wider uppercase inline-flex items-center gap-1.5 transition-all min-h-[36px]"
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
  ['THE FIT', '280 GSM Boxy Striped Tee', 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304'], 
  ['THE SILHOUETTE', 'Tactical Relaxed Cargo', 'https://www.powerlook.in/cdn/shop/files/5_3x_b697cc80-2592-4205-b80b-903930ceac49.jpg?v=1787549048'], 
  ['THE DENIM', '440 GSM Selvedge Barrel Denim', 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605'], 
  ['THE LINEN', 'Relaxed Resort Camp Collar', 'https://www.powerlook.in/cdn/shop/files/1497220.jpg?v=1779534340']
] as const;

export default function SeenInMotion() {
  return (
    <section className="bg-[#EEEAE1] py-20 text-[#090909] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 text-xs tracking-wider text-[#77746E] uppercase font-semibold">
              Campaign Visuals · Editorial Movement
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] uppercase sm:text-6xl">
              Seen in Motion
            </h2>
          </div>
          <span className="max-w-xs text-xs leading-relaxed text-[#77746E]">
            Heavyweight drape in real urban environments. Natural drape and authentic street presence.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {cards.map(([title, subtitle, poster]) => (
            <VideoProductCard key={title} title={title} subtitle={subtitle} poster={poster} />
          ))}
        </div>
      </div>
    </section>
  );
}
