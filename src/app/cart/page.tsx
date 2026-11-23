'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Shirt, Footprints, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';

export default function DedicatedCartPage() {
  const router = useRouter();
  const { 
    activeItems, 
    clothingItems,
    shoeItems,
    activeTotal, 
    activeCount, 
    clothingCount,
    shoeCount,
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();
  const { world, setWorld } = useWorld();

  const isShoes = world === 'shoes';
  const freeShippingThreshold = isShoes ? 999 : 1999;
  const amountAway = freeShippingThreshold - activeTotal;
  const shipping = activeTotal >= freeShippingThreshold || activeTotal === 0 ? 0 : 99;
  const finalTotal = activeTotal + shipping;

  return (
    <div className="py-10 bg-[#080808] min-h-screen text-[#F4F4F4] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-4">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-xs text-[#888888] hover:text-[#F4F4F4] uppercase transition-colors"
          >
            <ArrowLeft size={14} />
            <span>CONTINUE SHOPPING</span>
          </Link>
          <div className="text-[10px] text-[#888888] uppercase tracking-wider">
            YOUR BAG · SECURE CHECKOUT
          </div>
        </div>

        {/* Dual World Switcher in Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isShoes ? 'text-[#00695c]' : 'text-[#7D0A0A]'}`}>
              {isShoes ? 'SHOES MAFIA FOOTWEAR BAG' : 'KAPDA MAFIA APPAREL BAG'}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F4F4F4]">
              SHOPPING BAG <span className="text-[#888888]">({activeCount})</span>
            </h1>
          </div>

          {/* World Selector Tabs */}
          <div className="inline-flex items-center bg-[#111111] p-1 border border-[#1E1E1E] text-xs">
            <button
              onClick={() => setWorld('clothing')}
              className={`px-4 py-2 flex items-center gap-2 uppercase font-bold transition-all cursor-pointer ${
                !isShoes ? 'bg-[#7D0A0A] text-white shadow-md' : 'text-[#888888] hover:text-white'
              }`}
            >
              <Shirt size={14} />
              <span>KAPDA ({clothingCount})</span>
            </button>
            <button
              onClick={() => setWorld('shoes')}
              className={`px-4 py-2 flex items-center gap-2 uppercase font-bold transition-all cursor-pointer ${
                isShoes ? 'bg-[#00695c] text-white shadow-md' : 'text-[#888888] hover:text-white'
              }`}
            >
              <Footprints size={14} />
              <span>SHOES ({shoeCount})</span>
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#111111] border border-[#1E1E1E] text-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#888888]">
              {amountAway > 0 
                ? `ADD ₹${amountAway.toLocaleString('en-IN')} MORE TO QUALIFY FOR FREE EXPRESS DISPATCH` 
                : '✓ FREE AIR DISPATCH UNLOCKED'}
            </span>
            <span className="text-[10px] text-[#666666]">THRESHOLD: ₹{freeShippingThreshold}</span>
          </div>
          <div className="w-full h-1.5 bg-[#1E1E1E] overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isShoes ? 'bg-[#00695c]' : 'bg-[#7D0A0A]'}`} 
              style={{ width: `${Math.min(100, (activeTotal / freeShippingThreshold) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Cart Main Content Grid */}
        {activeItems.length === 0 ? (
          <div className="py-24 text-center bg-[#111111] border border-[#1E1E1E] p-8 space-y-4">
            <div className="w-16 h-16 mx-auto bg-[#080808] border border-[#1E1E1E] flex items-center justify-center text-[#888888]">
              {isShoes ? <Footprints size={28} /> : <Shirt size={28} />}
            </div>
            <h2 className="text-xl font-bold uppercase text-[#F4F4F4]">
              YOUR {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} BAG IS EMPTY
            </h2>
            <p className="text-xs text-[#888888] max-w-sm mx-auto">
              You haven't allocated any pieces from this store yet. Explore the releases and acquire your size.
            </p>
            <div className="pt-2">
              <Link 
                href={isShoes ? '/shoes' : '/shop'}
                className={`inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all ${
                  isShoes ? 'bg-[#00695c] hover:bg-[#00796b]' : 'bg-[#7D0A0A] hover:bg-[#991B1B]'
                }`}
              >
                <span>EXPLORE {isShoes ? 'FOOTWEAR' : 'STREETWEAR'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Items List (8 Columns) */}
            <div className="lg:col-span-8 space-y-3">
              {activeItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#111111] border border-[#1E1E1E] hover:border-[#333333] p-4 flex gap-4 transition-all"
                >
                  <div className="w-24 h-28 bg-[#0a0a0a] overflow-hidden flex-shrink-0 border border-[#1E1E1E]">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-[#F4F4F4]">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#666666] hover:text-red-400 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#888888] mt-1">
                        SIZE: <strong className="text-white">{item.size}</strong> · {item.category.toUpperCase()}
                      </div>
                      <div className="text-[10px] text-[#666666] mt-0.5 uppercase">
                        ORIGINAL {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} SPEC
                      </div>
                    </div>

                    <div className="flex justify-between items-end pt-3 border-t border-[#1E1E1E]">
                      <div className="flex items-center border border-[#1E1E1E] bg-[#0a0a0a] px-2.5 py-1 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-1 text-[#666666] hover:text-white cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-1 text-[#666666] hover:text-white cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-base font-bold text-[#F4F4F4] [font-variant-numeric:tabular-nums]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary (4 Columns Sticky) */}
            <div className="lg:col-span-4 bg-[#111111] border border-[#1E1E1E] p-6 space-y-6 sticky top-28">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#F4F4F4] pb-3 border-b border-[#1E1E1E]">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs text-[#888888]">
                <div className="flex justify-between">
                  <span>ITEMS SUB-TOTAL</span>
                  <span className="text-[#F4F4F4] font-bold">₹{activeTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>EXPRESS DISPATCH</span>
                  <span className="text-[#F4F4F4]">
                    {shipping === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST &amp; TAXES</span>
                  <span className="text-emerald-400 font-bold">INCLUDED (12%)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E1E1E] flex justify-between items-baseline">
                <span className="text-xs uppercase text-[#888888]">TOTAL</span>
                <span className="text-2xl font-black text-[#F4F4F4] [font-variant-numeric:tabular-nums]">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => router.push(`/checkout?store=${world}`)}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                    isShoes ? 'bg-[#00695c] hover:bg-[#00796b]' : 'bg-[#7D0A0A] hover:bg-[#991B1B]'
                  }`}
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="p-3 bg-[#080808] border border-[#1E1E1E] text-[10px] text-[#666666] space-y-1">
                <div>• Zero spam / 100% verified encrypted dispatch</div>
                <div>• Pan-India tracked delivery in 3–4 business days</div>
                <div>• 7-day hassle-free replacement guarantee</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
