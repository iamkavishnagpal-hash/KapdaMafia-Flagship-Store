'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Rocket, Share2, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
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
    }, 3000);
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

    showToast(`Added ${product.name} (UK ${size}) to Shoes Mafia Bag!`);
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
    <div className="bg-[#0b0f12] text-[#f0f4f8] font-sans min-h-screen">
      
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#009688] text-white px-5 py-3 rounded-xl shadow-2xl font-mono text-xs tracking-wider flex items-center gap-2 animate-bounce">
          <span>✓</span> {toastMessage}
        </div>
      )}

      {/* Bunnyboss Style Hero Banner Slider / Marquee */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#111c24] via-[#1a2936] to-[#0f1820] border-b border-white/10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#009688]/20 border border-[#009688]/40 text-[#009688] text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4">
            🔥 KAPDA MAFIA VERIFIED FOOTWEAR
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            SHOES <span className="text-[#009688]">MAFIA</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to the footwear vault of Kapda Mafia. Performance runners, chunky street sneakers, and court high-tops at direct-to-consumer prices.
          </p>

          {/* Kapda Mafia hotline & Faridabad store address pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-gray-300 font-mono">
            <a 
              href="tel:08375000819" 
              className="flex items-center gap-1.5 text-[#009688] font-bold hover:underline"
            >
              📞 Call Now: 083750 00819
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a 
              href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwigr4D5oOyWAxUAAAAAHQAAAAAQBQ..i&rlz=1C1PNFE_enIN1090IN1091&fvr=1&pvq=Cg0vZy8xMXl6ZDFuOW04IhEKC2thcGRhIG1hZmlhEAIYAw&lqi=CgtrYXBkYSBtYWZpYUjozOjA-b2AgAhaHRAAEAEYABgBIgtrYXBkYSBtYWZpYSoGCAIQABABkgEOY2xvdGhpbmdfc3RvcmU&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cdd1ee5a5bafd:0xc177aa65e376a724" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors text-left sm:text-center"
            >
              📍 Ground Floor, 5G-38, Block G, New Industrial Twp 5, Faridabad, Haryana 121001
            </a>
          </div>

        </div>
      </div>

      {/* Category Navigation Bar (Bunnyboss exact categories) */}
      <div className="sticky top-[96px] z-30 bg-[#16212b]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-3 gap-3 font-mono text-xs">
          
          <div className="flex items-center gap-2 sm:gap-4">
            {[
              { label: 'ALL SHOES', value: 'ALL' },
              { label: 'SPORT SHOES', value: 'SPORT SHOES' },
              { label: 'SNEAKER SHOES', value: 'Sneaker Shoes' },
              { label: 'FORMAL SHOES', value: 'FORMAL SHOES' }
            ].map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg uppercase tracking-wider font-bold transition-all text-[11px] whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#009688] text-white shadow-lg shadow-[#009688]/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-gray-400 tracking-widest uppercase hidden md:block">
            SHOWING {filteredShoes.length} MODELS
          </div>
        </div>
      </div>

      {/* Trust Feature Strip */}
      <div className="border-b border-white/10 bg-[#0e171f] py-4 font-mono text-xs text-gray-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Truck size={16} className="text-[#009688]" />
            <span>Fast Express Dispatch</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RotateCcw size={16} className="text-[#009688]" />
            <span>7-Day Replacement</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-[#009688]" />
            <span>100% Genuine Sole</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Headphones size={16} className="text-[#009688]" />
            <span>Direct Call & WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Product Grid (Exact Bunnyboss Layout: Product Cards with Size Selectors + Split CTAs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredShoes.map(shoe => {
            const currentVariant = shoe.variants[0];
            const heroImage = currentVariant?.images[0]?.url || 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg';
            const availableSizes = currentVariant?.sizes || [];
            const selectedSize = selectedSizes[shoe.id] || availableSizes[0]?.size || '7';

            return (
              <div
                key={shoe.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121c24] p-3 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#009688]/60 hover:shadow-2xl hover:shadow-[#009688]/10"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#192633] mb-3">
                  <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-[#009688] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                    {shoe.badge || 'NEW'}
                  </span>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `KAPDA MAFIA SHOES ${shoe.name}`,
                          url: window.location.href
                        }).catch(() => {});
                      } else {
                        showToast(`Copied link for ${shoe.name}!`);
                      }
                    }}
                    className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-[#009688] transition-colors"
                    title="Share Product"
                  >
                    <Share2 size={12} />
                  </button>

                  <img
                    src={heroImage}
                    alt={shoe.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Body Details */}
                <div className="text-center font-mono">
                  <div className="text-[10px] uppercase tracking-widest text-[#009688] font-bold mb-1">
                    KAPDA MAFIA FOOTWEAR
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white mb-2">
                    {shoe.name}
                  </h3>

                  {/* Size Selector Pills */}
                  <div className="flex items-center justify-center gap-1.5 my-3 flex-wrap">
                    {availableSizes.map(s => {
                      const isSelected = selectedSize === s.size;
                      const isOutOfStock = s.stock === 0;

                      return (
                        <button
                          key={s.size}
                          disabled={isOutOfStock}
                          onClick={() => handleSelectSize(shoe.id, s.size)}
                          className={`h-7 min-w-[28px] px-1.5 text-xs font-bold rounded flex items-center justify-center transition-all cursor-pointer ${
                            isOutOfStock
                              ? 'bg-white/5 text-gray-600 line-through cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#009688] text-white ring-2 ring-[#009688]'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-center gap-2 my-2">
                    <span className="text-lg sm:text-xl font-bold text-white">
                      ₹{shoe.price}.00
                    </span>
                    {shoe.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{shoe.originalPrice}.00
                      </span>
                    )}
                  </div>
                </div>

                {/* Bunnyboss Action Split: Add to Cart + Order Now */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 font-mono">
                  <button
                    onClick={() => handleAddToCart(shoe)}
                    className="flex items-center justify-center gap-1 rounded-lg bg-white/10 py-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-200 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <ShoppingCart size={13} />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Cart</span>
                  </button>

                  <button
                    onClick={() => handleOrderNow(shoe)}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[#009688] py-2.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#00796b] shadow-md shadow-[#009688]/30 transition-all cursor-pointer"
                  >
                    <Rocket size={13} />
                    <span>Order Now</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Live Instagram Feed & Social Vault */}
      <InstagramLiveFeed />

    </div>
  );
}
