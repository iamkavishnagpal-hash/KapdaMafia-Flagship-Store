'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';
import { useMafiaMirror } from '@/components/MafiaMirrorDrawer';

interface ProductCard360Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard360({ product, priority = false }: ProductCard360Props) {
  const { addToCart, openCart } = useCart();
  const { world } = useWorld();
  const { openMirror } = useMafiaMirror();
  const activeVariant = product.variants[0];
  const isShoes = world === 'shoes' || product.storeWorld === 'shoes';

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
    <article className="group bg-[#080808] border border-[#1E1E1E] hover:border-[#333] transition-all flex flex-col justify-between font-mono relative overflow-hidden">
      
      {/* Product Image Viewport */}
      <div 
        ref={containerRef}
        onPointerEnter={preloadFrames}
        onPointerMove={handlePointerMove}
        onMouseLeave={() => setCurrentFrame(0)}
        onClick={handleMobileTapFlip}
        className="relative aspect-[3/4] bg-[#111111] overflow-hidden select-none touch-pan-y cursor-pointer"
      >
        <Link href={`/product/${product.slug}`} className="block w-full h-full" aria-label={`View ${product.name}`}>
          <img 
            src={frames[currentFrame]} 
            alt={`${product.name} angle ${currentFrame + 1}`}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] contrast-[1.04]"
          />
        </Link>

        {/* Seamless Canvas Gradient Overlay - Blends seamlessly into #080808 canvas like WTFLEX */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/20 pointer-events-none" />

        {/* Live Vault Scarcity HUD Matrix (Gen-Z Urgency Trigger) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none flex items-center justify-between text-[9px] font-mono tracking-widest bg-[#080808]/90 backdrop-blur-md border border-[#1E1E1E] px-2.5 py-1 text-[#888888] uppercase">
          <span className="text-[#F4F4F4] font-bold">RUN: 250 UNITS</span>
          <span className={`${isShoes ? 'text-[#1a8f7a]' : 'text-[#7D0A0A]'} font-bold animate-pulse`}>ONLY {10 + (product.id.charCodeAt(product.id.length - 1) % 7)} LEFT IN SIZE {selectedSize}</span>
        </div>



        {/* Frame Progress Track */}
        {totalFrames > 1 && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/50 flex">
            {frames.map((_, idx) => (
              <div 
                key={idx}
                className={`flex-1 h-full transition-colors ${idx === currentFrame ? 'bg-[#7D0A0A]' : 'bg-transparent'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card consistency vertical stack: Image -> Hairline micro-spec -> Product Title -> Price */}
      <div className="p-4 sm:p-5 bg-[#080808] flex flex-col justify-between flex-1 border-t border-[#1E1E1E] space-y-3">
        
        <div className="space-y-1.5">
          {/* Hairline micro-spec: 440 GSM HEAVY COTTON // BOX CUT (10px Mono) */}
          <div className="text-[10px] font-mono tracking-[0.12em] text-[#888888] uppercase">
            {product.gsm ? `${product.gsm} GSM` : '440 GSM'} HEAVY COTTON // {product.fit ? product.fit.toUpperCase() : 'BOX CUT'}
          </div>

          {/* Product Title: ACID WASH HOODIE (14px Bold) */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-[#F4F4F4] uppercase tracking-[-0.01em] line-clamp-1 hover:text-white transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Price: ₹3,490 (14px Clean Mono/Sans with tabular-nums) & Savings Badge */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm font-bold text-[#F4F4F4] font-mono [font-variant-numeric:tabular-nums] tracking-[-0.01em]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-[#888888] line-through font-normal font-mono [font-variant-numeric:tabular-nums]">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.2">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Color Variant Swatches (Reference 03 Tripr / Genrage) */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.variants.map((v, vIdx) => (
                <span
                  key={v.id || vIdx}
                  className="w-2.5 h-2.5 rounded-full border border-white/30 inline-block shadow-sm"
                  style={{ backgroundColor: v.colorHex || '#222' }}
                  title={v.colorName}
                />
              ))}
              <span className="text-[9px] font-mono text-[#777] uppercase tracking-wider ml-1">
                {product.variants[0]?.colorName || 'ORIGINAL WASH'}
              </span>
            </div>
          )}
        </div>

        {/* Size Pills: Single-tap opens cart drawer directly */}
        <div className="pt-2 border-t border-[#1E1E1E] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[#888888] font-mono tracking-[0.12em]">
            <span>SIZES (TAP TO BAG):</span>
            <span className="text-[#F4F4F4] font-bold">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  setSelectedSize(size);
                  // Direct add to bag & open drawer
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: frames[0],
                    size: size,
                    category: product.category,
                    storeWorld: product.storeWorld || 'clothing'
                  });
                  openCart();
                }}
                className={`min-w-[34px] h-7 px-2 text-[11px] font-mono font-bold uppercase border transition-colors cursor-pointer ${
                  selectedSize === size
                    ? isShoes
                      ? 'border-[#00695c] bg-[#00695c] text-white'
                      : 'border-[#7D0A0A] bg-[#7D0A0A] text-white'
                    : isShoes
                      ? 'border-[#1E1E1E] bg-[#111111] text-[#F4F4F4] hover:border-[#1a8f7a]'
                      : 'border-[#1E1E1E] bg-[#111111] text-[#F4F4F4] hover:border-[#666666]'
                }`}
                aria-label={`Select size ${size} and open cart`}
              >
                {size}
              </button>
            ))}
          </div>


        </div>

      </div>

    </article>
  );
}
