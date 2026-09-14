'use client';

import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function StorePage() {
  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-[10px] text-[#8F1118] uppercase tracking-[0.3em] font-bold">
            PHYSICAL RETAIL FLAGSHIP • FARIDABAD
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            VISIT THE <span className="text-[#8F1118]">STORE</span>
          </h1>
          <p className="text-xs text-[#B8B4AA]">
            Experience our 400–500 GSM weight, inspect custom embroidery stitching, and try complete drop outfits in person.
          </p>
        </div>

        {/* Concrete Vault Monolithic Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#1a1a1a] border border-[#1a1a1a] overflow-hidden">
          
          <div className="lg:col-span-7 aspect-[4/3] bg-[#0a0a0a] overflow-hidden relative">
            <img 
              src="/media/campaign-after-dark.png" 
              alt="Kapda Mafia Concrete Vault"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute top-3 left-3 bg-[#080808]/90 border border-[#222] px-2.5 py-1 text-[9px] font-mono text-[#EEEAE1]">
              [FACILITY CODE: NIT-5-FARIDABAD]
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#080808] space-y-6">
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-[#8F1118] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-ping" />
                <span>OPERATIONAL CONCRETE VAULT</span>
              </div>

              <div className="text-xl sm:text-2xl font-black text-[#F3F0E8] uppercase tracking-tight font-editorial">
                NIT 5 CONCRETE VAULT
              </div>

              {/* Raw Industrial Coordinate Anchor */}
              <div className="p-3 bg-[#0f0f0f] border border-[#1c1c1c] font-mono text-[10px] text-[#A39E93] leading-relaxed">
                <div className="text-[#8F1118] font-bold mb-1">[LAT: 28.3846° N, LONG: 77.3086° E]</div>
                <div>ELEVATION: 209M MSL // REFINERY RUNWAY SECTOR</div>
              </div>

              <div className="space-y-3 text-xs font-mono text-[#B8B4AA]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#8F1118] flex-shrink-0 mt-0.5" />
                  <a
                    href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwigr4D5oOyWAxUAAAAAHQAAAAAQBQ..i&rlz=1C1PNFE_enIN1090IN1091&fvr=1&pvq=Cg0vZy8xMXl6ZDFuOW04IhEKC2thcGRhIG1hZmlhEAIYAw&lqi=CgtrYXBkYSBtYWZpYUjozOjA-b2AgAhaHRAAEAEYABgBIgtrYXBkYSBtYWZpYSoGCAIQABABkgEOY2xvdGhpbmdfc3RvcmU&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cdd1ee5a5bafd:0xc177aa65e376a724"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors leading-relaxed"
                  >
                    Ground Floor, 5G-38, Block G, New Industrial Twp 5, Faridabad, Haryana 121001
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#8F1118] flex-shrink-0" />
                  <span>VAULT DOORS: 11:00 HRS – 21:30 HRS [MON–SUN]</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#8F1118] flex-shrink-0" />
                  <a href="tel:08375000819" className="hover:text-white font-bold transition-colors">
                    SECURE LINE: +91 83750 00819
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#181818] space-y-3">
              <a 
                href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwigr4D5oOyWAxUAAAAAHQAAAAAQBQ..i&rlz=1C1PNFE_enIN1090IN1091&fvr=1&pvq=Cg0vZy8xMXl6ZDFuOW04IhEKC2thcGRhIG1hZmlhEAIYAw&lqi=CgtrYXBkYSBtYWZpYUjozOjA-b2AgAhaHRAAEAEYABgBIgtrYXBkYSBtYWZpYSoGCAIQABABkgEOY2xvdGhpbmdfc3RvcmU&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cdd1ee5a5bafd:0xc177aa65e376a724" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#8F1118] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation size={16} /> GET GOOGLE MAP DIRECTIONS
              </a>
              <div className="text-[10px] text-[#8C8C86] text-center">
                CLICK & COLLECT AVAILABLE (ORDER ONLINE, PICK UP IN STORE)
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
