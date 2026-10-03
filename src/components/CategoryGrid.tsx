import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const categories = [
  { label: 'Topwear', slug: 'topwear', count: '280-440 GSM', image: '/media/product-tee.png', accent: 'Boxy Tees & Shirts' },
  { label: 'Bottomwear', slug: 'bottomwear', count: 'Denim & Cargos', image: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605', accent: 'Curved Barrel & Wide Leg' },
  { label: 'Winterwear', slug: 'winterwear', count: '500 GSM Heavy', image: '/media/product-hoodie.png', accent: 'Double Hood & Fleece' },
  { label: 'Co-ord Sets', slug: 'coord-sets', count: 'Matching Sets', image: 'https://www.powerlook.in/cdn/shop/files/7_3x_888d77c3-7b5a-4a6f-bf88-66c15809bf99.jpg?v=1787637637', accent: 'Trackpants & Tops' },
  { label: 'Street Basics', slug: 'basics', count: 'Core Essentials', image: 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304', accent: 'Heavy Combed Rib' },
  { label: 'Shoes Mafia', slug: 'sneakers', count: 'Kicks Archive', image: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg', accent: 'Chunky Runners & Court' }
];

export default function CategoryGrid() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-20 sm:py-28 text-[#F4F4F4]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Collections"
          title="Shop by"
          titleAccent="Category"
          subtitle="Explore our wardrobe essentials organized by cotton weight, cut, and daily utility."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#F4F4F4] hover:text-[#7D0A0A] uppercase tracking-wider transition-colors border-b border-[#333] hover:border-[#7D0A0A] pb-1"
            >
              <span>View All Categories</span>
              <ArrowUpRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#222222] border border-[#222222]">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#111111]"
              aria-label={`Browse ${cat.label}`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100 filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-sans tracking-wide uppercase text-[#C8C3B8]">
                  {cat.count}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex flex-col justify-end">
                <span className="text-[11px] text-[#A0A0A0] font-sans tracking-wide block mb-1">
                  {cat.accent}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#F4F4F4] group-hover:text-white transition-colors">
                    {cat.label}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-[#888888] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
