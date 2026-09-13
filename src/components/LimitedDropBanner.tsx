import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LimitedDropBanner() {
  return (
    <section className="bg-[#0D0C0B] py-16 text-[#EEEAE1] sm:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:px-16">
        <div><div className="mb-4 text-[10px] tracking-[0.28em] text-[#8F1118] uppercase font-mono">DROP 09 / CONTROLLED RELEASE</div><h2 className="font-[var(--font-display)] text-5xl font-bold leading-[0.86] tracking-[-0.06em] uppercase sm:text-7xl">LIMITED STOCK.<br /><span className="text-[#C8C3B8]">NO RESTOCK.</span></h2><p className="mt-5 max-w-sm text-sm text-[#77746E]">Once it&apos;s gone, it&apos;s gone. A four-piece night uniform built around weight, movement, and low-light utility.</p><Link href="/shop" className="mt-8 inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover:border-[#EEEAE1] font-mono">EXPLORE THE DROP <ArrowUpRight size={14} /></Link></div>
        <div className="relative overflow-hidden border border-white/10"><img src="/media/campaign-after-dark.png" alt="Development campaign still for the After Dark drop" className="h-full min-h-[280px] w-full object-cover object-[58%_center] grayscale-[.15] transition-transform duration-700 hover:scale-105" /><div className="absolute bottom-4 left-4 border border-white/20 bg-[#090909]/75 px-3 py-2 text-[9px] tracking-[0.18em] text-[#C8C3B8] uppercase font-mono">DEVELOPMENT CAMPAIGN STILL / REPLACE WITH LICENSED FILM</div></div>
      </div>
    </section>
  );
}
