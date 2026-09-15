'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { useMafiaMirror } from '@/components/MafiaMirrorDrawer';

interface ProductCard360Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard360({ product, priority = false }: ProductCard360Props) {
  const { addToCart, openCart } = useCart();
  const { openMirror } = useMafiaMirror();
  const activeVariant = product.variants[0];

  const frames = useMemo(() => {
    return (activeVariant?.images && activeVariant.images.length > 1)
      ? activeVariant.images.map(img => img.url)
      : [
          activeVariant?.images[0]?.url || '/media/product-tee.png',
          activeVariant?.images[1]?.url || activeVariant?.images[0]?.url || '/media/product-tee.png',
          activeVariant?.images[0]?.url || '/media/product-tee.png'
        ];
  }, [activeVariant]);

  const totalFrames = frames.length;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(activeVariant?.sizes?.[0]?.size || 'M');
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

  // Desktop Pointer / Mouse Scrubbing for angles
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || totalFrames <= 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const frameIndex = Math.min(Math.floor(percentage * totalFrames), totalFrames - 1);
    setCurrentFrame(frameIndex);
  };

  // Mobile Tap-to-Flip
  const handleMobileTapFlip = () => {
    preloadFrames();
    setCurrentFrame(prev => (prev + 1) % totalFrames);
  };

  // 1-Click Quick Add
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

  const handleOpenMirror = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openMirror(product);
  };

  const availableSizes = activeVariant?.sizes?.map(s => s.size) || ['S', 'M', 'L', 'XL'];

  return (
    <article className="group bg-[#080808] border border-[#161616] hover:border-[#333] transition-all flex flex-col justify-between font-mono relative overflow-hidden">
      
      {/* Product Image Viewport */}
      <div 
        ref={containerRef}
        onPointerEnter={preloadFrames}
        onPointerMove={handlePointerMove}
        onMouseLeave={() => setCurrentFrame(0)}
        onClick={handleMobileTapFlip}
        className="relative aspect-[3/4] bg-[#0c0c0c] overflow-hidden select-none touch-pan-y cursor-pointer"
      >
        <Link href={`/product/${product.slug}`} className="block w-full h-full" aria-label={`View ${product.name}`}>
          <img 
            src={frames[currentFrame]} 
            alt={`${product.name} angle ${currentFrame + 1}`}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] contrast-[1.04]"
          />
        </Link>

        {/* Issue 17 & 18 Fix: Standardized Virtual Mirror label + accessible 44px touch target */}
        <button
          onClick={handleOpenMirror}
          className="absolute top-3 right-3 min-h-[44px] px-3.5 py-2 bg-black/90 hover:bg-black border border-white/25 hover:border-white/60 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md flex items-center gap-2 transition-all shadow-xl z-10 cursor-pointer"
          title="Open Virtual Mirror Studio"
          aria-label={`Virtual Mirror try on for ${product.name}`}
        >
          <span className="text-[#8F1118]">✦</span>
          <span>Virtual Mirror</span>
        </button>

        {/* Subtle Frame Progress Track */}
        {totalFrames > 1 && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/40 flex">
            {frames.map((_, idx) => (
              <div 
                key={idx}
                className={`flex-1 h-full transition-colors ${idx === currentFrame ? 'bg-[#8F1118]' : 'bg-transparent'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Issue 19 & 26 Fix: Generous padding & vertical breathing room */}
      <div className="p-4 sm:p-5 bg-[#080808] flex flex-col justify-between flex-1 border-t border-[#161616] space-y-3">
        
        <div>
          {/* Subtle Fabric & Fit Spec */}
          <div className="text-xs text-[#8C8C86] tracking-wider uppercase mb-1">
            {product.gsm ? `${product.gsm} GSM · ` : '400 GSM · '}{product.fit || 'OVERSIZED FIT'}
          </div>

          {/* Issue 9 Fix: Scannable product name in Title Case */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-bold text-[#F3F0E8] capitalize tracking-normal line-clamp-1 hover:text-white transition-colors">
              {product.name.toLowerCase()}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1.5">
            <span className="text-sm font-black text-white tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#666] line-through font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Issue 20 Fix: Interactive Size Selector eliminating default size confusion */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#8C8C86]">
            <span>SELECT SIZE:</span>
            <span className="text-white font-bold">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`min-w-[32px] h-7 px-2 text-xs font-mono font-bold uppercase border transition-colors cursor-pointer ${
                  selectedSize === size
                    ? 'border-[#8F1118] bg-[#8F1118] text-white'
                    : 'border-white/15 bg-black/40 text-[#C8C3B8] hover:border-white/40'
                }`}
                aria-pressed={selectedSize === size}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Issue 19 Fix: Separated Add to Bag button with generous breathing room */}
          <button 
            type="button" 
            onClick={handleQuickAdd}
            className="w-full h-10 mt-2 bg-[#EEEAE1] hover:bg-white active:bg-emerald-600 active:text-white text-black text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
            aria-label={`Add ${product.name} in size ${selectedSize} to bag`}
          >
            {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
            <span>{isAdded ? 'Added to Bag' : `Add to Bag (${selectedSize})`}</span>
          </button>
        </div>

      </div>

    </article>
  );
}
