import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LimitedDropBanner() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 text-[#F4F4F4] sm:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:px-16">
        <div>
          <div className="mb-2 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
            ARCHIVE RELEASE // LIMITED DROP
          </div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold leading-[0.86] tracking-[-0.06em] uppercase sm:text-7xl text-[#F4F4F4]">
            LIMITED STOCK.<br />
            <span className="text-[#888888]">NO RESTOCK.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm text-[#888888] font-mono leading-relaxed">
            Small-batch engineering designed for the night. Heavyweight denim, barrel cargos, and structured streetwear cuts.
          </p>
          <Link 
            href="/shop" 
            className="mt-8 inline-flex items-center gap-3 border border-[#1E1E1E] bg-[#FFFFFF] text-[#080808] px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-colors hover:bg-[#F4F4F4]"
          >
            <span>Explore The Drop</span> <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="relative overflow-hidden border border-[#1E1E1E] bg-[#111111]">
          <img 
            src="/media/campaign-editorial-model.jpg" 
            alt="Kapda Mafia Digital Flagship Release" 
            className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105" 
          />
          <div className="absolute bottom-4 left-4 border border-[#1E1E1E] bg-[#080808]/90 px-3 py-2 text-xs tracking-wider text-[#888888] uppercase font-mono">
            Kapda Mafia // First Edition Release
          </div>
        </div>
      </div>
    </section>
  );
}
