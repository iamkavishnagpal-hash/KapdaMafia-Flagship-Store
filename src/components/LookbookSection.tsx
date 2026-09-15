import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Lookbook } from '@/types/ecommerce';

export default function LookbookSection({ lookbooks }: { lookbooks: Lookbook[] }) {
  const images = [
    'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
    'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304'
  ];
  return (
    <section className="border-b border-white/10 bg-[#090909] py-20 text-[#EEEAE1] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 text-xs tracking-wider text-[#8C8C86] uppercase font-semibold">
              Editorial Styling · Curated Looks
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] uppercase sm:text-6xl">
              Lookbook
            </h2>
          </div>
          <Link href="/lookbook" className="hidden items-center gap-2 text-xs tracking-wider uppercase font-semibold text-[#C8C3B8] hover:text-white transition-colors sm:flex">
            <span>View All Looks</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {lookbooks.map((look, index) => (
            <article key={look.id} className="group overflow-hidden border border-white/10 bg-[#111111] flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={images[index % images.length]} 
                  alt={look.title} 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
                />
                <span className="absolute left-4 top-4 border border-white/20 bg-[#090909]/80 backdrop-blur-sm px-2.5 py-1 text-xs tracking-wider font-mono text-white">
                  LOOK {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="mb-1.5 text-xs tracking-wider text-[#8F1118] uppercase font-semibold">
                    {look.subtitle.replace(/AFTER DARK/gi, 'AUTUMN / WINTER')}
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight uppercase text-white">
                    {look.title.replace(/AFTER DARK/gi, 'SIGNATURE')}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8C8C86]">
                    {look.description.replace(/after dark/gi, 'in any condition')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white hover:text-[#8F1118] transition-colors min-h-[36px]"
                  >
                    <span>Shop This Look</span>
                    <ArrowRight size={14} />
                  </Link>
                  <span className="text-xs text-[#666] tracking-widest uppercase font-mono">
                    280–440 GSM
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
