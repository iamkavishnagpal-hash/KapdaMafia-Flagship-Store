import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LimitedDropBanner() {
  return (
    <section className="bg-[#0D0C0B] py-16 text-[#EEEAE1] sm:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:px-16">
        <div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold leading-[0.86] tracking-[-0.06em] uppercase sm:text-7xl">
            LIMITED STOCK.<br />
            <span className="text-[#C8C3B8]">NO RESTOCK.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm text-[#77746E]">
            Small-batch engineering designed for the night. Heavyweight denim, barrel cargos, and structured streetwear cuts.
          </p>
          <Link href="/shop" className="mt-8 inline-flex items-center gap-3 border border-white/20 px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#EEEAE1]">
            Explore The Drop <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="relative overflow-hidden border border-white/10 bg-[#090909]">
          <img 
            src="/media/streetwear-night-lamp.jpg" 
            alt="Kapda Mafia Digital Flagship Release" 
            className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105" 
          />
          <div className="absolute bottom-4 left-4 border border-white/20 bg-[#090909]/85 px-3 py-2 text-xs tracking-wider text-[#C8C3B8] uppercase">
            Kapda Mafia · First Edition Release
          </div>
        </div>
      </div>
    </section>
  );
}
