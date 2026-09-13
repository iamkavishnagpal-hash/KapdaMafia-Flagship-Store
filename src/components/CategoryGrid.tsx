import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  ['TEES', 'tees', '/media/product-tee.png'], ['HOODIES', 'hoodies', '/media/product-hoodie.png'], ['CARGOS', 'cargos', '/media/product-cargo.png'], ['JACKETS', 'jackets', '/media/product-jacket.png'], ['DENIM', 'denim', '/media/campaign-after-dark.png'], ['ACCESSORIES', 'accessories', '/media/product-jacket.png'],
];

export default function CategoryGrid() {
  return <section className="bg-[#171717] py-20 text-[#EEEAE1] sm:py-24"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16"><div className="mb-9 flex items-end justify-between"><div><div className="mb-2 text-[10px] tracking-[0.28em] text-[#77746E] uppercase font-mono">DISCOVER THE UNIFORM</div><h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.05em] uppercase sm:text-6xl">SHOP BY CATEGORY</h2></div><Link href="/shop" className="hidden items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-mono sm:flex">SHOP ALL <ArrowUpRight size={14} /></Link></div><div className="grid grid-cols-2 gap-px bg-[#090909] md:grid-cols-3 lg:grid-cols-6">{categories.map(([label, slug, image]) => <Link key={slug} href={`/shop?category=${slug}`} className="group relative aspect-[.82] overflow-hidden bg-[#0D0C0B]"><img src={image} alt={`${label} category`} className="h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-90" /><div className="absolute inset-0 bg-[#090909]/20" /><div className="absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-white/25 pt-3 text-[10px] font-bold tracking-[0.16em] uppercase font-mono"><span>{label}</span><ArrowUpRight size={14} /></div></Link>)}</div></div></section>;
}
