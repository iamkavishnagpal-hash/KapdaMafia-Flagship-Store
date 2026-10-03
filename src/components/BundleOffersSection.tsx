'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, Zap, Percent, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { playSubBassThud } from '@/utils/soundEffects';

interface BundleOffer {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  pieces: string;
  originalTotal: number;
  bundlePrice: number;
  savingsPercentage: number;
  image: string;
  items: {
    productId: string;
    name: string;
    price: number;
    image: string;
    size: string;
    category: any;
  }[];
}

const BUNDLE_OFFERS: BundleOffer[] = [
  {
    id: 'bundle-01',
    badge: 'STREET DUO // BEST VALUE',
    title: 'THE CORE UNIFORM PACK',
    subtitle: 'Dark Blue Barrel Fit Jeans + Monochrome Striped Boxy Tee',
    pieces: '2 PIECE SET (TOPWEAR + BOTTOMWEAR)',
    originalTotal: 3348,
    bundlePrice: 2899,
    savingsPercentage: 13,
    image: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
    items: [
      {
        productId: 'pl-001',
        name: 'DARK BLUE BARREL FIT JEANS',
        price: 1899,
        image: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
        size: '32',
        category: 'denim'
      },
      {
        productId: 'pl-002',
        name: 'BLACK AND WHITE STRIPED T-SHIRT',
        price: 1000,
        image: 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304',
        size: 'L',
        category: 'tees'
      }
    ]
  },
  {
    id: 'bundle-02',
    badge: 'CO-ORD ARCHIVE // SAVE ₹700',
    title: 'THE STEALTH LOUNGE SUIT',
    subtitle: 'Black Paneled Baggy Trackpant + Natural Embroidery Linen Shirt',
    pieces: '2 PIECE CO-ORD ENSEMBLE',
    originalTotal: 2998,
    bundlePrice: 2499,
    savingsPercentage: 17,
    image: 'https://www.powerlook.in/cdn/shop/files/7_3x_888d77c3-7b5a-4a6f-bf88-66c15809bf99.jpg?v=1787637637',
    items: [
      {
        productId: 'pl-005',
        name: 'BLACK PANELED BAGGY TRACKPANT',
        price: 1599,
        image: 'https://www.powerlook.in/cdn/shop/files/7_3x_888d77c3-7b5a-4a6f-bf88-66c15809bf99.jpg?v=1787637637',
        size: 'M',
        category: 'cargos'
      },
      {
        productId: 'pl-008',
        name: 'NATURAL EMBROIDERY LINEN SHIRT',
        price: 900,
        image: 'https://www.powerlook.in/cdn/shop/files/1497220.jpg?v=1779534340',
        size: 'M',
        category: 'tees'
      }
    ]
  }
];

export default function BundleOffersSection() {
  const { addToCart, openCart } = useCart();
  const [addedBundle, setAddedBundle] = useState<string | null>(null);

  const handleClaimBundle = (bundle: BundleOffer) => {
    playSubBassThud();
    bundle.items.forEach(item => {
      addToCart({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.size,
        category: item.category,
        storeWorld: 'clothing'
      });
    });

    setAddedBundle(bundle.id);
    setTimeout(() => {
      setAddedBundle(null);
      openCart();
    }, 600);
  };

  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 sm:py-24 text-[#F4F4F4] font-mono">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#7D0A0A] font-bold uppercase tracking-[0.14em] mb-1.5">
              <Tag size={12} />
              <span>STREETWEAR BUNDLES &amp; MULTI-BUY DISCOUNTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.04em] text-[#F4F4F4]">
              Curated Wardrobe <span className="text-[#888888]">Bundles</span>
            </h2>
          </div>
          <div className="text-xs text-[#888888] tracking-widest uppercase">
            <span>BUY TOP + BOTTOM · SAVE UP TO ₹700 ON CHECKOUT</span>
          </div>
        </div>

        {/* 2-Column Responsive Bundle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BUNDLE_OFFERS.map(bundle => (
            <div 
              key={bundle.id}
              className="bg-[#111111] border border-[#1E1E1E] hover:border-[#383838] transition-all flex flex-col sm:flex-row overflow-hidden group shadow-xl"
            >
              {/* Bundle Imagery (Left / Top) */}
              <div className="relative sm:w-2/5 aspect-[3/4] sm:aspect-auto bg-[#0a0a0a] overflow-hidden flex-shrink-0">
                <img 
                  src={bundle.image} 
                  alt={bundle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-[#7D0A0A] text-white px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                  <Percent size={11} />
                  <span>SAVE {bundle.savingsPercentage}%</span>
                </div>
              </div>

              {/* Bundle Content & Action (Right) */}
              <div className="p-5 sm:p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] text-[#888888] uppercase tracking-[0.12em] font-semibold mb-1">
                    {bundle.badge}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#F4F4F4] tracking-tight leading-tight">
                    {bundle.title}
                  </h3>
                  <div className="text-[11px] text-[#7D0A0A] uppercase font-bold tracking-wider mt-1">
                    {bundle.pieces}
                  </div>
                  <p className="text-xs text-[#999999] leading-relaxed mt-2.5">
                    {bundle.subtitle}
                  </p>
                </div>

                {/* Price Matrix */}
                <div className="pt-3 border-t border-[#1E1E1E] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase block">COMBO PRICE</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-[#F4F4F4] [font-variant-numeric:tabular-nums]">
                          ₹{bundle.bundlePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#888888] line-through [font-variant-numeric:tabular-nums]">
                          ₹{bundle.originalTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1">
                      SAVE ₹{(bundle.originalTotal - bundle.bundlePrice).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* 1-Tap Bundle Add Button */}
                  <button
                    onClick={() => handleClaimBundle(bundle)}
                    className="w-full py-3.5 bg-white hover:bg-[#F4F4F4] active:scale-[0.99] text-black font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <ShoppingBag size={14} />
                    <span>{addedBundle === bundle.id ? '✓ BUNDLE ADDED TO BAG' : 'CLAIM COMPLETE BUNDLE'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
