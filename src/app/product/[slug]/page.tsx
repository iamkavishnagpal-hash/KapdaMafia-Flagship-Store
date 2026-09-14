'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { ShieldCheck, Truck, RotateCcw, Sparkles, Star } from 'lucide-react';
import SmartSizeModal from '@/components/SmartSizeModal';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const resolvedParams = React.use(params);
  const product = MOCK_PRODUCTS.find(p => p.slug === resolvedParams.slug) || MOCK_PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.sizes[0]?.size || 'M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const activeVariant = product.variants[0];

  return (
    <div className="py-10 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[10px] text-[#8C8C86] uppercase tracking-widest mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#F3F0E8]">HOME</Link> /
          <Link href="/shop" className="hover:text-[#F3F0E8]">SHOP</Link> /
          <span className="text-[#F3F0E8] font-bold">{product.name}</span>
        </div>

        {/* Product Layout (2 Columns Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Gallery (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] bg-[#111111] border border-[#181818] rounded-sm overflow-hidden relative">
              <img 
                src={activeVariant.images[activeImageIndex].url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 border border-[#222222] bg-[#080808]/90 text-[#F3F0E8] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                {product.badge}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {activeVariant.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square bg-[#111111] border rounded-sm overflow-hidden transition-all ${activeImageIndex === idx ? 'border-[#F3F0E8]' : 'border-[#181818] opacity-60 hover:opacity-100'}`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Purchase Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            <div>
              <div className="text-[10px] text-[#8C8C86] uppercase tracking-[0.3em] font-bold mb-1">
                {product.dropName}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#F3F0E8] tracking-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-amber-400 text-xs">
                  <Star size={12} className="fill-amber-400" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                  <span className="text-[#8C8C86] ml-1">({product.reviewCount} REVIEWS)</span>
                </div>
                <span className="text-xs text-[#8C8C86]">GSM: <strong className="text-[#F3F0E8]">{product.gsm}</strong></span>
              </div>
            </div>

            {/* Price Tag */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-[#181818]">
              <span className="text-3xl font-black text-[#F3F0E8]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-[#8C8C86] line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-xs text-[#B8B4AA] leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div className="space-y-3 pt-4 border-t border-[#181818]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C8C86]">SELECT SIZE ({product.fit} SILHOUETTE):</span>
                <Link 
                  href="/ai-fit"
                  className="text-[#8F1118] hover:text-white font-bold flex items-center gap-1 text-[10px] tracking-wider uppercase transition-colors"
                >
                  <Sparkles size={12} /> OPEN IN VIRTUAL TRY-ON →
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs">
                {activeVariant.sizes.map(s => (
                  <button
                    key={s.size}
                    disabled={s.stock === 0}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 border text-center transition-all rounded-none ${
                      selectedSize === s.size 
                        ? 'border-[#8F1118] bg-[#8F1118] text-white font-bold' 
                        : s.stock > 0 
                        ? 'border-[#222222] bg-[#111111] text-[#F3F0E8] hover:border-[#8C8C86]' 
                        : 'border-transparent bg-[#111111]/40 text-[#8C8C86] line-through cursor-not-allowed'
                    }`}
                  >
                    <span className="block text-sm">{s.size}</span>
                    <span className="block text-[8px] mt-0.5 opacity-80">
                      {s.stock === 0 ? 'SOLD OUT' : s.stock <= 3 ? `ONLY ${s.stock} LEFT` : 'IN STOCK'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button 
                onClick={() => {
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: activeVariant.images[0]?.url || '',
                    size: selectedSize,
                    category: product.category,
                    storeWorld: product.storeWorld || 'clothing'
                  });
                  setAddedToBag(true);
                  setTimeout(() => setAddedToBag(false), 2000);
                  openCart();
                }}
                className="w-full py-4 bg-[#8F1118] hover:bg-[#B91C1C] text-white font-bold text-xs tracking-[0.25em] uppercase transition-colors cursor-pointer rounded-none"
              >
                {addedToBag ? '✓ ADDED TO KAPDA BAG' : `ADD TO BAG (${selectedSize}) →`}
              </button>

              <button 
                onClick={() => {
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: activeVariant.images[0]?.url || '',
                    size: selectedSize,
                    category: product.category,
                    storeWorld: 'clothing'
                  });
                  router.push('/checkout?store=clothing');
                }}
                className="block w-full py-4 bg-[#8F1118] hover:bg-[#A8151D] border border-[#8F1118] text-white font-bold text-xs tracking-[0.25em] uppercase text-center transition-colors cursor-pointer shadow-lg shadow-[#8F1118]/20"
              >
                BUY NOW WITH 1-CLICK
              </button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#181818] text-[10px] text-[#8C8C86]">
              <div className="flex items-center gap-1.5">
                <Truck size={14} />
                <span>FREE EXPRESS SHIPPING</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw size={14} />
                <span>7-DAY EXCHANGES</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>100% ORIGINAL</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <SmartSizeModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
