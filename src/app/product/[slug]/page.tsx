'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { ShieldCheck, Truck, RotateCcw, Sparkles, Star } from 'lucide-react';
import SmartSizeModal from '@/components/SmartSizeModal';
import PhysicalStoreCompanion from '@/components/PhysicalStoreCompanion';
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
              <div className="text-[10px] sm:text-[11px] text-[#888888] uppercase font-mono tracking-[0.12em] font-medium mb-1">
                {product.dropName} · ARCHIVE ALLOCATION
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#F4F4F4] tracking-[-0.05em] leading-[0.95]">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-amber-400 text-xs font-mono tracking-[0.12em]">
                  <Star size={12} className="fill-amber-400" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                  <span className="text-[#888888] ml-1">({product.reviewCount} REVIEWS)</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.12em] text-[#888888]">
                  GSM: <strong className="text-[#F4F4F4]">{product.gsm || '440'}</strong>
                </span>
              </div>
            </div>

            {/* Price Tag: Tier 3 Tabular Numbers & Discount Badge */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-[#1E1E1E]">
              <span className="text-3xl font-bold text-[#F4F4F4] tracking-[-0.01em] [font-variant-numeric:tabular-nums]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-[#888888] line-through [font-variant-numeric:tabular-nums] font-mono tracking-[0.12em]">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Tripr / Genrage Color Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#888]">
                  <span>COLOR: <strong className="text-white">{product.variants[0]?.colorName}</strong></span>
                  <span className="text-[10px] text-[#777]">AUTHENTIC WASH</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id || i}
                      className="w-7 h-7 rounded-full border-2 border-white/80 p-0.5 flex items-center justify-center cursor-pointer shadow-md"
                      title={v.colorName}
                    >
                      <span className="w-full h-full rounded-full" style={{ backgroundColor: v.colorHex || '#222' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-Buy / Bundle Incentive (Tripr convention) */}
            <div className="p-3 bg-[#111111] border border-[#222222] text-xs font-mono text-[#A0A0A0] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">BUY ANY 2 PIECES → GET EXTRA ₹300 OFF</span>
                <span className="text-[10px] text-[#777]">Automated discount applied at instant checkout</span>
              </div>
              <span className="px-2 py-1 bg-[#7D0A0A] text-white font-bold text-[10px]">COMBO CODE: KM300</span>
            </div>

            <p className="text-xs text-[#B8B4AA] leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div className="space-y-3 pt-4 border-t border-[#181818]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#666666] font-mono">SELECT SIZE ({product.fit} SILHOUETTE):</span>
                <Link 
                  href="/ai-fit"
                  className="text-[#7D0A0A] hover:text-white font-mono font-bold flex items-center gap-1 text-[10px] tracking-widest uppercase transition-colors"
                >
                  <Sparkles size={12} /> PROPORTIONAL DRAPE LAB →
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

            {/* In-Store Physical Store Companion */}
            <PhysicalStoreCompanion product={product} selectedSize={selectedSize} />

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
