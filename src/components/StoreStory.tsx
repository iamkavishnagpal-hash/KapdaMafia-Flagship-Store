import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function StoreStory() {
  return (
    <section className="border-b border-white/10 bg-[#0D0C0B] py-20 text-[#EEEAE1] sm:py-24">
      <div className="mx-auto grid max-w-[1440px] items-stretch gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-16">
        <div className="relative overflow-hidden border border-white/10 lg:col-span-7">
          <img src="/media/campaign-after-dark.png" alt="Kapda Mafia store story development still" className="h-full min-h-[320px] w-full object-cover object-[58%_center] transition duration-1000 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#090909]/70 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 border border-white/20 bg-[#090909]/75 px-3 py-2 font-mono text-[9px] tracking-[0.18em] text-[#C8C3B8] uppercase">MUMBAI / NIGHT EDITION</span>
        </div>
        <div className="flex flex-col justify-between border border-white/10 bg-[#111111] p-7 sm:p-10 lg:col-span-5">
          <div>
            <div className="mb-4 font-mono text-[10px] tracking-[0.28em] text-[#8F1118] uppercase">THE FLAGSHIP / PHYSICAL UNIFORM</div>
            <h2 className="font-[var(--font-display)] text-5xl font-bold leading-[0.86] tracking-[-0.06em] uppercase sm:text-7xl">FEEL THE<br /><span className="text-[#C8C3B8]">WEIGHT.</span></h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#77746E]">Try the drop in person. Inspect the stitching, build a complete fit, and leave with the pieces that belong in your rotation.</p>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5">
            <div className="mb-5 flex items-start gap-3 font-mono text-[10px] tracking-[0.12em] text-[#C8C3B8] uppercase"><MapPin size={16} className="mt-0.5 shrink-0 text-[#8F1118]" /><span>Bandra West, Mumbai<br /><span className="text-[#77746E]">11:00 AM — 09:30 PM / MON — SUN</span></span></div>
            <Link href="/store" className="inline-flex items-center gap-3 border border-white/20 px-5 py-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase transition hover:border-[#EEEAE1]">VISIT THE STORE <ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
