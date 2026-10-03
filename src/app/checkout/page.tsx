'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Shirt, Footprints } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWorld } from '@/context/WorldContext';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const storeParam = searchParams.get('store');
  const { world } = useWorld();
  const targetWorld = (storeParam === 'shoes' || storeParam === 'clothing') 
    ? storeParam 
    : world;

  const { 
    activeItems, 
    clothingItems, 
    shoeItems, 
    clothingTotal, 
    shoeTotal, 
    clearCart 
  } = useCart();

  const isShoesCheckout = targetWorld === 'shoes';
  const checkoutItems = isShoesCheckout ? shoeItems : clothingItems;
  const rawSubtotal = isShoesCheckout ? shoeTotal : clothingTotal;
  const subtotal = rawSubtotal > 0 ? rawSubtotal : (isShoesCheckout ? 1899 : 2499);

  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD'>('PREPAID');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('KM-9847120');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoName, setAppliedPromoName] = useState(checkoutItems.length >= 2 ? 'COMBO DISCOUNT (2+ PIECES)' : '');
  const [appliedDiscount, setAppliedDiscount] = useState(checkoutItems.length >= 2 ? 300 : 0);
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav@kapdamafia.com',
    phone: '9876543210',
    street: '42 Underground Drive, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'KM300' || code === 'COMBO300') {
      setAppliedDiscount(300);
      setAppliedPromoName(`${code} (₹300 OFF)`);
    } else if (code === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setAppliedPromoName('WELCOME10 (10% OFF)');
    } else if (code === 'MAFIA500' && subtotal >= 3500) {
      setAppliedDiscount(500);
      setAppliedPromoName('MAFIA500 (₹500 OFF)');
    } else {
      alert('Invalid or expired promo code');
    }
  };

  const freeShippingThreshold = isShoesCheckout ? 999 : 1999;
  const isFreeShipping = paymentMethod === 'PREPAID' || subtotal >= freeShippingThreshold;
  const shipping = isFreeShipping ? 0 : 99;
  const total = subtotal - appliedDiscount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = (isShoesCheckout ? 'SM-' : 'KM-') + Math.floor(1000000 + Math.random() * 9000000);
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart(targetWorld);
  };

  if (orderPlaced) {
    return (
      <div className="py-20 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono flex items-center justify-center p-4">
        <div className={`max-w-xl w-full bg-[#111111] border p-8 rounded-sm text-center space-y-6 shadow-2xl ${
          isShoesCheckout ? 'border-[#00695c]' : 'border-[#8F1118]'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
            isShoesCheckout 
              ? 'bg-[#00695c]/20 border-[#00695c] text-[#00695c]' 
              : 'bg-[#8F1118]/20 border-[#8F1118] text-[#8F1118]'
          }`}>
            <CheckCircle2 size={32} />
          </div>

          <div>
            <div className={`text-[10px] uppercase tracking-[0.3em] font-bold ${
              isShoesCheckout ? 'text-[#00695c]' : 'text-[#8F1118]'
            }`}>
              {isShoesCheckout ? 'SHOES MAFIA · ORDER CONFIRMED' : 'KAPDA MAFIA · ORDER CONFIRMED'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F3F0E8] uppercase mt-1">
              {isShoesCheckout ? 'THE FOOTWEAR IS YOURS.' : 'THE FIT IS YOURS.'}
            </h1>
            <div className="text-xs text-[#8C8C86] mt-2">
              ORDER ID: <strong className="text-[#F3F0E8]">{orderId}</strong>
            </div>
          </div>

          <p className="text-xs text-[#B8B4AA] leading-relaxed">
            We have dispatched your order details to <strong className="text-[#F3F0E8]">{formData.email}</strong>. 
            Quality control check initiated at our {isShoesCheckout ? 'Footwear Hub' : 'Flagship Warehouse'}.
          </p>

          <div className="p-4 bg-[#080808] border border-[#181818] text-left text-xs space-y-1">
            <div className="text-[#8C8C86]">DELIVERY ESTIMATE: <span className="text-[#F3F0E8] font-bold">3–4 BUSINESS DAYS</span></div>
            <div className="text-[#8C8C86]">COURIER PARTNER: <span className="text-[#F3F0E8] font-bold">DELHIVERY EXPRESS AIR</span></div>
            <div className="text-[#8C8C86]">GST INVOICE: <span className="text-[#F3F0E8] font-bold">GENERATED (OFFICIAL KAPDA MAFIA)</span></div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link 
              href="/track-order" 
              className={`flex-1 py-3.5 text-white text-xs font-bold uppercase tracking-wider transition-colors text-center ${
                isShoesCheckout ? 'bg-[#00695c] hover:bg-[#00796b]' : 'bg-[#8F1118] hover:bg-[#B91C1C]'
              }`}
            >
              TRACK YOUR ORDER →
            </Link>
            <Link 
              href={isShoesCheckout ? '/shoes' : '/shop'} 
              className="flex-1 py-3.5 bg-[#181818] border border-[#222222] text-[#F3F0E8] text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 pb-6 border-b border-[#181818]">
          <div className="text-[10px] text-[#8F1118] uppercase tracking-[0.3em] font-bold mb-1">
            CHECKOUT CONCIERGE • SECURE ENCRYPTION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase">EXPRESS CHECKOUT</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Customer & Address Details (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-4">
              <h3 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide border-b border-[#181818] pb-3">
                1. CONTACT INFORMATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#8C8C86] mb-1">FULL NAME</label>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                  />
                </div>
                <div>
                  <label className="block text-[#8C8C86] mb-1">EMAIL ADDRESS</label>
                  <input 
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#8C8C86] mb-1">PHONE NUMBER (FOR ORDER & TRACKING WHATSAPP)</label>
                  <input 
                    type="tel" required value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-4">
              <h3 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide border-b border-[#181818] pb-3">
                2. SHIPPING ADDRESS (PAN-INDIA)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#8C8C86] mb-1">STREET ADDRESS & HOUSE NO.</label>
                  <input 
                    type="text" required value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                    className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                  />
                </div>
                <div>
                  <label className="block text-[#8C8C86] mb-1">CITY</label>
                  <input 
                    type="text" required value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                  />
                </div>
                <div>
                  <label className="block text-[#8C8C86] mb-1">PINCODE</label>
                  <input 
                    type="text" required value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#8F1118]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#181818] pb-3">
                <h3 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide">
                  3. PAYMENT GATEWAY ({isShoesCheckout ? 'SHOES MAFIA PAY' : 'KAPDA MAFIA PAY'})
                </h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                  isShoesCheckout ? 'bg-[#00695c]/20 text-[#00695c]' : 'bg-[#8F1118]/20 text-[#8F1118]'
                }`}>
                  {isShoesCheckout ? 'FOOTWEAR ACCOUNT' : 'CLOTHING ACCOUNT'}
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <label className={`block p-4 border rounded-sm cursor-pointer transition-colors ${
                  paymentMethod === 'PREPAID' 
                    ? isShoesCheckout ? 'border-[#00695c] bg-[#080808]' : 'border-[#8F1118] bg-[#080808]'
                    : 'border-[#222222] bg-[#080808]/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" name="payment" checked={paymentMethod === 'PREPAID'} 
                      onChange={() => setPaymentMethod('PREPAID')}
                      className={isShoesCheckout ? 'accent-[#00695c]' : 'accent-[#8F1118]'}
                    />
                    <div>
                      <div className="font-bold text-[#F3F0E8]">
                        PREPAID (UPI / RAZORPAY / GPAY / CARDS)
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        ✓ FREE EXPRESS DISPATCH TO {isShoesCheckout ? 'SHOES MAFIA VAULT' : 'KAPDA MAFIA'}
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`block p-4 border rounded-sm cursor-pointer transition-colors ${
                  paymentMethod === 'COD' 
                    ? isShoesCheckout ? 'border-[#00695c] bg-[#080808]' : 'border-[#8F1118] bg-[#080808]'
                    : 'border-[#222222] bg-[#080808]/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" name="payment" checked={paymentMethod === 'COD'} 
                      onChange={() => setPaymentMethod('COD')}
                      className={isShoesCheckout ? 'accent-[#00695c]' : 'accent-[#8F1118]'}
                    />
                    <div>
                      <div className="font-bold text-[#F3F0E8]">CASH ON DELIVERY (COD)</div>
                      <div className="text-[10px] text-[#8C8C86]">₹99 HANDLING FEE • VERIFIED OTP COURIER</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Order Summary Panel (5 Columns) */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-6 h-fit lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-[#181818] pb-3">
              <h3 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide flex items-center gap-2">
                {isShoesCheckout ? <Footprints size={15} className="text-[#00695c]" /> : <Shirt size={15} className="text-[#8F1118]" />}
                <span>{isShoesCheckout ? 'SHOES MAFIA' : 'KAPDA MAFIA'} ORDER</span>
              </h3>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                isShoesCheckout ? 'bg-[#00695c]/20 text-[#00695c]' : 'bg-[#8F1118]/20 text-[#8F1118]'
              }`}>
                {checkoutItems.length} {checkoutItems.length === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>

            {/* List of items in checkout */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {checkoutItems.length === 0 ? (
                <div className="p-4 bg-[#080808] border border-[#181818] text-center text-xs text-gray-400">
                  Your {isShoesCheckout ? 'Shoes Mafia' : 'Kapda Mafia'} bag is empty.
                </div>
              ) : (
                checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-[#080808] border border-[#181818] rounded-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-[#181818] rounded-sm flex-shrink-0" />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-[#F3F0E8] leading-tight line-clamp-1">{item.name}</div>
                      <div className="text-[10px] text-[#8C8C86] mt-1">SIZE: {item.size} • QTY: {item.quantity}</div>
                      <div className="text-[10px] text-[#8C8C86]">{item.category}</div>
                      <div className="font-bold text-[#F3F0E8] mt-2">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2 border-t border-[#181818]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. KM300)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-[#080808] border border-[#222222] text-[#F3F0E8] px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#8F1118]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider"
                >
                  APPLY
                </button>
              </div>
              {appliedDiscount > 0 && (
                <div className="text-[10px] text-emerald-400 mt-1.5 flex items-center justify-between">
                  <span>✓ PROMO APPLIED: {appliedPromoName}</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs border-t border-[#181818] pt-4">
              <div className="flex justify-between text-[#8C8C86]">
                <span>SUBTOTAL</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>SAVINGS & DISCOUNTS</span>
                  <span>-₹{appliedDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#8C8C86]">
                <span>SHIPPING</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#F3F0E8] pt-2 border-t border-[#181818]">
                <span>TOTAL AMOUNT</span>
                <span className={isShoesCheckout ? 'text-[#00695c]' : 'text-[#8F1118]'}>
                  ₹{Math.max(0, total).toLocaleString()}
                </span>
              </div>
            </div>

            <button 
              type="submit"
              className={`w-full py-4 text-white font-bold text-xs tracking-[0.25em] uppercase transition-colors shadow-lg cursor-pointer ${
                isShoesCheckout ? 'bg-[#00695c] hover:bg-[#00796b]' : 'bg-[#8F1118] hover:bg-[#B91C1C]'
              }`}
            >
              PLACE ORDER NOW →
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8C86] pt-2">
              <ShieldCheck size={14} className={isShoesCheckout ? 'text-[#00695c]' : 'text-[#8F1118]'} />
              <span>OFFICIAL 100% VERIFIED STORE CHECKOUT</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080808] flex items-center justify-center font-mono text-white text-xs">
        <div className="animate-pulse">LOADING CHECKOUT VAULT...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
