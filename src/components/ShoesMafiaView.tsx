'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Share2, ShieldCheck, Truck, RotateCcw, Footprints, Eye } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import InstagramLiveFeed from './InstagramLiveFeed';

interface ShoesMafiaViewProps {
  products: Product[];
}

export default function ShoesMafiaView({ products }: ShoesMafiaViewProps) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter products by shoe category
  const filteredShoes = products.filter(p => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'SPORT SHOES') return p.shoeCategory === 'SPORT SHOES';
    if (activeCategory === 'Sneaker Shoes') return p.shoeCategory === 'Sneaker Shoes';
    if (activeCategory === 'FORMAL SHOES') return p.shoeCategory === 'FORMAL SHOES';
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.variants[0]?.sizes[0]?.size || '7';
    const heroImage = product.variants[0]?.images[0]?.url || 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg';
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: heroImage,
      size: `UK ${size}`,
      category: product.shoeCategory || 'Footwear',
      storeWorld: 'shoes'
    });

    showToast(`COMMITTED: ${product.name} (UK ${size})`);
    openCart();
  };

  const handleOrderNow = (product: Product) => {
    const size = selectedSizes[product.id] || product.variants[0]?.sizes[0]?.size || '7';
    const heroImage = product.variants[0]?.images[0]?.url || 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg';

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: heroImage,
      size: `UK ${size}`,
      category: product.shoeCategory || 'Footwear',
      storeWorld: 'shoes'
    });

    router.push('/checkout?store=shoes');
  };

  return (
    <div className="bg-[#070b0e] text-[#EEEAE1] font-mono min-h-screen selection:bg-[#009688]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#009688] text-white px-5 py-3 shadow-2xl font-mono text-xs tracking-wider flex items-center gap-2 border border-teal-400">
          <span>✓</span> {toastMessage}
        </div>
      )}

      {/* Luxury Brutalist Sneaker Vault Hero */}
      <div className="relative border-b border-[#142028] bg-gradient-to-b from-[#0a1217] to-[#070b0e] py-14 sm:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#09181f] border border-[#009688]/40 text-[#009688] text-xs font-bold tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009688] animate-ping" />
            <span>Official Footwear Division</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-white font-editorial leading-[0.88]">
            SHOES <span className="text-[#009688]">MAFIA</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#8a9ba8] max-w-2xl mx-auto leading-relaxed tracking-tight">
            High-street silhouettes, performance runners, and court high-tops calibrated for underground streetwear styling. Verified sole fabrication.
          </p>

          {/* Faridabad Store Pill */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 bg-[#0a141a] border border-[#1a2d38] p-3 sm:p-4 text-xs text-[#8a9ba8]">
            <span className="text-[#009688] font-bold">Concierge: 083750 00819</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-[#c1d1db]">NIT-5 Flagship Store · Faridabad</span>
          </div>

        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="sticky top-[64px] sm:top-[68px] z-30 bg-[#0a141b]/95 backdrop-blur-md border-b border-[#162733] shadow-xl">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-3 gap-3 font-mono text-xs">
          
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { label: 'ALL SILHOUETTES', value: 'ALL' },
              { label: 'SPORT RUNNERS', value: 'SPORT SHOES' },
              { label: 'SNEAKER SHOES', value: 'Sneaker Shoes' },
              { label: 'FORMAL HIGH-STREET', value: 'FORMAL SHOES' }
            ].map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`min-h-[38px] px-3.5 py-2 uppercase tracking-wider font-bold transition-all text-xs whitespace-nowrap cursor-pointer border ${
                  activeCategory === cat.value
                    ? 'bg-[#009688] text-white border-[#009688] shadow-md shadow-[#009688]/30'
                    : 'bg-[#0e1b24] text-[#8a9ba8] border-[#162733] hover:text-white hover:border-[#2a4457]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#6d8291] tracking-widest uppercase hidden md:block">
            SHOWING {filteredShoes.length} VAULT MODELS
          </div>
        </div>
      </div>

      {/* Trust Feature Strip */}
      <div className="border-b border-[#142028] bg-[#091117] py-3.5 font-mono text-xs text-[#8a9ba8]">
        <div className="max-w-[1600px] mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Truck size={15} className="text-[#009688]" />
            <span className="uppercase tracking-wider">EXPRESS PRIORITY TRANSIT</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RotateCcw size={15} className="text-[#009688]" />
            <span className="uppercase tracking-wider">7-DAY SIZE REPLACEMENT</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={15} className="text-[#009688]" />
            <span className="uppercase tracking-wider">100% GENUINE SOLE DENSITY</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Footprints size={15} className="text-[#009688]" />
            <span className="uppercase tracking-wider">FARIDABAD STORE STOCK</span>
          </div>
        </div>
      </div>

      {/* Bespoke Architectural Sneaker Grid */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#142028] border border-[#142028]">
          {filteredShoes.map(shoe => {
            const currentVariant = shoe.variants[0];
            const heroImage = currentVariant?.images[0]?.url || 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg';
            const availableSizes = currentVariant?.sizes || [];
            const selectedSize = selectedSizes[shoe.id] || availableSizes[0]?.size || '7';

            return (
              <article
                key={shoe.id}
                className="group relative flex flex-col justify-between bg-[#080e12] hover:bg-[#0b141a] transition-colors font-mono"
              >
                {/* Image Canvas with Spec Tag */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#060b0e]">
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#009688] px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                    {shoe.badge || 'KM-SOLE'}
                  </div>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `KAPDA MAFIA SHOES ${shoe.name}`,
                          url: window.location.href
                        }).catch(() => {});
                      } else {
                        showToast(`Link copied for ${shoe.name}!`);
                      }
                    }}
                    className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center bg-black/60 text-white border border-white/10 hover:bg-[#009688] transition-colors"
                    title="Share Spec"
                  >
                    <Share2 size={13} />
                  </button>

                  <img
                    src={heroImage}
                    alt={shoe.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Body Details */}
                <div className="p-3 sm:p-4 border-t border-[#142028] space-y-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#009688] font-bold">
                      {shoe.shoeCategory || 'FOOTWEAR DIVISION'}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white mt-1 line-clamp-1">
                      {shoe.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm sm:text-base font-black text-white">
                        ₹{shoe.price.toLocaleString('en-IN')}
                      </span>
                      {shoe.originalPrice && (
                        <span className="text-xs text-[#556977] line-through">
                          ₹{shoe.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size Selector Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs text-[#6d8291] uppercase tracking-wider block">UK SIZE:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {availableSizes.map(s => {
                        const isSelected = selectedSize === s.size;
                        const isOutOfStock = s.stock === 0;

                        return (
                          <button
                            key={s.size}
                            disabled={isOutOfStock}
                            onClick={() => handleSelectSize(shoe.id, s.size)}
                            className={`h-7 min-w-[28px] px-2 text-xs font-bold flex items-center justify-center transition-all cursor-pointer border ${
                              isOutOfStock
                                ? 'bg-white/5 text-gray-600 line-through border-transparent'
                                : isSelected
                                ? 'bg-[#009688] text-white border-[#009688]'
                                : 'bg-[#0e1a22] text-[#8a9ba8] border-[#1b2c38] hover:border-[#355266]'
                            }`}
                          >
                            {s.size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTAs: 1-Tap Add to Cart + Direct Order */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#142028]">
                    <button
                      onClick={() => handleAddToCart(shoe)}
                      className="flex min-h-[38px] items-center justify-center gap-1.5 bg-[#101c24] border border-[#1b2f3d] hover:border-white/30 py-2.5 text-xs font-bold uppercase tracking-wider text-[#d1e0ea] transition-colors cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      <span>ADD BAG</span>
                    </button>

                    <button
                      onClick={() => handleOrderNow(shoe)}
                      className="flex min-h-[38px] items-center justify-center gap-1.5 bg-[#009688] hover:bg-[#007a6e] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                    >
                      <span>ORDER NOW</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      </div>

      {/* Social Live Feed */}
      <InstagramLiveFeed />

    </div>
  );
}
