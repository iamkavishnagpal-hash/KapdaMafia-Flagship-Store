import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="border-b border-white/10 bg-[#090909] py-24 text-[#EEEAE1] sm:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-7">
          <div className="mb-3 text-[10px] tracking-[0.3em] text-[#8F1118] uppercase font-mono">
            THE CULTURE / MANIFESTO
          </div>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-[-0.05em] uppercase">
            NOT MADE<br />
            <span className="text-[#C8C3B8]">FOR EVERYONE.</span>
          </h2>
          <p className="mt-4 sm:mt-7 max-w-xl text-sm sm:text-base leading-relaxed text-[#C8C3B8]">
            Kapda Mafia is a streetwear uniform for people who move with intention. Dense cotton, practical silhouettes, and small-batch drops made for the ones shaping culture after dark.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-white/15 pt-5 text-[9px] tracking-[0.14em] text-[#77746E] uppercase font-mono">
            <div>
              <b className="mb-1 block text-2xl tracking-normal text-[#EEEAE1]">280–440 GSM</b>
              Heavyweight Cotton Weave
            </div>
            <div>
              <b className="mb-1 block text-2xl tracking-normal text-[#EEEAE1]">FARIDABAD / DEL-NCR</b>
              Authentic Street Roots
            </div>
          </div>
          <Link 
            href="/shop" 
            className="mt-8 inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase transition-colors hover:border-[#EEEAE1] font-mono"
          >
            ENTER THE MAFIA <ArrowRight size={14} />
          </Link>
        </div>
        <div className="relative lg:col-span-5">
          <div className="overflow-hidden border border-white/10 bg-[#121212]">
            <img 
              src="/media/kapda-mafia-storefront-hero.jpg" 
              alt="Kapda Mafia Flagship Culture" 
              className="aspect-[4/5] w-full object-cover grayscale-[.1] transition duration-700 hover:scale-105" 
            />
          </div>
          <div className="absolute -bottom-4 left-4 border border-white/15 bg-[#0D0C0B] px-4 py-3 text-[9px] tracking-[0.16em] text-[#C8C3B8] uppercase font-mono">
            KAPDA MAFIA • EST. 2024
          </div>
        </div>
      </div>
    </section>
  );
}
