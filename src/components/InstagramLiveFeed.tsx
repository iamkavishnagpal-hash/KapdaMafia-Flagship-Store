'use client';

import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, Play, Volume2 } from 'lucide-react';
import { useWorld } from '@/context/WorldContext';
import { useCart } from '@/context/CartContext';
import { InstagramIcon } from './InstagramIcon';
import SectionHeader from '@/components/ui/SectionHeader';

export interface ReelData {
  id: string;
  handle: string;
  profileUrl: string;
  poster: string;
  caption: string;
  tag: string;
  storeWorld: 'clothing' | 'shoes';
  shoppableProduct?: {
    id: string;
    name: string;
    price: number;
    size: string;
    image: string;
  };
}

const LIVE_REELS: ReelData[] = [
  {
    id: 'reel-km-1',
    handle: '@kapdamafia.store',
    profileUrl: 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly',
    poster: '/media/streetwear-night-lamp.jpg',
    caption: 'Autumn / Winter in motion: Heavyweight 440 GSM Acid wash & Selvedge barrel fit denim on the street.',
    tag: 'Latest Reel',
    storeWorld: 'clothing',
    shoppableProduct: {
      id: 'pl-001',
      name: '440 GSM ACID WASH HOODIE',
      price: 3490,
      size: 'L',
      image: '/media/streetwear-night-lamp.jpg'
    }
  },
  {
    id: 'reel-km-2',
    handle: '@kapdamafia.store',
    profileUrl: 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly',
    poster: '/media/product-cargo.png',
    caption: 'Tactical Baggy Cargos engineered for effortless drape and high-mobility streetwear styling.',
    tag: 'Fit Check',
    storeWorld: 'clothing',
    shoppableProduct: {
      id: 'pl-002',
      name: 'TACTICAL BAGGY CARGOS',
      price: 2890,
      size: '32',
      image: '/media/product-cargo.png'
    }
  },
  {
    id: 'reel-sm-1',
    handle: '@shoesmafia.store',
    profileUrl: 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA==',
    poster: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
    caption: 'Model 1239 High-Street Sneaker on-feet check. Chunky geometric sole with reinforced grip.',
    tag: 'Sneaker Reel',
    storeWorld: 'shoes',
    shoppableProduct: {
      id: 'sm-1239',
      name: 'MODEL 1239 HIGH-STREET SNEAKER',
      price: 1999,
      size: 'UK 8',
      image: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg'
    }
  },
  {
    id: 'reel-sm-2',
    handle: '@shoesmafia.store',
    profileUrl: 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA==',
    poster: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788695961_IMG_2627.PNG',
    caption: 'Model 24 Court High-Top: Classic court silhouette with cushioned ankle support.',
    tag: 'Court Edition',
    storeWorld: 'shoes',
    shoppableProduct: {
      id: 'sm-court-24',
      name: 'MODEL 24 COURT HIGH-TOP',
      price: 2499,
      size: 'UK 9',
      image: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788695961_IMG_2627.PNG'
    }
  }
];

