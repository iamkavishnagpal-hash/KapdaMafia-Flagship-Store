'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = 2499;
  const freeShippingThreshold = 3200;
  const amountAway = freeShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#080808]/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#080808] border-l border-[#181818] h-full flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-[#181818] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wider">YOUR BAG</span>
            <span className="text-xs text-[#8F1118] font-bold">(1 ITEM)</span>
          </div>
          <button onClick={onClose} className="p-2 text-[#B8B4AA] hover:text-[#F3F0E8] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#111111] px-6 py-3 border-b border-[#181818] font-mono text-[11px]">
          {amountAway > 0 ? (
            <p className="text-[#B8B4AA]">
              ADD <span className="text-[#F3F0E8] font-bold">₹{amountAway}</span> MORE TO UNLOCK <span className="text-[#8F1118] font-bold">FREE EXPRESS SHIPPING</span>
            </p>
          ) : (
            <p className="text-[#8F1118] font-bold">✓ YOU HAVE UNLOCKED FREE EXPRESS SHIPPING!</p>
          )}
          <div className="w-full h-1 bg-[#181818] mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-[#8F1118] transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex gap-4 p-4 bg-[#111111] border border-[#181818] rounded-sm">
            <div className="w-20 h-24 bg-[#181818] flex-shrink-0 overflow-hidden">
              <img 
                src="/media/product-tee.png" 
                alt="Mafia Crest Oversized Tee" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between font-mono">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-[#F3F0E8] uppercase tracking-wide">MAFIA CREST OVERSIZED TEE</h4>
                  <button className="text-[#8C8C86] hover:text-[#8F1118] transition-colors"><Trash2 size={14} /></button>
                </div>
                <div className="text-[10px] text-[#8C8C86] mt-1">SIZE: L • CHARCOAL BLACK</div>
                <div className="text-[10px] text-[#8F1118] mt-0.5 font-bold">400 GSM FRENCH TERRY</div>
              </div>
              <div className="flex justify-between items-end pt-2">
                <div className="flex items-center border border-[#222222] bg-[#080808] px-2 py-0.5 text-xs text-[#F3F0E8]">
                  <button className="px-1 text-[#8C8C86] hover:text-[#F3F0E8]">-</button>
                  <span className="px-2 font-bold">1</span>
                  <button className="px-1 text-[#8C8C86] hover:text-[#F3F0E8]">+</button>
                </div>
                <span className="text-sm font-bold text-[#F3F0E8]">₹2,499</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Checkout Summary */}
        <div className="p-6 border-t border-[#181818] bg-[#111111] space-y-4 font-mono">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#B8B4AA]">
              <span>SUBTOTAL</span>
              <span>₹2,499</span>
            </div>
            <div className="flex justify-between text-[#B8B4AA]">
              <span>ESTIMATED SHIPPING</span>
              <span>₹99</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#F3F0E8] pt-2 border-t border-[#181818]">
              <span>TOTAL (TAX INCL.)</span>
              <span className="text-[#F3F0E8]">₹2,598</span>
            </div>
          </div>

          <Link 
            href="/checkout" 
            onClick={onClose}
            className="w-full py-4 bg-[#8F1118] hover:bg-[#B91C1C] text-white font-mono font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-colors"
          >
            PROCEED TO CHECKOUT <ArrowRight size={16} />
          </Link>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8C86]">
            <ShieldCheck size={14} className="text-[#8F1118]" />
            SECURE PREPAID & CASH ON DELIVERY (COD)
          </div>
        </div>

      </div>
    </div>
  );
}
