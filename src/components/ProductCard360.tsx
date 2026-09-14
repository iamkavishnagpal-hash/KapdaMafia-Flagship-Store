'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Eye, ShoppingBag, Rotate3D, Check, ShieldAlert, X } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';

interface ProductCard360Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard360({ product, priority = false }: ProductCard360Props) {
  const { addToCart, openCart } = useCart();
  const activeVariant = product.variants[0];

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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

  // Fetch real available stock from /api/inventory
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

  // Mobile Tap-to-Spin / Dual-frame flip (Never freezes page vertical scroll)
  const handleMobileTapSpin = (e: React.MouseEvent) => {
    preloadFrames();
    setCurrentFrame(prev => (prev + 1) % totalFrames);
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
    setMobileDrawerOpen(false);
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  return (
    <>
      <article className="group bg-[#090909] border border-[#1c1c1c] hover:border-[#333] transition-colors rounded-none flex flex-col justify-between font-mono">
        
        {/* 360 Scrubbing Container with touch-action: pan-y (Zero Mobile Scroll Freezing) */}
        <div 
          ref={containerRef}
          onPointerEnter={preloadFrames}
          onPointerMove={handlePointerMove}
          onMouseEnter={() => setIsScrubbing(true)}
          onMouseLeave={() => { setIsScrubbing(false); setCurrentFrame(0); }}
          className="relative aspect-[3/4] bg-[#0f0f0f] overflow-hidden select-none touch-pan-y"
        >
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <img 
              src={frames[currentFrame]} 
              alt={`${product.name} angle ${currentFrame + 1}`}
              loading={priority ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop 360 Badge */}
          <div className="hidden sm:flex absolute top-2.5 right-2.5 bg-black/85 border border-[#262626] px-2 py-0.5 items-center gap-1 text-[8px] tracking-widest text-[#EEEAE1] uppercase">
            <Rotate3D size={11} className={isScrubbing ? 'text-[#8F1118] animate-spin' : 'text-[#77746E]'} />
            <span>{isScrubbing ? `ANGLE ${currentFrame + 1}/${totalFrames}` : '360° SCRUB'}</span>
          </div>

          {/* Mobile Tap-to-Spin Pill (Eliminates Touch Scroll Interception) */}
          <button
            type="button"
            onClick={handleMobileTapSpin}
            className="sm:hidden absolute top-2 right-2 bg-black/90 border border-white/20 px-2 py-1 flex items-center gap-1 text-[8px] font-bold tracking-wider text-white uppercase active:scale-90 transition-transform"
          >
            <Rotate3D size={10} className="text-[#8F1118]" />
            <span>{currentFrame === 0 ? 'SPIN' : `${currentFrame + 1}/${totalFrames}`}</span>
          </button>

          {/* Quiet Drop Badge */}
          <div className="absolute top-2 left-2 bg-black/85 border border-[#262626] px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8px] font-bold tracking-widest text-[#C8C3B8] uppercase">
            {product.badge || 'KAPDA'}
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

          {/* Quick View Button on Desktop Hover */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            <Link 
              href={`/product/${product.slug}`}
              className="w-full bg-[#EEEAE1] hover:bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase py-2 flex items-center justify-center gap-2 shadow-lg"
            >
              <Eye size={12} /> VIEW SPEC
            </Link>
          </div>
        </div>

        {/* Compact Brutalist Monospace Metadata */}
        <div className="p-2.5 sm:p-4 bg-[#0a0a0a] flex flex-col justify-between flex-1 space-y-2">
          
          <div>
            <div className="flex justify-between items-baseline gap-1">
              <span className="text-[8px] sm:text-[9px] text-[#77746E] tracking-widest uppercase truncate">
                {product.category} {product.gsm ? `• ${product.gsm}G` : ''}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#EEEAE1] shrink-0">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="text-[11px] sm:text-xs font-bold text-[#F3F0E8] uppercase tracking-wide line-clamp-1 mt-0.5 hover:text-[#8F1118] transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Desktop Size Selector & Add To Bag */}
          <div className="hidden sm:block pt-2 border-t border-[#181818] space-y-2">
            <div className="flex items-center justify-between text-[9px] text-[#77746E]">
              <span>SIZE:</span>
              {availableStock > 0 && availableStock <= 3 && (
                <span className="text-[#8F1118] font-bold flex items-center gap-1">
                  <ShieldAlert size={10} /> ONLY {availableStock} LEFT
                </span>
              )}
              {availableStock === 0 && (
                <span className="text-red-500 font-bold">SOLD OUT</span>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {activeVariant?.sizes?.map(s => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  className={`px-1.5 py-0.5 text-[9px] font-bold uppercase transition-all rounded-none border ${
                    selectedSize === s.size 
                      ? 'border-[#8F1118] bg-[#8F1118] text-white' 
                      : 'border-[#222] bg-[#111] text-[#C8C3B8] hover:border-[#444]'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={availableStock === 0}
              className={`w-full py-2 text-[9px] font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-1.5 transition-all rounded-none ${
                availableStock === 0
                  ? 'bg-[#181818] text-[#555] cursor-not-allowed border border-[#222]'
                  : isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#141414] hover:bg-[#8F1118] text-[#EEEAE1] hover:text-white border border-[#262626] hover:border-[#8F1118]'
              }`}
            >
              {isAdded ? <Check size={11} /> : <ShoppingBag size={11} />}
              {isAdded ? 'ADDED' : `ADD TO BAG (${selectedSize})`}
            </button>
          </div>

          {/* Mobile Tap Trigger for Bottom Sheet Drawer */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="sm:hidden w-full py-2 bg-[#141414] active:bg-[#8F1118] text-[#EEEAE1] text-[10px] font-bold tracking-wider uppercase border border-[#262626] flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={11} />
            <span>QUICK ADD</span>
          </button>

        </div>

      </article>

      {/* MOBILE BOTTOM SHEET FOR INSTANT SIZE SELECTOR (GEN-Z THUMB ZONE) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm sm:hidden flex flex-col justify-end animate-fade-in font-mono">
          <div className="bg-[#0c0c0c] border-t border-[#262626] p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-[#1c1c1c] pb-3">
              <div>
                <span className="text-[9px] text-[#77746E] uppercase">{product.category}</span>
                <h4 className="text-xs font-bold text-white uppercase">{product.name}</h4>
                <div className="text-sm font-bold text-[#8F1118] mt-1">₹{product.price.toLocaleString('en-IN')}</div>
              </div>
              <button 
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-[#77746E]">
                <span>SELECT SIZE:</span>
                {availableStock <= 3 && (
                  <span className="text-[#8F1118] font-bold">ONLY {availableStock} LEFT</span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {activeVariant?.sizes?.map(s => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2.5 text-xs font-bold uppercase border transition-colors ${
                      selectedSize === s.size
                        ? 'border-[#8F1118] bg-[#8F1118] text-white'
                        : 'border-[#222] bg-[#141414] text-[#C8C3B8]'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleQuickAdd}
              className="w-full py-3.5 bg-[#8F1118] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} /> CONFIRM &amp; ADD ({selectedSize})
            </button>

          </div>
        </div>
      )}
    </>
  );
}
