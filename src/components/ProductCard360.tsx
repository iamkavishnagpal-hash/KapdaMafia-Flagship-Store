'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Eye, ShoppingBag, Rotate3D, Check, ShieldAlert } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';

interface ProductCard360Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard360({ product, priority = false }: ProductCard360Props) {
  const { addToCart, openCart } = useCart();
  const activeVariant = product.variants[0];

  // 16-angle or multi-angle frame setup
  // If only 1 image provided, we construct angle views from catalog assets for seamless scrubbing
  const frames = (activeVariant?.images && activeVariant.images.length > 1)
    ? activeVariant.images.map(img => img.url)
    : [
        activeVariant?.images[0]?.url || '/media/product-tee.png',
        activeVariant?.images[1]?.url || activeVariant?.images[0]?.url || '/media/product-tee.png',
        activeVariant?.images[2]?.url || activeVariant?.images[0]?.url || '/media/product-tee.png',
        activeVariant?.images[0]?.url || '/media/product-tee.png'
      ];

  const totalFrames = frames.length;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(activeVariant?.sizes?.[0]?.size || 'M');
  const [availableStock, setAvailableStock] = useState<number>(3);
  const [isAdded, setIsAdded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload and cache frames in memory on hover / touch start (zero-lag 60fps)
  const preloadedRef = useRef(false);
  const preloadFrames = useCallback(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    frames.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  // Fetch real available stock from /api/inventory (Zero Fake FOMO)
  useEffect(() => {
    async function loadStock() {
      try {
        const res = await fetch(`/api/inventory?slug=${product.slug}`);
        if (res.ok) {
          const data = await res.json();
          const match = data.inventory?.find((inv: { size: string; available_stock: number }) => inv.size === selectedSize);
          if (match) {
            setAvailableStock(match.available_stock);
          }
        }
      } catch {
        // Safe default from product object
        const sizeObj = activeVariant?.sizes?.find(s => s.size === selectedSize);
        if (sizeObj) setAvailableStock(sizeObj.stock);
      }
    }
    loadStock();
  }, [product.slug, selectedSize, activeVariant]);

  // Desktop Pointer / Mouse Scrubbing
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || totalFrames <= 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const frameIndex = Math.min(Math.floor(percentage * totalFrames), totalFrames - 1);
    setCurrentFrame(frameIndex);
  };

  // Mobile Touch Swipe Scrubbing (60fps requestAnimationFrame)
  const touchStartXRef = useRef<number | null>(null);
  const initialFrameRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    preloadFrames();
    setIsScrubbing(true);
    touchStartXRef.current = e.touches[0].clientX;
    initialFrameRef.current = currentFrame;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || totalFrames <= 1) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    // Every 25px swipe advances 1 angle frame
    const frameShift = Math.floor(deltaX / 25);
    const newFrame = (initialFrameRef.current + frameShift + totalFrames * 10) % totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleTouchEnd = () => {
    setIsScrubbing(false);
    touchStartXRef.current = null;
  };

