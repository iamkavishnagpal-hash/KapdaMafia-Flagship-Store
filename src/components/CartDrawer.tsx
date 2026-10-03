'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShieldCheck, Shirt, Footprints, Plus, Minus, Zap, CheckCircle2, QrCode, Smartphone } from 'lucide-react';
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
    shoeCount,
    clearCart
  } = useCart();
  const { world, setWorld } = useWorld();

  // 1-Tap Instant Checkout State (Inline inside drawer)
  const [isInstantCheckoutOpen, setIsInstantCheckoutOpen] = useState(false);
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCartOpen) return null;

  const isShoes = world === 'shoes';
  const freeShippingThreshold = isShoes ? 999 : 1999;
  const amountAway = freeShippingThreshold - activeTotal;
  const finalPayable = activeTotal + (amountAway <= 0 ? 0 : 99);

  const handleTriggerInstantUPI = () => {
    if (activeItems.length === 0) return;
    setIsInstantCheckoutOpen(true);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutPhone || checkoutPhone.length < 10) return;

    setIsProcessing(true);
    setTimeout(() => {
      const orderNum = (isShoes ? 'SM-DROP-' : 'KM-DROP-') + Math.floor(100000 + Math.random() * 900000);
      setConfirmedOrderId(orderNum);
      setIsProcessing(false);
      setIsOrderComplete(true);
      clearCart(world);
    }, 1200);
  };

  const handleResetCheckout = () => {
    setIsOrderComplete(false);
    setIsInstantCheckoutOpen(false);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#080808]/80 backdrop-blur-md flex justify-end sm:items-stretch items-end font-mono text-[#F4F4F4] animate-fade-in">
      <div 
        className={`w-full sm:max-w-md h-[92svh] sm:h-full flex flex-col justify-between shadow-2xl border-t sm:border-t-0 sm:border-l transition-colors duration-300 relative overflow-hidden ${
          isShoes 
            ? 'bg-[#0E151A] border-[#1E1E1E]' 
            : 'bg-[#111111] border-[#1E1E1E]'
        }`}
      >
        
        {/* Top Header & Store Brand Indicator */}
        <div>
          <div className="p-4 sm:p-6 border-b border-[#1E1E1E] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className={`flex h-6 w-6 items-center justify-center ${
                isShoes ? 'bg-[#00695c] text-white' : 'bg-[#7D0A0A] text-white'
              }`}>
                {isShoes ? <Footprints size={14} /> : <Shirt size={14} />}
              </span>
              <div>
                <span className="text-sm font-black uppercase tracking-wider block font-editorial text-[#F4F4F4]">
                  {isShoes ? 'SHOES MAFIA BAG' : 'KAPDA MAFIA BAG'}
                </span>
                <span className="text-[10px] text-[#666666] tracking-widest uppercase">
                  VAULT ALLOCATION ({activeCount} {activeCount === 1 ? 'ITEM' : 'ITEMS'})
                </span>
              </div>
            </div>

            <button 
              onClick={() => {
                if (isInstantCheckoutOpen) {
                  setIsInstantCheckoutOpen(false);
                } else {
                  closeCart();
                }
              }} 
              className="p-2 text-[#666666] hover:text-[#F4F4F4] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Dual-Bag Switcher Tab inside Cart */}
          <div className="grid grid-cols-2 p-1.5 bg-[#080808] border-b border-[#1E1E1E] text-xs">
            <button
              onClick={() => {
                setWorld('clothing');
                setIsInstantCheckoutOpen(false);
              }}
              className={`py-2 px-3 flex items-center justify-center gap-1.5 font-bold transition-all cursor-pointer ${
                !isShoes 
                  ? 'bg-[#7D0A0A] text-white shadow-md' 
                  : 'text-[#666666] hover:text-white'
              }`}
            >
              <Shirt size={12} />
              <span>KAPDA ({clothingCount})</span>
            </button>

            <button
              onClick={() => {
                setWorld('shoes');
                setIsInstantCheckoutOpen(false);
              }}
              className={`py-2 px-3 flex items-center justify-center gap-1.5 font-bold transition-all cursor-pointer ${
                isShoes 
                  ? 'bg-[#00695c] text-white shadow-md' 
                  : 'text-[#666666] hover:text-white'
              }`}
            >
              <Footprints size={12} />
              <span>SHOES ({shoeCount})</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#080808]/60 px-5 sm:px-6 py-2.5 border-b border-[#1E1E1E] text-[11px]">
            {amountAway > 0 ? (
              <p className="text-[#666666]">
                ADD <span className="text-[#F4F4F4] font-bold">₹{amountAway}</span> MORE FOR <span className={isShoes ? 'text-[#80cbc4] font-bold' : 'text-[#7D0A0A] font-bold'}>FREE EXPRESS DISPATCH</span>
              </p>
            ) : (
              <p className={isShoes ? 'text-[#80cbc4] font-bold' : 'text-[#7D0A0A] font-bold'}>
                ✓ UNLOCKED FREE EXPRESS DISPATCH
              </p>
            )}
            <div className="w-full h-1 bg-[#1E1E1E] mt-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isShoes ? 'bg-[#00695c]' : 'bg-[#7D0A0A]'}`} 
                style={{ width: `${Math.min(100, (activeTotal / freeShippingThreshold) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Active Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {activeItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#666666]">
              <div className="h-16 w-16 bg-[#080808] border border-[#1E1E1E] flex items-center justify-center mb-3">
                {isShoes ? <Footprints size={28} className="text-[#666666]" /> : <Shirt size={28} className="text-[#666666]" />}
              </div>
              <p className="text-xs font-bold text-[#F4F4F4] uppercase tracking-widest">
                YOUR {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} BAG IS EMPTY
              </p>
              <p className="text-[11px] text-[#666666] mt-1 max-w-xs">
                Explore the latest {isShoes ? 'footwear runner collection' : '440 GSM heavyweight oversized cuts'} and add your size.
              </p>
              <button
                onClick={closeCart}
                className={`mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white cursor-pointer ${
                  isShoes ? 'bg-[#00695c] hover:bg-[#00796b]' : 'bg-[#7D0A0A] hover:bg-[#991B1B]'
                }`}
              >
                START BROWSING
              </button>
            </div>
          ) : (
            activeItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-3 bg-[#080808] border border-[#1E1E1E] hover:border-[#333] transition-all"
              >
                <div className="w-20 h-24 bg-[#111111] overflow-hidden flex-shrink-0 border border-[#1E1E1E]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#F4F4F4] line-clamp-1">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-[#666666] hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="text-[10px] text-[#666666] mt-1">
                      SIZE: <strong className="text-[#F4F4F4]">{item.size}</strong> • {item.category.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-[#666666] mt-0.5">
                      ORIGINAL {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} SPEC
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div className="flex items-center border border-[#1E1E1E] bg-[#111111] px-2 py-0.5 text-xs text-[#F4F4F4]">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-1 text-[#666666] hover:text-white cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2 font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-1 text-[#666666] hover:text-white cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-[#F4F4F4]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        <div className="p-4 sm:p-6 border-t border-[#1E1E1E] bg-[#080808] space-y-4">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#666666]">
              <span>STORE ALLOCATION</span>
              <span className="text-[#F4F4F4] font-bold">{isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'}</span>
            </div>
            <div className="flex justify-between text-[#666666]">
              <span>BAG SUBTOTAL</span>
              <span>₹{activeTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#666666]">
              <span>EXPRESS DISPATCH</span>
              <span>{amountAway <= 0 ? 'FREE' : '₹99'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#F4F4F4] pt-2 border-t border-[#1E1E1E]">
              <span>TOTAL (TAX INCL.)</span>
              <span className={isShoes ? 'text-[#80cbc4]' : 'text-[#F4F4F4]'}>
                ₹{finalPayable.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* 1-Tap Frictionless Instant Trigger - Opens right inside drawer */}
            <button 
              type="button"
              disabled={activeItems.length === 0}
              onClick={handleTriggerInstantUPI}
              className={`w-full py-3.5 bg-[#FFFFFF] hover:bg-[#F4F4F4] active:scale-[0.99] text-[#080808] font-black text-xs tracking-[0.2em] uppercase flex flex-col items-center justify-center gap-0.5 transition-all shadow-xl cursor-pointer ${
                activeItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="fill-[#080808]" />
                <span>1-TAP INSTANT UPI CHECKOUT</span>
              </div>
              <span className="text-[9px] font-bold text-[#555555] tracking-widest font-mono">
                GPAY · PHONEPE · PAYTM · ZERO REDIRECT
              </span>
            </button>

            <Link 
              href={`/checkout?store=${isShoes ? 'shoes' : 'clothing'}`} 
              onClick={closeCart}
              className={`w-full py-2.5 text-[#888888] hover:text-white font-mono font-bold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#222222] hover:border-[#444444] bg-[#111111] ${
                activeItems.length === 0 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <span>MANUAL ADDRESS FORM</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#666666]">
            <ShieldCheck size={14} className={isShoes ? 'text-[#00695c]' : 'text-[#7D0A0A]'} />
            <span>256-BIT ENCRYPTED · NO ACCOUNT CREATION REQUIRED</span>
          </div>
        </div>

        {/* 1-TAP INSTANT UPI OVERLAY DRAWER SHEET (ZERO REDIRECT 2026 DROP EXPERIENCE) */}
        {isInstantCheckoutOpen && (
          <div className="absolute inset-0 bg-[#080808] z-30 flex flex-col justify-between p-5 sm:p-6 animate-fade-in overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#7D0A0A] font-bold uppercase block">
                  FASTEST CONVERSION LOOP
                </span>
                <h3 className="text-base font-black uppercase text-[#F4F4F4] tracking-tight">
                  1-TAP INSTANT UPI DROP
                </h3>
              </div>
              <button 
                onClick={() => setIsInstantCheckoutOpen(false)}
                className="p-1.5 text-[#666666] hover:text-white cursor-pointer"
                aria-label="Back to bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content State */}
            {isOrderComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#7D0A0A]/20 border border-[#7D0A0A] text-[#7D0A0A] flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D0A0A] font-bold">
                    TRANSACTION VERIFIED
                  </span>
                  <h4 className="text-xl font-black uppercase text-white mt-1">
                    ORDER SECURED IN VAULT
                  </h4>
                  <p className="text-xs font-mono text-[#888888] mt-1">
                    ALLOCATION ID: <span className="text-white font-bold">{confirmedOrderId}</span>
                  </p>
                </div>
                <div className="p-4 bg-[#111111] border border-[#222222] text-left text-xs font-mono w-full space-y-1.5">
                  <div className="text-[#888888]">PAYMENT: <span className="text-white font-bold">PAID VIA UPI INTENT</span></div>
                  <div className="text-[#888888]">MOBILE NOTIFICATION: <span className="text-white font-bold">+91 {checkoutPhone}</span></div>
                  <div className="text-[#888888]">DISPATCH WINDOW: <span className="text-white font-bold">WITHIN 24 HOURS</span></div>
                </div>
                <button
                  type="button"
                  onClick={handleResetCheckout}
                  className="w-full py-3.5 bg-white hover:bg-[#F4F4F4] text-black font-mono font-black text-xs uppercase tracking-widest cursor-pointer"
                >
                  RETURN TO STORE
                </button>
              </div>
            ) : (
              <form onSubmit={handleExecutePayment} className="flex-1 flex flex-col justify-between pt-4 space-y-4">
                <div className="space-y-4">
                  {/* Order Snippet */}
                  <div className="p-3 bg-[#111111] border border-[#1E1E1E] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#888888]">{activeCount} ITEM(S) TO DISPATCH</span>
                    <span className="text-base font-black text-white">₹{finalPayable.toLocaleString()}</span>
                  </div>

                  {/* 1-Tap Phone & Delivery Pin */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#AAAAAA] flex items-center gap-1">
                      <Smartphone size={12} />
                      <span>PHONE NUMBER FOR UPI CONFIRMATION & TRACKING</span>
                    </label>
                    <div className="flex border border-[#222222] focus-within:border-white transition-colors bg-[#080808]">
                      <span className="px-3 py-2.5 bg-[#111111] text-xs font-mono text-[#888888] border-r border-[#222222] flex items-center">
                        +91
                      </span>
                      <input 
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2.5 bg-transparent text-sm font-mono text-white placeholder-[#444444] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* UPI App Selection Pills */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#AAAAAA]">
                      SELECT 1-TAP PAYMENT APP:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('gpay')}
                        className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedUpiApp === 'gpay'
                            ? 'border-white bg-[#1a1a1a] text-white shadow-lg'
                            : 'border-[#1E1E1E] bg-[#0E0E0E] text-[#888888] hover:border-[#444]'
                        }`}
                      >
                        <span className="text-xs font-black tracking-wide">GOOGLE PAY</span>
                        <span className="text-[9px] font-mono text-[#666666]">TAP TO LAUNCH GPAY</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('phonepe')}
                        className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedUpiApp === 'phonepe'
                            ? 'border-white bg-[#1a1a1a] text-white shadow-lg'
                            : 'border-[#1E1E1E] bg-[#0E0E0E] text-[#888888] hover:border-[#444]'
                        }`}
                      >
                        <span className="text-xs font-black tracking-wide">PHONEPE</span>
                        <span className="text-[9px] font-mono text-[#666666]">FAST UPI INTENT</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('paytm')}
                        className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedUpiApp === 'paytm'
                            ? 'border-white bg-[#1a1a1a] text-white shadow-lg'
                            : 'border-[#1E1E1E] bg-[#0E0E0E] text-[#888888] hover:border-[#444]'
                        }`}
                      >
                        <span className="text-xs font-black tracking-wide">PAYTM UPI</span>
                        <span className="text-[9px] font-mono text-[#666666]">WALLET / UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedUpiApp('qr')}
                        className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedUpiApp === 'qr'
                            ? 'border-white bg-[#1a1a1a] text-white shadow-lg'
                            : 'border-[#1E1E1E] bg-[#0E0E0E] text-[#888888] hover:border-[#444]'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <QrCode size={12} />
                          <span className="text-xs font-black tracking-wide">INSTANT QR</span>
                        </div>
                        <span className="text-[9px] font-mono text-[#666666]">SCAN WITH ANY APP</span>
                      </button>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="p-3 bg-[#0c0c0c] border border-[#1a1a1a] text-[10px] font-mono text-[#777777] flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#7D0A0A] shrink-0" />
                    <span>Instant dispatch initiated. SMS and WhatsApp receipt sent automatically upon tap.</span>
                  </div>
                </div>

                {/* Primary Payment Execution Button */}
                <div className="pt-4 space-y-2 border-t border-[#1E1E1E]">
                  <button
                    type="submit"
                    disabled={isProcessing || checkoutPhone.length < 10}
                    className={`w-full py-4 bg-[#7D0A0A] hover:bg-[#991B1B] active:scale-[0.99] text-white font-mono font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
                      isProcessing || checkoutPhone.length < 10 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>AUTHORIZING UPI INTENT...</span>
                      </div>
                    ) : (
                      <>
                        <Zap size={14} className="fill-white" />
                        <span>PAY ₹{finalPayable.toLocaleString()} VIA {selectedUpiApp.toUpperCase()}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsInstantCheckoutOpen(false)}
                    className="w-full py-2 text-center text-[10px] font-mono text-[#666666] hover:text-white uppercase tracking-wider cursor-pointer"
                  >
                    ← CANCEL AND RETURN TO BAG
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

