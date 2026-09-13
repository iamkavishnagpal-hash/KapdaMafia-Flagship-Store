'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD'>('PREPAID');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav@kapdamafia.com',
    phone: '9876543210',
    street: '42 Underground Drive, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const product = MOCK_PRODUCTS[0];
  const subtotal = 2499;
  const shipping = paymentMethod === 'PREPAID' ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="py-20 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-[#111111] border border-[#8F1118] p-8 rounded-sm text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-[#8F1118]/20 border border-[#8F1118] text-[#8F1118] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <div className="text-[10px] text-[#8F1118] uppercase tracking-[0.3em] font-bold">ORDER CONFIRMED</div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F3F0E8] uppercase mt-1">THE FIT IS YOURS.</h1>
            <div className="text-xs text-[#8C8C86] mt-2">ORDER ID: <strong className="text-[#F3F0E8]">KM-9847120</strong></div>
          </div>

          <p className="text-xs text-[#B8B4AA] leading-relaxed">
            We have dispatched your order details to <strong className="text-[#F3F0E8]">{formData.email}</strong>. Quality control check initiated at our flagship warehouse.
          </p>

          <div className="p-4 bg-[#080808] border border-[#181818] text-left text-xs space-y-1">
            <div className="text-[#8C8C86]">DELIVERY ESTIMATE: <span className="text-[#F3F0E8] font-bold">3–4 BUSINESS DAYS</span></div>
            <div className="text-[#8C8C86]">COURIER PARTNER: <span className="text-[#F3F0E8] font-bold">DELHIVERY EXPRESS</span></div>
            <div className="text-[#8C8C86]">MYBILLBOOK INVOICE: <span className="text-[#F3F0E8] font-bold">GENERATED (12% GST)</span></div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link 
              href="/track-order" 
              className="flex-1 py-3.5 bg-[#8F1118] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              TRACK YOUR ORDER →
            </Link>
            <Link 
              href="/shop" 
              className="flex-1 py-3.5 bg-[#181818] border border-[#222222] text-[#F3F0E8] text-xs font-bold uppercase tracking-wider transition-colors"
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
              <h3 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide border-b border-[#181818] pb-3">
                3. PAYMENT METHOD
              </h3>
              <div className="space-y-3 text-xs">
                <label className={`block p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'PREPAID' ? 'border-[#8F1118] bg-[#080808]' : 'border-[#222222] bg-[#080808]/50'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" name="payment" checked={paymentMethod === 'PREPAID'} 
                      onChange={() => setPaymentMethod('PREPAID')}
                      className="accent-[#8F1118]"
                    />
                    <div>
                      <div className="font-bold text-[#F3F0E8]">PREPAID (UPI / RAZORPAY / CARDS)</div>
                      <div className="text-[10px] text-emerald-400">✓ FREE EXPRESS SHIPPING INCLUDED</div>
                    </div>
                  </div>
                </label>

                <label className={`block p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-[#8F1118] bg-[#080808]' : 'border-[#222222] bg-[#080808]/50'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" name="payment" checked={paymentMethod === 'COD'} 
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#8F1118]"
                    />
                    <div>
                      <div className="font-bold text-[#F3F0E8]">CASH ON DELIVERY (COD)</div>
                      <div className="text-[10px] text-[#8C8C86]">₹99 HANDLING FEE</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Order Summary Panel (5 Columns) */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-6 h-fit lg:sticky lg:top-28">
            <h3 className="text-sm font-bold text-[#F3F0E8] uppercase tracking-wide border-b border-[#181818] pb-3">
              ORDER SUMMARY
            </h3>

            <div className="flex gap-4 p-3 bg-[#080808] border border-[#181818] rounded-sm">
              <img src={product.variants[0].images[0].url} alt={product.name} className="w-16 h-20 object-cover bg-[#181818]" />
              <div className="flex-1 text-xs">
                <div className="font-bold text-[#F3F0E8]">{product.name}</div>
                <div className="text-[10px] text-[#8C8C86] mt-0.5">SIZE L • CHARCOAL BLACK</div>
                <div className="font-bold text-[#F3F0E8] mt-2">₹{product.price.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-[#181818] pt-4">
              <div className="flex justify-between text-[#8C8C86]">
                <span>SUBTOTAL</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8C8C86]">
                <span>SHIPPING</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#F3F0E8] pt-2 border-t border-[#181818]">
                <span>TOTAL AMOUNT</span>
                <span className="text-[#8F1118]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#8F1118] hover:bg-[#B91C1C] text-white font-bold text-xs tracking-[0.25em] uppercase transition-colors shadow-lg"
            >
              PLACE ORDER NOW →
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8C86] pt-2">
              <ShieldCheck size={14} className="text-[#8F1118]" />
              MYBILLBOOK HSN 61091000 COMPLIANT
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