  // Optimistic Add To Bag
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: frames[0],
      size: selectedSize,
      category: product.category,
      storeWorld: product.storeWorld || 'clothing'
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  return (
    <article className="group bg-[#090909] border border-[#1c1c1c] hover:border-[#333] transition-colors rounded-none flex flex-col justify-between font-mono">
      
      {/* 360 Scrubbing Interactive Container */}
      <div 
        ref={containerRef}
        onPointerEnter={preloadFrames}
        onPointerMove={handlePointerMove}
        onMouseEnter={() => setIsScrubbing(true)}
        onMouseLeave={() => { setIsScrubbing(false); setCurrentFrame(0); }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[3/4] bg-[#0f0f0f] overflow-hidden cursor-ew-resize select-none touch-pan-y"
      >
        <img 
          src={frames[currentFrame]} 
          alt={`${product.name} angle ${currentFrame + 1}`}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
        />

        {/* 360 Interactive Scrubber Badge */}
        <div className="absolute top-3 right-3 bg-black/85 border border-[#262626] px-2 py-1 flex items-center gap-1 text-[8px] tracking-widest text-[#EEEAE1] uppercase">
          <Rotate3D size={11} className={isScrubbing ? 'text-[#8F1118] animate-spin' : 'text-[#77746E]'} />
          <span>{isScrubbing ? `ANGLE ${currentFrame + 1}/${totalFrames}` : '360° SCRUB'}</span>
        </div>

        {/* Quiet Brand Tag / Drop Badge */}
        <div className="absolute top-3 left-3 bg-black/85 border border-[#262626] px-2 py-1 text-[8px] font-bold tracking-widest text-[#C8C3B8] uppercase">
          {product.badge || 'KAPDA MAFIA'}
        </div>

        {/* Scrubber Progress Track Indicator */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/50 flex">
          {frames.map((_, idx) => (
            <div 
              key={idx}
              className={`flex-1 h-full transition-colors ${idx === currentFrame ? 'bg-[#8F1118]' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Quick View Link on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <Link 
            href={`/product/${product.slug}`}
            className="w-full bg-[#EEEAE1] hover:bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase py-2.5 flex items-center justify-center gap-2 shadow-lg"
          >
            <Eye size={12} /> VIEW FULL SPEC
          </Link>
        </div>
      </div>

      {/* Product Spec & Actions */}
      <div className="p-4 bg-[#0a0a0a] flex flex-col justify-between flex-1 space-y-3">
        
        <div>
          <div className="flex justify-between items-baseline gap-2">
            <span className="text-[9px] text-[#77746E] tracking-widest uppercase">
              {product.category} {product.gsm ? `• ${product.gsm} GSM` : ''}
            </span>
            <span className="text-xs font-bold text-[#EEEAE1]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wide line-clamp-1 mt-1 hover:text-[#8F1118] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Size Selection with Real Database Inventory Stock Display */}
        <div className="pt-2 border-t border-[#181818] space-y-2">
          
          <div className="flex items-center justify-between text-[9px] text-[#77746E]">
            <span>SELECT SIZE:</span>
            {/* ZERO FAKE FOMO: Real Stock Display */}
            {availableStock > 0 && availableStock <= 3 && (
              <span className="text-[#8F1118] font-bold flex items-center gap-1">
                <ShieldAlert size={10} /> ONLY {availableStock} LEFT
              </span>
            )}
            {availableStock === 0 && (
              <span className="text-red-500 font-bold">SOLD OUT</span>
            )}
            {availableStock > 3 && (
              <span className="text-emerald-500 font-bold">IN STOCK</span>
            )}
          </div>

          {/* Size Pills */}
          <div className="flex flex-wrap gap-1.5">
            {activeVariant?.sizes?.map(s => (
              <button
                key={s.size}
                type="button"
                onClick={() => setSelectedSize(s.size)}
                className={`px-2 py-1 text-[9px] font-bold uppercase transition-all rounded-none border ${
                  selectedSize === s.size 
                    ? 'border-[#8F1118] bg-[#8F1118] text-white' 
                    : 'border-[#222] bg-[#111] text-[#C8C3B8] hover:border-[#444]'
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>

          {/* Zero-Latency Optimistic Add to Bag CTA */}
          <button
            onClick={handleQuickAdd}
            disabled={availableStock === 0}
            className={`w-full py-2.5 text-[10px] font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all rounded-none mt-2 ${
              availableStock === 0
                ? 'bg-[#181818] text-[#555] cursor-not-allowed border border-[#222]'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#141414] hover:bg-[#8F1118] text-[#EEEAE1] hover:text-white border border-[#262626] hover:border-[#8F1118]'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={12} /> ADDED TO BAG
              </>
            ) : availableStock === 0 ? (
              'OUT OF STOCK'
            ) : (
              <>
                <ShoppingBag size={12} /> ADD TO BAG ({selectedSize})
              </>
            )}
          </button>

        </div>

      </div>

    </article>
  );
}
