'use client';

import React from 'react';
import Link from 'next/link';
import { Package, MapPin, Sparkles, LogOut } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="pb-6 border-b border-[#181818] flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="text-[10px] text-[#8F1118] uppercase tracking-[0.3em] font-bold mb-1">
              CLIENT PROFILE • MAFIA MEMBER
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase">AARAV SHARMA</h1>
            <div className="text-xs text-[#8C8C86] mt-0.5">MEMBER SINCE AUG 2026 • VIP ACCESS ACTIVE</div>
          </div>
          <button className="text-xs text-[#8C8C86] hover:text-[#8F1118] flex items-center gap-1.5 font-bold uppercase">
            <LogOut size={14} /> SIGN OUT
          </button>
        </div>

        {/* Account Dashboard 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-3">
            <div className="w-10 h-10 bg-[#181818] text-[#8F1118] flex items-center justify-center rounded-sm">
              <Package size={20} />
            </div>
            <h3 className="text-sm font-bold text-[#F3F0E8] uppercase">PAST ORDERS</h3>
            <p className="text-xs text-[#8C8C86]">1 Active Order (KM-9847120) currently shipped.</p>
            <Link href="/track-order" className="inline-block text-xs font-bold text-[#8F1118] uppercase pt-2">
              TRACK ACTIVE SHIPMENT →
            </Link>
          </div>

          <div className="bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-3">
            <div className="w-10 h-10 bg-[#181818] text-[#8F1118] flex items-center justify-center rounded-sm">
              <Sparkles size={20} />
            </div>
            <h3 className="text-sm font-bold text-[#F3F0E8] uppercase">SAVED FIT PROFILE</h3>
            <p className="text-xs text-[#8C8C86]">Height: 180 cm | Weight: 74 kg | Preferred Fit: Oversized (Size L)</p>
            <Link href="/ai-fit" className="inline-block text-xs font-bold text-[#8F1118] uppercase pt-2">
              UPDATE FIT PROFILE →
            </Link>
          </div>

          <div className="bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-3">
            <div className="w-10 h-10 bg-[#181818] text-[#8F1118] flex items-center justify-center rounded-sm">
              <MapPin size={20} />
            </div>
            <h3 className="text-sm font-bold text-[#F3F0E8] uppercase">DEFAULT ADDRESS</h3>
            <p className="text-xs text-[#8C8C86]">42 Underground Drive, Bandra West, Mumbai 400050</p>
            <span className="inline-block text-xs font-bold text-[#8C8C86] uppercase pt-2 cursor-pointer hover:text-[#F3F0E8]">
              EDIT ADDRESS →
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
