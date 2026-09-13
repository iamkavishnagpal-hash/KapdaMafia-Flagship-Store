'use client';

import React, { useState } from 'react';
import { OrderTrackingService } from '@/services/catalog';
import { Order } from '@/types/ecommerce';
import { Search, CheckCircle2, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('KM-9847120');
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await OrderTrackingService.trackOrder(orderId);
    setOrderData(res);
    setSearched(true);
  };

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-[10px] text-[#8F1118] uppercase tracking-[0.3em] font-bold">
            CLIENT SERVICES • LOGISTICS REPOSITORY
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            TRACK YOUR <span className="text-[#8F1118]">ORDER</span>
          </h1>
          <p className="text-xs text-[#B8B4AA]">
            Enter your Order ID (e.g. KM-9847120) or registered phone number to view live shipment checkpoints.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input 
            type="text" required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="ENTER ORDER ID (E.G. KM-9847120)"
            className="flex-1 bg-[#111111] border border-[#222222] text-[#F3F0E8] text-xs px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#8F1118] uppercase tracking-wider"
          />
          <button 
            type="submit"
            className="px-8 py-3.5 bg-[#8F1118] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Search size={16} /> SEARCH
          </button>
        </form>

        {/* Shipment Status Display */}
        {searched && orderData && (
          <div className="bg-[#111111] border border-[#181818] p-6 sm:p-8 rounded-sm space-y-8">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#181818] gap-4">
              <div>
                <div className="text-[10px] text-[#8C8C86]">ORDER ID</div>
                <div className="text-lg font-bold text-[#F3F0E8]">{orderData.id}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#8C8C86]">COURIER TRACKING NO.</div>
                <div className="text-sm font-bold text-[#8F1118]">{orderData.trackingNumber} ({orderData.courierName})</div>
              </div>
              <div>
                <div className="text-[10px] text-[#8C8C86]">CURRENT STATUS</div>
                <div className="text-sm font-bold text-emerald-400">{orderData.orderStatus}</div>
              </div>
            </div>

            {/* Tracking Timeline Steps */}
            <div className="space-y-6">
              <h3 className="text-xs text-[#8C8C86] uppercase tracking-widest">LIVE SHIPMENT TIMELINE</h3>
              
              <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#222222]">
                {orderData.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${step.completed ? 'bg-[#8F1118] text-white' : 'bg-[#181818] text-[#8C8C86] border border-[#222222]'}`}>
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
