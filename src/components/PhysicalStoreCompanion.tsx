'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QrCode, Sparkles, MapPin, ArrowRight, ShieldCheck, Truck, RotateCcw, X, Smartphone } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';

interface PhysicalStoreCompanionProps {
  product: Product;
  selectedSize: string;
}

export default function PhysicalStoreCompanion({ product, selectedSize }: PhysicalStoreCompanionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, openCart } = useCart();
  const [orderDelivered, setOrderDelivered] = useState(false);

  const activeVariant = product.variants[0];

  const handleOrderHomeDelivery = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: activeVariant?.images[0]?.url || '',
      size: selectedSize,
      category: product.category,
      storeWorld: product.storeWorld || 'clothing'
    });
    setOrderDelivered(true);
    setTimeout(() => {
      openCart();
    }, 400);
  };

  return (
    <>
      {/* Subtle In-Store Companion Banner */}
      <div className="p-3.5 bg-[#0F0F0F] border border-[#222222] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#7D0A0A]">
            <MapPin size={14} />
          </div>
          <div>
            <span className="text-[#F4F4F4] font-semibold block text-[11px]">
              PHYSICAL STORE COMPANION
            </span>
            <span className="text-[#888888] text-[10px]">
              Standing in NIT-5 Faridabad? Check real rack stock or order home delivery.
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-2.5 py-1 bg-[#1E1E1E] hover:bg-[#282828] text-[#C8C3B8] hover:text-white border border-[#333] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Smartphone size={12} />
          <span>In-Store Mode</span>
        </button>
      </div>

      {/* In-Store Interactive Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-mono text-[#F4F4F4]">
          <div className="relative w-full max-w-lg bg-[#111111] border border-[#262626] p-6 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#222] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#1F1415] border border-[#7D0A0A]/40 text-[#7D0A0A] text-[10px] uppercase font-bold tracking-widest mb-1.5">
                  <MapPin size={11} />
                  <span>FLAGSHIP STORE // NIT-5 FARIDABAD</span>
                </div>
                <h3 className="text-lg font-bold uppercase text-[#F4F4F4]">
                  Physical Store Companion
                </h3>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#888888] hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Rack Stock Status */}
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-[#888888] flex justify-between">
                <span>RACK AVAILABILITY · SIZE {selectedSize}:</span>
                <span className="text-emerald-400 font-bold">✓ AVAILABLE IN AISLE 2</span>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#1E1E1E] text-xs space-y-1">
                <div className="text-[#CCCCCC]">
                  <strong>Trial Fitting Room:</strong> Try on sample on Rack A-14.
                </div>
                <div className="text-[#888888] text-[11px]">
                  Need a different size or out of carry bag space? We will pack fresh unboxed inventory from our warehouse and dispatch direct to your doorstep.
                </div>
              </div>
            </div>

            {/* Seamless In-Store to Home Delivery Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleOrderHomeDelivery}
                className="w-full py-3.5 bg-[#7D0A0A] hover:bg-[#991111] text-white font-bold text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Truck size={14} />
                <span>Order Unboxed Piece for Free Home Delivery</span>
              </button>

              <Link
                href="/ai-fit"
                className="w-full py-3 bg-[#181818] hover:bg-[#222] border border-[#333] text-[#C8C3B8] hover:text-white font-bold text-xs tracking-[0.15em] uppercase transition-colors text-center block"
              >
                Open Virtual Try-On Mirror →
              </Link>
            </div>

            {/* Verification Guarantee */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1E1E1E] text-[10px] text-[#777]">
              <span>Direct Flagship Fulfillment</span>
              <span>100% Tax Invoiced</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
