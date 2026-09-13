'use client';

import Link from 'next/link';
import { Play, VolumeX } from 'lucide-react';

type VideoProductCardProps = { title: string; subtitle: string; poster: string; videoSrc?: string; href?: string };

export function VideoProductCard({ title, subtitle, poster, videoSrc, href = '/shop' }: VideoProductCardProps) {
  return <article className="group relative aspect-[9/14] overflow-hidden bg-[#C8C3B8]">{videoSrc ? <video src={videoSrc} poster={poster} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay muted loop playsInline preload="metadata" /> : <img src={poster} alt={subtitle} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}<div className="absolute inset-0 bg-[#090909]/20" /><div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[#EEEAE1]"><span className="border border-white/35 bg-[#090909]/50 px-2 py-1 text-[8px] tracking-[0.15em] font-mono">{title}</span><span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/35 bg-[#090909]/50"><Play size={11} fill="currentColor" /></span></div><div className="absolute bottom-3 left-3 right-3 text-[#EEEAE1]"><div className="flex items-center gap-2 text-[8px] tracking-[0.15em] text-[#C8C3B8] font-mono"><VolumeX size={11} /> {videoSrc ? 'MUTED LOOP' : 'MUTED LOOP / DEV POSTER'}</div><div className="mt-2 flex items-end justify-between gap-2"><span className="text-[10px] font-bold leading-tight tracking-[0.08em] font-mono">{subtitle}</span><Link href={href} className="shrink-0 text-[8px] font-bold underline underline-offset-4 font-mono">SHOP LOOK</Link></div></div></article>;
}

const cards = [['THE FIT', '400 GSM / HEAVYWEIGHT DRAPE', '/media/campaign-after-dark.png'], ['THE SILHOUETTE', 'BAGGY CARGO / CITY MOVEMENT', '/media/product-cargo.png'], ['AFTER DARK', '500 GSM / FLEECE PROTOCOL', '/media/product-hoodie.png'], ['THE LOOK', 'OVERSIZED / NIGHT SHIFT', '/media/product-jacket.png']] as const;

export default function SeenInMotion() {
  return <section className="bg-[#EEEAE1] py-20 text-[#090909] sm:py-24"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16"><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 text-[10px] tracking-[0.28em] text-[#77746E] uppercase font-mono">SHORT-FORM EDITORIAL / VIDEO SLOT ARCHITECTURE</div><h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.05em] uppercase sm:text-6xl">SEEN IN MOTION</h2></div><span className="max-w-xs text-[10px] leading-relaxed text-[#77746E] font-mono">Add a licensed 9:16 product or UGC loop through the reusable video card when the media library is ready.</span></div><div className="grid grid-cols-2 gap-2 md:grid-cols-4">{cards.map(([title, subtitle, poster]) => <VideoProductCard key={title} title={title} subtitle={subtitle} poster={poster} />)}</div></div></section>;
}