export default function InstagramLiveFeed() {
  const { world } = useWorld();
  const { addToCart, openCart } = useCart();
  const [activeTab, setActiveTab] = useState<'ALL' | 'KAPDA' | 'SHOES'>('ALL');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filteredReels = LIVE_REELS.filter((reel) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'KAPDA') return reel.storeWorld === 'clothing';
    if (activeTab === 'SHOES') return reel.storeWorld === 'shoes';
    return true;
  });

  const handleQuickAdd = (product: NonNullable<ReelData['shoppableProduct']>, reelId: string) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      category: 'Streetwear',
      storeWorld: product.id.startsWith('sm') ? 'shoes' : 'clothing'
    });
    setAddedItem(reelId);
    setTimeout(() => setAddedItem(null), 1800);
    openCart();
  };

  return (
    <section className="relative overflow-hidden bg-[#080808] border-b border-[#1E1E1E] py-20 sm:py-24 text-[#F4F4F4] font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Community & Movement"
          title="Seen in"
          titleAccent="Motion"
          subtitle="Real on-street fits, unboxing looks, and styling videos shared across our official stores."
          action={
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-[#111111] p-1 border border-[#1E1E1E] text-xs">
                {(['ALL', 'KAPDA', 'SHOES'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 font-medium transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#F4F4F4] text-[#080808] font-semibold'
                        : 'text-[#888888] hover:text-[#F4F4F4]'
                    }`}
                  >
                    {tab === 'ALL' ? 'All Reels' : tab === 'KAPDA' ? 'Kapda Mafia' : 'Shoes Mafia'}
                  </button>
                ))}
              </div>

              <a
                href={
                  world === 'shoes'
                    ? 'https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA=='
                    : 'https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#1E1E1E] bg-[#111111] hover:border-[#F4F4F4] text-xs text-[#F4F4F4] font-medium transition-colors"
              >
                <InstagramIcon size={14} />
                <span>Follow on Instagram</span>
                <ExternalLink size={12} />
              </a>
            </div>
          }
        />

        {/* Both Store Handles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <a
            href="https://www.instagram.com/kapdamafia.store?stkn=eGZxam1lbjJ6dHly"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 border border-[#1E1E1E] bg-[#111111] hover:border-[#7D0A0A] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#1E1E1E] bg-[#161616] flex items-center justify-center text-[#7D0A0A]">
                <InstagramIcon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[#F4F4F4]">
                  <span>kapdamafia.store</span>
                  <CheckCircle2 size={13} className="text-sky-400" />
                </div>
                <span className="text-xs text-[#888888]">Menswear Streetwear & Uniforms Flagship</span>
              </div>
            </div>
            <span className="text-xs text-[#C8C3B8] font-medium group-hover:text-white transition-colors flex items-center gap-1">
              View Profile <ExternalLink size={12} />
            </span>
          </a>

          <a
            href="https://www.instagram.com/shoesmafia.store?stkn=MTBpN3B4MmF6NHpxNA=="
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 border border-[#1E1E1E] bg-[#111111] hover:border-[#1a8f7a] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#1E1E1E] bg-[#161616] flex items-center justify-center text-[#1a8f7a]">
                <InstagramIcon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[#F4F4F4]">
                  <span>shoesmafia.store</span>
                  <CheckCircle2 size={13} className="text-sky-400" />
                </div>
                <span className="text-xs text-[#888888]">Exclusive Sneaker Vault & Chunky Runners</span>
              </div>
            </div>
            <span className="text-xs text-[#C8C3B8] font-medium group-hover:text-white transition-colors flex items-center gap-1">
              View Profile <ExternalLink size={12} />
            </span>
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E1E1E] border border-[#1E1E1E]">
          {filteredReels.map((reel) => (
            <div key={reel.id} className="group relative bg-[#111111] flex flex-col justify-between overflow-hidden">
              <div className="relative aspect-[9/14] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={reel.poster}
                  alt={reel.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 bg-black/70 border border-[#1E1E1E] text-[10px] uppercase tracking-wide text-[#C8C3B8]">
                    {reel.tag}
                  </span>
                  <span className="text-[11px] text-[#C8C3B8] font-medium">{reel.handle}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-2">
                  <p className="text-xs text-[#F4F4F4] line-clamp-2 leading-relaxed">
                    {reel.caption}
                  </p>

                  {reel.shoppableProduct && (
                    <button
                      onClick={() => handleQuickAdd(reel.shoppableProduct!, reel.id)}
                      className="w-full py-2 bg-white hover:bg-[#F4F4F4] text-black text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {addedItem === reel.id
                        ? '✓ Added to Bag'
                        : `Shop Fit · ₹${reel.shoppableProduct.price.toLocaleString('en-IN')}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
