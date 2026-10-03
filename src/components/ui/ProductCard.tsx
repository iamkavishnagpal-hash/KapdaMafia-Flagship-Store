'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import Price from './Price';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const activeVariant = product.variants[0];

  const heroImage = activeVariant?.images[0]?.url || '/media/product-tee.png';
  const secondaryImage = activeVariant?.images[1]?.url || heroImage;

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    activeVariant?.sizes?.[0]?.size || 'M'
  );
  const [added, setAdded] = useState(false);

  const availableSizes = activeVariant?.sizes || [
    { size: 'S', stock: 10 },
    { size: 'M', stock: 10 },
    { size: 'L', stock: 10 },
    { size: 'XL', stock: 10 }
  ];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: heroImage,
      size,
      category: product.category,
      storeWorld: product.storeWorld || 'clothing'
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    openCart();
  };

  // Restrained metadata
  const fabricTag = product.gsm ? `${product.gsm} GSM` : null;
  const fitTag = product.fit ? `${product.fit}` : null;
  const metaLine = [fabricTag, fitTag].filter(Boolean).join(' · ');

  return (
    <article
      className="group bg-[#080808] border border-[#1E1E1E] hover:border-[#383838] transition-all duration-300 flex flex-col justify-between relative shadow-lg hover:shadow-2xl hover:shadow-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Imagery */}
      <div className="relative aspect-[3/4] bg-[#0E0E0E] overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full"
          aria-label={`View ${product.name}`}
        >
          <img
            src={isHovered && secondaryImage !== heroImage ? secondaryImage : heroImage}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] filter contrast-[1.03]"
          />
        </Link>

        {/* Ambient Bottom Gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badge / Drop Label */}
        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-[#E5E5E5] uppercase font-semibold">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick Add Overlay on Image Hover for Desktop */}
        <div className="absolute bottom-3 left-3 right-3 hidden sm:flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => handleQuickAdd(e, selectedSize)}
            className="w-full py-2.5 bg-white text-black hover:bg-[#F4F4F4] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xl flex items-center justify-center gap-1.5"
          >
            {added ? (
              <>
                <Check size={14} className="text-emerald-700" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add ({selectedSize}) · ₹{product.price.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 bg-[#080808]">
        <div className="space-y-1.5">
          {metaLine && (
            <div className="text-[10px] sm:text-[11px] font-mono font-medium text-[#7D0A0A] uppercase tracking-wider">
              {metaLine}
            </div>
          )}

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm sm:text-base font-semibold text-[#F4F4F4] group-hover:text-white transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="pt-0.5">
            <Price amount={product.price} originalAmount={product.originalPrice} size="sm" />
          </div>
        </div>

        {/* Size Selection Pills */}
        <div className="pt-3 border-t border-[#1E1E1E] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-sans text-[#888888]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#777]">Sizes:</span>
            {added && <span className="text-[#1a8f7a] font-medium text-xs">✓ In Bag</span>}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {availableSizes.map((s) => {
              const isOutOfStock = s.stock === 0;
              const isSelected = selectedSize === s.size;
              return (
                <button
                  key={s.size}
                  type="button"
                  disabled={isOutOfStock}
                  onClick={(e) => {
                    setSelectedSize(s.size);
                    handleQuickAdd(e, s.size);
                  }}
                  className={`min-w-[34px] sm:min-w-[36px] h-7 sm:h-8 px-2 text-xs font-mono font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#7D0A0A] bg-[#7D0A0A] text-white font-bold'
                      : isOutOfStock
                      ? 'border-[#181818] bg-[#111111]/40 text-[#555555] line-through cursor-not-allowed'
                      : 'border-[#1E1E1E] bg-[#111111] text-[#E0E0E0] hover:border-[#666] hover:bg-[#161616]'
                  }`}
                  aria-label={`Select size ${s.size} and add to bag`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
