'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShieldCheck, Shirt, Footprints, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    activeItems, 
    removeFromCart, 
    updateQuantity, 
    activeTotal, 
    activeCount,
    clothingCount,
    shoeCount
  } = useCart();
  const { world, setWorld } = useWorld();

  if (!isCartOpen) return null;

  const isShoes = world === 'shoes';
  const freeShippingThreshold = isShoes ? 999 : 1999;
  const amountAway = freeShippingThreshold - activeTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end font-mono text-[#F3F0E8] animate-fade-in">
      <div 
        className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l transition-colors duration-300 ${
          isShoes 
            ? 'bg-[#0b1318] border-[#009688]/30' 
            : 'bg-[#0a0a0a] border-white/15'
        }`}
      >
        
        {/* Top Header & Store Brand Indicator */}
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className={`flex h-6 w-6 items-center justify-center rounded-md ${
                isShoes ? 'bg-[#009688] text-white' : 'bg-[#8F1118] text-white'
              }`}>
                {isShoes ? <Footprints size={14} /> : <Shirt size={14} />}
              </span>
              <div>
                <span className="text-sm font-black uppercase tracking-wider block">
                  {isShoes ? 'SHOES MAFIA BAG' : 'KAPDA MAFIA BAG'}
                </span>
                <span className="text-[9px] text-[#8C8C86] tracking-widest uppercase">
                  INDEPENDENT STORE BAG ({activeCount} {activeCount === 1 ? 'ITEM' : 'ITEMS'})
                </span>
              </div>
            </div>

            <button 
              onClick={closeCart} 
              className="p-2 text-[#B8B4AA] hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Dual-Bag Switcher Tab inside Cart (Swiggy/Instamart style!) */}
          <div className="grid grid-cols-2 p-2 bg-black/40 border-b border-white/10 text-xs">
            <button
              onClick={() => setWorld('clothing')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 font-bold transition-all cursor-pointer ${
                !isShoes 
                  ? 'bg-[#8F1118] text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shirt size={12} />
              <span>KAPDA ({clothingCount})</span>
            </button>

            <button
              onClick={() => setWorld('shoes')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 font-bold transition-all cursor-pointer ${
                isShoes 
                  ? 'bg-[#009688] text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Footprints size={12} />
              <span>SHOES ({shoeCount})</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-white/5 px-6 py-3 border-b border-white/10 text-[11px]">
            {amountAway > 0 ? (
              <p className="text-gray-300">
                ADD <span className="text-white font-bold">₹{amountAway}</span> MORE FOR <span className={isShoes ? 'text-[#80cbc4] font-bold' : 'text-[#8F1118] font-bold'}>FREE EXPRESS SHIPPING</span>
              </p>
            ) : (
              <p className={isShoes ? 'text-[#80cbc4] font-bold' : 'text-emerald-400 font-bold'}>
                ✓ YOU UNLOCKED FREE EXPRESS SHIPPING!
              </p>
            )}
            <div className="w-full h-1.5 bg-black/60 mt-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isShoes ? 'bg-[#009688]' : 'bg-[#8F1118]'}`} 
                style={{ width: `${Math.min(100, (activeTotal / freeShippingThreshold) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Active Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
                {isShoes ? <Footprints size={28} className="text-gray-600" /> : <Shirt size={28} className="text-gray-600" />}
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                YOUR {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} BAG IS EMPTY
              </p>
              <p className="text-[10px] text-gray-500 mt-1 max-w-xs">
                Explore the latest {isShoes ? 'footwear runner collection' : '400 GSM oversized uniforms'} and add your size.
              </p>
              <button
                onClick={closeCart}
                className={`mt-4 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white ${
                  isShoes ? 'bg-[#009688] hover:bg-[#00796b]' : 'bg-[#8F1118] hover:bg-[#a6151e]'
                }`}
              >
                START BROWSING
              </button>
            </div>
          ) : (
            activeItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all"
              >
                <div className="w-20 h-24 bg-black/50 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wide text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-gray-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      SIZE: <strong className="text-white">{item.size}</strong> • {item.category.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      ORIGINAL {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} SPEC
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div className="flex items-center border border-white/20 bg-black/60 rounded px-2 py-0.5 text-xs text-white">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-1 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2 font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-1 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>STORE</span>
              <span className="text-white font-bold">{isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>BAG SUBTOTAL</span>
              <span>₹{activeTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>ESTIMATED SHIPPING</span>
              <span>{amountAway <= 0 ? 'FREE' : '₹99'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>TOTAL (TAX INCL.)</span>
              <span className={isShoes ? 'text-[#80cbc4]' : 'text-white'}>
                ₹{(activeTotal + (amountAway <= 0 ? 0 : 99)).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Link 
              href={`/checkout?store=${isShoes ? 'shoes' : 'clothing'}&quick=upi`} 
              onClick={closeCart}
              className="w-full py-3.5 bg-[#F3F0E8] hover:bg-white text-[#050505] font-black text-xs tracking-[0.2em] uppercase flex flex-col items-center justify-center gap-0.5 transition-all shadow-xl cursor-pointer"
            >
              <span>⚡ 1-CLICK INSTANT UPI</span>
              <span className="text-[9px] font-bold text-[#666] tracking-widest font-mono">GPAY · PHONEPE · PAYTM</span>
            </Link>

            <Link 
              href={`/checkout?store=${isShoes ? 'shoes' : 'clothing'}`} 
              onClick={closeCart}
              className={`w-full py-3 text-white font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer border ${
                activeItems.length === 0
                  ? 'opacity-50 pointer-events-none bg-gray-700'
                  : isShoes
                  ? 'bg-[#009688] hover:bg-[#00796b] border-[#80cbc4]/40'
                  : 'bg-[#8F1118] hover:bg-[#a6151e] border-[#B91C1C]/40'
              }`}
            >
              <span>PROCEED TO STANDARD CHECKOUT</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <ShieldCheck size={14} className={isShoes ? 'text-[#009688]' : 'text-[#8F1118]'} />
            <span>SECURE PREPAID & CASH ON DELIVERY (COD)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
