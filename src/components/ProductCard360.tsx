// src/components/ProductCard360.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';
import { playMechanicalClick } from '@/utils/soundEffects';

interface ProductCard360Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard360({ product, priority = false }: ProductCard360Props) {
  const { addToCart, openCart } = useCart();
  const { world } = useWorld();
  const activeVariant = product.variants[0];
  const isShoes = world === 'shoes' || product.storeWorld === 'shoes';

  const images = useMemo(() => {
    if (activeVariant?.images && activeVariant.images.length > 0) {
      return activeVariant.images.map(img => img.url);
    }
    return ['/media/product-tee.png'];
  }, [activeVariant]);

  const primaryImage = images[0] || '/media/product-tee.png';
  const secondaryImage = images[1] || images[0] || '/media/product-tee.png';

  const [mobileAngle, setMobileAngle] = useState(0);

  // Available Sizes with Stock Tracking
  const sizesWithStock = useMemo(() => {
    if (activeVariant?.sizes && activeVariant.sizes.length > 0) {
      return activeVariant.sizes.map(s => ({
        size: s.size,
        inStock: (s.stock ?? 1) > 0
      }));
    }
    return [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true }
    ];
  }, [activeVariant]);

  const allOutOfStock = sizesWithStock.every(s => !s.inStock);
  const [selectedSize, setSelectedSize] = useState<string>(
    sizesWithStock.find(s => s.inStock)?.size || sizesWithStock[0]?.size || 'M'
  );

  // Calculate Single Badge (Rule: Maximum 1 badge per card)
  const singleBadge = useMemo(() => {
    if (allOutOfStock) {
      return { text: 'SOLD OUT', bg: 'bg-[#2B2B2B] text-[#888888]' };
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      return { text: `SAVE ${discount}%`, bg: isShoes ? 'bg-[#00695c] text-white' : 'bg-[#B6191A] text-white' };
    }
    if (product.badge?.toUpperCase().includes('BEST') || product.isFeatured) {
      return { text: 'BESTSELLER', bg: 'bg-white text-black font-bold' };
    }
    return null;
  }, [allOutOfStock, product, isShoes]);

  // Instant 1-Tap Size Click to Bag
  const handleSizeClick = (e: React.MouseEvent, size: string, inStock: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;

    playMechanicalClick();
    setSelectedSize(size);

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      size: size,
      category: product.category,
      storeWorld: product.storeWorld || (isShoes ? 'shoes' : 'clothing')
    });

    openCart();
  };

  return (
    <article className="group bg-[#080808] border border-[#1E1E1E] hover:border-[#383838] transition-colors flex flex-col justify-between relative overflow-hidden">
      
      {/* Product Image Viewport (3:4 Portrait Aspect Ratio) */}
      <div 
        onClick={() => setMobileAngle(prev => (prev === 0 ? 1 : 0))}
        className="relative aspect-[3/4] bg-[#111111] overflow-hidden select-none cursor-pointer"
      >
        <Link href={`/product/${product.slug}`} className="block w-full h-full" aria-label={`View ${product.name}`}>
          {/* Primary Front Shot */}
          <img
            src={mobileAngle === 0 ? primaryImage : secondaryImage}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Desktop Hover Image Cross-Fade to 2nd Angle */}
          {images.length > 1 && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="hidden lg:block absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </Link>

        {/* Single Status Badge (Top-Left) */}
        {singleBadge && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className={`text-xs tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm shadow-md font-bold ${singleBadge.bg}`}>
              {singleBadge.text}
            </span>
          </div>
        )}
      </div>

      {/* Product Information Card Body */}
      <div className="p-4 sm:p-5 bg-[#080808] flex flex-col justify-between flex-1 border-t border-[#1E1E1E] space-y-3">
        
        <div className="space-y-1">
          {/* Subtle Fabric & Fit Subtitle */}
          <div className="text-xs tracking-[0.06em] text-[#888888] uppercase">
            {product.gsm ? `${product.gsm} GSM Cotton` : 'Heavyweight Cotton'} · {product.fit ? `${product.fit} Cut` : 'Boxy Cut'}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-semibold text-[#F4F4F4] group-hover:text-white transition-colors line-clamp-1 font-sans">
              {product.name}
            </h3>
          </Link>

          {/* Pricing Row: Sale Price & Strikethrough MRP */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-sm font-bold text-white [font-variant-numeric:tabular-nums]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#888888] line-through [font-variant-numeric:tabular-nums]">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Clean Single-Row Size Selector Pills (1-Tap to Bag) */}
        <div className="pt-2.5 border-t border-[#1E1E1E]">
          <div className="text-xs text-[#888888] tracking-[0.08em] uppercase mb-1.5">
            Select size to bag:
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {sizesWithStock.map(({ size, inStock }) => (
              <button
                key={size}
                type="button"
                disabled={!inStock}
                onClick={(e) => handleSizeClick(e, size, inStock)}
                className={`min-h-11 min-w-11 px-2 text-xs font-bold uppercase border transition-all cursor-pointer rounded-sm ${
                  !inStock
                    ? 'border-[#1C1C1C] bg-[#0D0D0D] text-[#555555] line-through cursor-not-allowed opacity-40'
                    : selectedSize === size
                    ? isShoes
                      ? 'border-[#00695c] bg-[#00695c] text-white shadow-sm'
                      : 'border-[#B6191A] bg-[#B6191A] text-white shadow-sm'
                    : 'border-[#222222] bg-[#111111] text-[#E5E5E5] hover:border-white hover:text-white'
                }`}
                aria-label={`Select size ${size}`}
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
