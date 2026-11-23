'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShieldCheck, Shirt, Footprints, Plus, Minus, Zap, CheckCircle2, QrCode, Smartphone, Tag } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'prepaid' | 'cod'>('prepaid');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCartOpen) return null;

  const isShoes = world === 'shoes';
  
  // Dynamic Offer: ₹300 OFF on 2+ items (Code: KM300)
  const isOfferUnlocked = activeCount >= 2;
  const discountAmount = isOfferUnlocked ? 300 : 0;

  // Free shipping threshold: ₹1,999 or prepaid
  const freeShippingThreshold = 1999;
  const isFreeShipping = activeTotal >= freeShippingThreshold || paymentMethod === 'prepaid';
  const shippingFee = isFreeShipping ? 0 : 99;

  const subtotalAfterDiscount = Math.max(0, activeTotal - discountAmount);
  const finalPayable = subtotalAfterDiscount + shippingFee;

  const handleTriggerInstantUPI = () => {
    if (activeItems.length === 0) return;
    setIsInstantCheckoutOpen(true);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutPhone || checkoutPhone.length < 10) return;

    setIsProcessing(true);
    setTimeout(() => {
      const orderNum = (isShoes ? 'SM-' : 'KM-') + Math.floor(100000 + Math.random() * 900000);
      setConfirmedOrderId(orderNum);
      setIsProcessing(false);
      setIsOrderComplete(true);
      clearCart(world);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end sm:items-stretch items-end font-mono text-[#F4F4F4] animate-fade-in">
      <div 
        className={`w-full sm:max-w-md h-[92svh] sm:h-full flex flex-col justify-between shadow-2xl border-t sm:border-t-0 sm:border-l transition-colors duration-300 relative overflow-hidden ${
          isShoes 
            ? 'bg-[#0E151A] border-[#1E1E1E]' 
            : 'bg-[#111111] border-[#1E1E1E]'
        }`}
      >
        
        {/* Top Header */}
        <div>
          <div className="p-4 sm:p-5 border-b border-[#1E1E1E] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className={`flex h-6 w-6 items-center justify-center ${
                isShoes ? 'bg-[#00695c] text-white' : 'bg-[#7D0A0A] text-white'
              }`}>
                {isShoes ? <Footprints size={14} /> : <Shirt size={14} />}
              </span>
              <div>
                <span className="text-sm font-bold uppercase tracking-wider block text-white font-[var(--font-display)]">
                  {isShoes ? 'SHOES MAFIA BAG' : 'KAPDA MAFIA BAG'}
                </span>
                <span className="text-[10px] text-[#888888] tracking-widest uppercase">
                  {activeCount} {activeCount === 1 ? 'ITEM' : 'ITEMS'} IN BAG
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
              className="p-2 text-[#888888] hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Dual-Bag Switcher Tab */}
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
              <span>APPAREL ({clothingCount})</span>
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
              <span>FOOTWEAR ({shoeCount})</span>
            </button>
          </div>

          {/* Dynamic Offer & Shipping Progress Bar */}
          <div className="bg-[#080808] px-5 py-3 border-b border-[#1E1E1E] text-[11px] space-y-1.5">
            <div className="flex items-center justify-between font-bold">
              <div className="flex items-center gap-1.5">
                <Tag size={12} className={isOfferUnlocked ? 'text-emerald-400' : 'text-[#888888]'} />
                {isOfferUnlocked ? (
                  <span className="text-emerald-400">₹300 OFF UNLOCKED (CODE: KM300)</span>
                ) : (
                  <span className="text-[#888888]">ADD {2 - activeCount} MORE {2 - activeCount === 1 ? 'ITEM' : 'ITEMS'} FOR ₹300 OFF (KM300)</span>
                )}
              </div>
              <span className="text-[10px] text-[#666666]">
                {activeCount}/2 ITEMS
              </span>
            </div>

            <div className="w-full h-1 bg-[#1E1E1E] overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isOfferUnlocked ? 'bg-emerald-500' : 'bg-[#7D0A0A]'}`} 
                style={{ width: `${Math.min(100, (activeCount / 2) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Active Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {activeItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#666666]">
              <div className="h-16 w-16 bg-[#080808] border border-[#1E1E1E] flex items-center justify-center mb-3">
                {isShoes ? <Footprints size={28} className="text-[#666666]" /> : <Shirt size={28} className="text-[#666666]" />}
              </div>
              <p className="text-xs font-bold text-[#F4F4F4] uppercase tracking-widest">
                YOUR {isShoes ? 'SHOES MAFIA' : 'KAPDA MAFIA'} BAG IS EMPTY
              </p>
              <p className="text-[11px] text-[#666666] mt-1 max-w-xs">
                Explore the latest {isShoes ? 'sneaker arrivals' : '440 GSM heavyweight oversized silhouettes'} and select your size.
              </p>
              <button
                onClick={closeCart}
                className={`mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white cursor-pointer ${
                  isShoes ? 'bg-[#00695c] hover:bg-[#00796b]' : 'bg-[#7D0A0A] hover:bg-[#991B1B]'
                }`}
              >
                START SHOPPING
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
                    <div className="text-[10px] text-[#888888] mt-1">
                      SIZE: <strong className="text-[#F4F4F4]">{item.size}</strong> • {item.category.toUpperCase()}
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
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        <div className="p-4 sm:p-5 border-t border-[#1E1E1E] bg-[#080808] space-y-4">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#888888]">
              <span>BAG SUBTOTAL</span>
              <span>₹{activeTotal.toLocaleString('en-IN')}</span>
            </div>
            {isOfferUnlocked && (
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>COMBO SAVINGS (KM300)</span>
                <span>-₹300</span>
              </div>
            )}
            <div className="flex justify-between text-[#888888]">
              <span>SHIPPING</span>
              <span className="text-emerald-400 font-bold">{isFreeShipping ? 'FREE EXPRESS' : '₹99'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#F4F4F4] pt-2 border-t border-[#1E1E1E]">
              <span>TOTAL PAYABLE</span>
              <span className={isShoes ? 'text-[#80cbc4]' : 'text-[#F4F4F4]'}>
                ₹{finalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* 1-Tap Frictionless Instant Trigger */}
            <button 
              type="button"
              disabled={activeItems.length === 0}
              onClick={handleTriggerInstantUPI}
              className={`w-full py-3.5 bg-white hover:bg-[#F4F4F4] active:scale-[0.99] text-black font-black text-xs tracking-[0.16em] uppercase flex flex-col items-center justify-center gap-0.5 transition-all shadow-xl cursor-pointer ${
                activeItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="fill-black" />
                <span>1-TAP INSTANT UPI CHECKOUT</span>
              </div>
              <span className="text-[9px] font-bold text-[#666666] tracking-widest font-mono">
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
              <span>STANDARD CHECKOUT / COD</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#666666]">
            <ShieldCheck size={13} className={isShoes ? 'text-[#00695c]' : 'text-[#7D0A0A]'} />
            <span>256-BIT ENCRYPTED · PRE-SHRUNK · 7-DAY EXCHANGE</span>
          </div>
        </div>

        {/* 1-TAP INSTANT UPI OVERLAY DRAWER SHEET */}
        {isInstantCheckoutOpen && (
          <div className="absolute inset-0 bg-[#080808] z-30 flex flex-col justify-between p-5 sm:p-6 animate-fade-in overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#7D0A0A] font-bold uppercase block">
                  ZERO REDIRECT CHECKOUT
                </span>
                <h3 className="text-base font-black uppercase text-[#F4F4F4] tracking-tight">
                  1-Tap Instant Checkout
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
                <div className="w-16 h-16 rounded-full bg-[#7D0A0A]/20 border border-[#7D0A0A] text-[#7D0A0A] flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D0A0A] font-bold">
                    ORDER CONFIRMED
                  </span>
                  <h4 className="text-xl font-black uppercase text-white mt-1">
                    ORDER PLACED SUCCESSFULLY
                  </h4>
                  <p className="text-xs font-mono text-[#888888] mt-1">
                    ORDER ID: <span className="text-white font-bold">{confirmedOrderId}</span>
                  </p>
                </div>
                <div className="p-4 bg-[#111111] border border-[#222222] text-left text-xs font-mono w-full space-y-1.5">
                  <div className="text-[#888888]">PAYMENT: <span className="text-white font-bold">PAID VIA UPI INTENT</span></div>
                  <div className="text-[#888888]">MOBILE UPDATES: <span className="text-white font-bold">+91 {checkoutPhone}</span></div>
                  <div className="text-[#888888]">DISPATCH: <span className="text-emerald-400 font-bold">SHIPS WITHIN 24 HOURS FROM FARIDABAD</span></div>
                </div>
                <button
                  onClick={() => {
                    setIsOrderComplete(false);
                    setIsInstantCheckoutOpen(false);
                    closeCart();
                  }}
                  className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest cursor-pointer"
                >
                  RETURN TO STORE
                </button>
              </div>
            ) : (
              <form onSubmit={handleExecutePayment} className="flex-1 flex flex-col justify-between py-4 space-y-5">
                <div className="space-y-4">
                  
                  {/* Total to pay banner */}
                  <div className="p-3.5 bg-[#111111] border border-[#1E1E1E] flex items-center justify-between">
                    <span className="text-xs text-[#888888] uppercase">AMOUNT TO PAY:</span>
                    <span className="text-base font-bold text-white">₹{finalPayable.toLocaleString('en-IN')}</span>
                  </div>

                  {/* WhatsApp/Mobile Number for Tracking */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1.5 font-bold">
                      MOBILE NUMBER (FOR DISPATCH &amp; TRACKING SMS)
                    </label>
                    <div className="flex items-center border border-[#222222] bg-[#111111] px-3 py-2.5 focus-within:border-white">
                      <span className="text-xs text-[#666666] mr-2">+91</span>
                      <input 
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value.replace(/\D/g, ''))}
                        className="bg-transparent text-sm text-white focus:outline-none w-full font-mono placeholder:text-[#444444]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#888888] mb-1.5 font-bold">
                      SELECT PAYMENT APP
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'gpay', label: 'GOOGLE PAY', icon: Smartphone },
                        { id: 'phonepe', label: 'PHONEPE', icon: Smartphone },
                        { id: 'paytm', label: 'PAYTM', icon: Smartphone },
                        { id: 'qr', label: 'DYNAMIC QR', icon: QrCode }
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id as any)}
                          className={`p-3 border flex items-center gap-2 text-xs font-bold uppercase transition-all cursor-pointer ${
                            selectedUpiApp === app.id 
                              ? 'bg-white text-black border-white' 
                              : 'bg-[#111111] text-[#888888] border-[#222222] hover:border-[#444444]'
                          }`}
                        >
                          <app.icon size={14} />
                          <span>{app.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Confirm & Trigger button */}
                <div className="pt-4 border-t border-[#1E1E1E]">
                  <button
                    type="submit"
                    disabled={isProcessing || checkoutPhone.length < 10}
                    className="w-full py-4 bg-white hover:bg-[#F4F4F4] text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>CONNECTING UPI INTENT...</span>
                    ) : (
                      <>
                        <Zap size={14} className="fill-black" />
                        <span>PAY ₹{finalPayable.toLocaleString('en-IN')} VIA {selectedUpiApp.toUpperCase()}</span>
                      </>
                    )}
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
