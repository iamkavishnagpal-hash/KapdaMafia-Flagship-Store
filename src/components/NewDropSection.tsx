'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import { Product } from '@/types/ecommerce';

interface NewDropProps {
  products: Product[];
}

export default function NewDropSection({ products }: NewDropProps) {
  const featuredProduct = products[0];
  const secondaryProducts = products.slice(1, 4);

  if (!featuredProduct) return null;

  return (
    <section className="py-24 bg-[#080808] border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-[10px] font-mono text-[#8C8C86] uppercase tracking-[0.3em] font-bold mb-1">
              DROP 09 • RELEASE CATALOG
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F3F0E8] uppercase">
              NEW DROP <span className="text-[#8C8C86] font-normal">/ AFTER DARK</span>
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="mt-4 md:mt-0 text-[11px] font-mono tracking-widest text-[#B8B4AA] hover:text-[#F3F0E8] transition-colors flex items-center gap-2"
          >
            VIEW ALL PRODUCTS ({products.length.toString().padStart(2, '0')}) →
          </Link>
        </div>

        {/* Editorial Product Reveal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Large Hero Featured Product Card (7 Columns) */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#181818] rounded-sm overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#181818]">
              <img 
                src={featuredProduct.variants[0].images[0].url} 
                alt={featuredProduct.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Quiet Editorial Badge */}
              <div className="absolute top-4 left-4 border border-[#222222] bg-[#080808]/90 text-[#F3F0E8] text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1">
                {featuredProduct.badge} • {featuredProduct.dropName}
              </div>

              {/* Quick View Trigger */}
              <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Link 
                  href={`/product/${featuredProduct.slug}`}
                  className="w-full bg-[#F3F0E8] text-[#080808] text-xs font-mono font-bold uppercase tracking-wider py-3 flex items-center justify-center gap-2 hover:bg-[#B8B4AA] transition-colors"
                >
                  <Eye size={14} /> QUICK VIEW
                </Link>
              </div>
            </div>

            <div className="p-6 bg-[#111111] font-mono">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] text-[#8C8C86] uppercase tracking-wider">{featuredProduct.category} • {featuredProduct.gsm} GSM</span>
                  <h3 className="text-lg font-bold text-[#F3F0E8] uppercase tracking-wide">{featuredProduct.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#F3F0E8]">₹{featuredProduct.price.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-[#B8B4AA] line-clamp-1 mb-4">{featuredProduct.tagline}</p>
            </div>
          </div>

          {/* Secondary 3 Products (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 font-mono">
            {secondaryProducts.map(product => (
              <div key={product.id} className="bg-[#111111] border border-[#181818] p-4 flex gap-4 rounded-sm group hover:border-[#222222] transition-colors">
                <div className="relative w-28 aspect-square bg-[#181818] overflow-hidden flex-shrink-0">
                  <img 
                    src={product.variants[0].images[0].url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-[#8C8C86] uppercase border border-[#222222] px-1.5 py-0.5">{product.badge}</span>
                      <span className="text-xs font-bold text-[#F3F0E8]">₹{product.price.toLocaleString()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wide line-clamp-1 mt-1">{product.name}</h4>
                    <p className="text-[10px] text-[#8C8C86] line-clamp-1 mt-0.5">{product.tagline}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-[10px] text-[#B8B4AA]">
                    <span>{product.fit} SILHOUETTE</span>
                    <Link 
                      href={`/product/${product.slug}`}
                      className="text-[#F3F0E8] hover:text-[#B8B4AA] font-bold tracking-wider flex items-center gap-1 uppercase"
                    >
                      VIEW SPEC <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
