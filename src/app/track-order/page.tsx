'use client';

import React, { useState } from 'react';
import { OrderTrackingService } from '@/services/catalog';
import { Order } from '@/types/ecommerce';
import { Search, CheckCircle2, Clock, Shirt, Footprints } from 'lucide-react';
import { useWorld } from '@/context/WorldContext';

export default function TrackOrderPage() {
  const { world } = useWorld();
  const [selectedWorld, setSelectedWorld] = useState<'clothing' | 'shoes'>(world);
  const [orderId, setOrderId] = useState(world === 'shoes' ? 'SM-4829104' : 'KM-9847120');
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const isShoeWorld = selectedWorld === 'shoes';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await OrderTrackingService.trackOrder(orderId);
    setOrderData(res);
    setSearched(true);
  };

  const handleSwitchTab = (w: 'clothing' | 'shoes') => {
    setSelectedWorld(w);
    setOrderId(w === 'shoes' ? 'SM-4829104' : 'KM-9847120');
    setSearched(false);
    setOrderData(null);
  };

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className={`text-[10px] uppercase tracking-[0.3em] font-bold ${
            isShoeWorld ? 'text-[#009688]' : 'text-[#8F1118]'
          }`}>
            {isShoeWorld ? 'SHOES MAFIA · CENTRAL FOOTWEAR DISPATCH' : 'KAPDA MAFIA · FLAGSHIP LOGISTICS REPOSITORY'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            TRACK YOUR <span className={isShoeWorld ? 'text-[#009688]' : 'text-[#8F1118]'}>
              {isShoeWorld ? 'SHOES' : 'ORDER'}
            </span>
          </h1>
          <p className="text-xs text-[#B8B4AA]">
            Separate tracking systems just like Swiggy Food & Instamart. Track your footwear or clothing parcel in real-time.
          </p>

          {/* Dual Store Tracking Selector Pills */}
          <div className="inline-flex items-center bg-black/60 p-1 rounded-full border border-white/15 mx-auto mt-2">
            <button
              onClick={() => handleSwitchTab('clothing')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                !isShoeWorld 
                  ? 'bg-[#8F1118] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shirt size={12} />
              <span>KAPDA ORDERS (KM-)</span>
            </button>
            <button
              onClick={() => handleSwitchTab('shoes')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isShoeWorld 
                  ? 'bg-[#009688] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Footprints size={12} />
              <span>SHOES ORDERS (SM-)</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input 
            type="text" required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder={isShoeWorld ? 'ENTER SHOES ORDER ID (E.G. SM-4829104)' : 'ENTER CLOTHING ORDER ID (E.G. KM-9847120)'}
            className={`flex-1 bg-[#111111] border text-[#F3F0E8] text-xs px-4 py-3.5 rounded-sm focus:outline-none uppercase tracking-wider ${
              isShoeWorld ? 'border-[#009688]/40 focus:border-[#009688]' : 'border-[#222222] focus:border-[#8F1118]'
            }`}
          />
          <button 
            type="submit"
            className={`px-8 py-3.5 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              isShoeWorld ? 'bg-[#009688] hover:bg-[#00796b]' : 'bg-[#8F1118] hover:bg-[#B91C1C]'
            }`}
          >
            <Search size={16} /> SEARCH
          </button>
        </form>

        {/* Shipment Status Display */}
        {searched && orderData && (
          <div className={`bg-[#111111] border p-6 sm:p-8 rounded-sm space-y-8 ${
            orderData.id.startsWith('SM') ? 'border-[#009688]/50' : 'border-[#8F1118]/50'
          }`}>
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#181818] gap-4">
              <div>
                <div className="text-[10px] text-[#8C8C86]">ORDER ID</div>
                <div className="text-lg font-bold text-[#F3F0E8]">{orderData.id}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#8C8C86]">COURIER TRACKING NO.</div>
                <div className={`text-sm font-bold ${orderData.id.startsWith('SM') ? 'text-[#009688]' : 'text-[#8F1118]'}`}>
                  {orderData.trackingNumber} ({orderData.courierName})
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#8C8C86]">CURRENT STATUS</div>
                <div className="text-sm font-bold text-emerald-400">{orderData.orderStatus}</div>
              </div>
            </div>

            {/* Item Preview */}
            <div className="p-3 bg-[#080808] border border-[#181818] rounded-sm flex items-center gap-4">
              <img src={orderData.items[0]?.productImage} alt={orderData.items[0]?.productName} className="w-14 h-16 object-cover bg-[#181818] rounded-sm" />
              <div className="text-xs">
                <div className="font-bold text-white">{orderData.items[0]?.productName}</div>
                <div className="text-[10px] text-gray-400">SIZE: {orderData.items[0]?.size} • QTY: {orderData.items[0]?.quantity}</div>
                <div className={`font-bold mt-1 ${orderData.id.startsWith('SM') ? 'text-[#009688]' : 'text-[#8F1118]'}`}>
                  TOTAL: ₹{orderData.total.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Tracking Timeline Steps */}
            <div className="space-y-6">
              <h3 className="text-xs text-[#8C8C86] uppercase tracking-widest">LIVE SHIPMENT TIMELINE</h3>
              
              <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#222222]">
                {orderData.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      step.completed 
                        ? orderData.id.startsWith('SM') ? 'bg-[#009688] text-white' : 'bg-[#8F1118] text-white' 
                        : 'bg-[#181818] text-[#8C8C86] border border-[#222222]'
                    }`}>
                      {step.completed ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-bold uppercase ${step.completed ? 'text-[#F3F0E8]' : 'text-[#8C8C86]'}`}>{step.label}</div>
                      {step.date && <div className="text-[10px] text-[#8C8C86] mt-0.5">{step.date}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
