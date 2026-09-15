import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="border-b border-white/10 bg-[#090909] py-24 text-[#EEEAE1] sm:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-7">
          <div className="mb-3 text-xs tracking-widest text-[#8F1118] uppercase font-semibold">
            Brand Manifesto · Autumn / Winter
          </div>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-[-0.05em] uppercase">
            Not Made<br />
            <span className="text-[#C8C3B8]">For Everyone.</span>
          </h2>
          <p className="mt-4 sm:mt-7 max-w-xl text-sm sm:text-base leading-relaxed text-[#C8C3B8]">
            Kapda Mafia is a streetwear uniform for people who move with intention. Dense cotton, practical silhouettes, and small-batch editions engineered for intentional presence and culture.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-white/15 pt-5 text-xs text-[#8C8C86]">
            <div>
              <b className="mb-1 block text-2xl tracking-normal text-[#EEEAE1]">280–440 GSM</b>
              Heavyweight Cotton Weave
            </div>
            <div>
              <b className="mb-1 block text-2xl tracking-normal text-[#EEEAE1]">Faridabad Flagship</b>
              Authentic Street Roots
            </div>
          </div>
          <Link 
            href="/shop" 
            className="mt-8 inline-flex items-center gap-3 border border-white/20 px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#EEEAE1]"
          >
            Explore Collection <ArrowRight size={14} />
          </Link>
        </div>
        <div className="relative lg:col-span-5">
          <div className="overflow-hidden border border-white/10 bg-[#121212]">
            <img 
              src="/media/hero-editorial-model.jpg" 
              alt="Kapda Mafia 440 GSM Studio Editorial" 
              className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105" 
            />
          </div>
          <div className="absolute -bottom-4 left-4 border border-white/15 bg-[#0D0C0B] px-4 py-3 text-xs tracking-wider text-[#C8C3B8] uppercase">
            Kapda Mafia · Established 2024
          </div>
        </div>
      </div>
    </section>
  );
}
