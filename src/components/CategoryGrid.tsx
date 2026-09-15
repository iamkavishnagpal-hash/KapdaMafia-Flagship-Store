import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  ['TEES', 'tees', '/media/product-tee.png'], 
  ['HOODIES', 'hoodies', '/media/product-hoodie.png'], 
  ['CARGOS', 'cargos', '/media/product-cargo.png'], 
  ['JACKETS', 'jackets', '/media/product-jacket.png'], 
  ['DENIM', 'denim', '/media/category-denim.jpg'], 
  ['ACCESSORIES', 'accessories', '/media/category-accessories.jpg'],
];

export default function CategoryGrid() {
  return (
    <section className="bg-[#171717] py-20 text-[#EEEAE1] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        
        {/* Issue 10 & 28 Fix: Balanced heading & prominent Shop All Categories action */}
        <div className="mb-9 flex items-baseline justify-between border-b border-white/10 pb-4">
          <div>
            <div className="mb-2 text-xs tracking-widest text-[#8C8C86] uppercase font-mono">
              DISCOVER THE UNIFORM
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-5xl font-bold tracking-[-0.03em] uppercase">
              Shop by Category
            </h2>
          </div>
          
          <Link 
            href="/shop" 
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#C8C3B8] hover:text-white border-b border-white/20 pb-0.5 hover:border-white transition-all min-h-[36px]"
          >
            <span>Shop All Categories</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Issue 29 Fix: Legible category cards with gradient scrim and prominent typography */}
        <div className="grid grid-cols-2 gap-px bg-[#090909] md:grid-cols-3 lg:grid-cols-6">
          {categories.map(([label, slug, image]) => (
            <Link 
              key={slug} 
              href={`/shop?category=${slug}`} 
              className="group relative aspect-[.82] overflow-hidden bg-[#0D0C0B]"
              aria-label={`Browse ${label} category`}
            >
              <img 
                src={image} 
                alt={`${label} category`} 
                className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between border-t border-white/15">
                <span className="text-sm font-mono font-bold tracking-wider text-white uppercase">
                  {label}
                </span>
                <ArrowUpRight size={16} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
