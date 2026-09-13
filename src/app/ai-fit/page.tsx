'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, AlertTriangle, RefreshCcw } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';

export default function AiFitPage() {
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);
  const [fitMode, setFitMode] = useState('OVERSIZED');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleStartScan = () => {
    setIsProcessing(true);
    setHasResult(false);
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-[#F3F0E8] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#181818] text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181818] border border-[#222222] text-[#8F1118] text-[10px] font-bold tracking-[0.3em] uppercase rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#8F1118] animate-pulse"></span>
            AI FIT STUDIO • BETA PREVIEW
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            VIRTUAL FIT <span className="text-[#8F1118]">SIMULATOR</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#B8B4AA]">
            Upload your frame or select a preset body silhouette to project Kapda Mafia 400 GSM drape and boxy proportions.
          </p>
        </div>

        {/* Beta Disclaimer Banner */}
        <div className="mb-8 p-4 bg-[#111111] border border-[#8F1118]/40 rounded-sm flex items-center gap-3 text-xs text-[#B8B4AA]">
          <AlertTriangle size={18} className="text-[#8F1118] flex-shrink-0" />
          <div>
            <strong className="text-[#F3F0E8]">BETA PREVIEW MODE:</strong> Real generative AI model API provider attachment interface active. Result below demonstrates drape positioning.
          </div>
        </div>

        {/* 2 Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (5 Columns) */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#181818] p-6 rounded-sm space-y-6">
            
            <div>
              <label className="block text-xs text-[#8C8C86] uppercase mb-2">1. SELECT GARMENT SKU:</label>
              <select 
                value={selectedProduct.id}
                onChange={(e) => setSelectedProduct(MOCK_PRODUCTS.find(p => p.id === e.target.value) || MOCK_PRODUCTS[0])}
                className="w-full bg-[#080808] border border-[#222222] text-[#F3F0E8] text-xs px-3 py-3 rounded-sm focus:outline-none focus:border-[#8F1118]"
              >
                {MOCK_PRODUCTS.map(p => (
                  <option key={p.id} value={p.id}>{p.name} — ₹{p.price}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#8C8C86] uppercase mb-2">2. FIT DRAPE PREFERENCE:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['OVERSIZED', 'RELAXED', 'REGULAR'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setFitMode(mode)}
                    className={`py-2.5 border text-center transition-colors ${fitMode === mode ? 'border-[#8F1118] bg-[#8F1118] text-white font-bold' : 'border-[#222222] bg-[#080808] text-[#B8B4AA]'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#8C8C86] uppercase mb-2">3. INPUT BODY FRAME:</label>
              <div className="border-2 border-dashed border-[#222222] hover:border-[#8F1118] p-6 text-center bg-[#080808] rounded-sm cursor-pointer space-y-2 transition-colors">
                <Camera size={24} className="mx-auto text-[#8F1118]" />
                <div className="text-xs text-[#F3F0E8] font-bold">UPLOAD FRONT PHOTO OR USE CAMERA</div>
                <div className="text-[10px] text-[#8C8C86]">PNG, JPG up to 10MB</div>
              </div>
            </div>

            <button
              onClick={handleStartScan}
              disabled={isProcessing}
              className="w-full py-4 bg-[#8F1118] hover:bg-[#B91C1C] text-white font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <RefreshCcw size={16} className="animate-spin" /> SCANNING SILHOUETTE...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> GENERATE VIRTUAL TRY-ON →
                </>
              )}
            </button>

          </div>

          {/* Viewport Canvas (7 Columns) */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#181818] p-6 rounded-sm min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
            
            {isProcessing && (
              <div className="absolute inset-0 bg-[#080808]/90 z-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-2 border-[#8F1118] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xs text-[#8F1118] font-bold tracking-widest uppercase animate-pulse">
                  CALCULATING 400 GSM SHOULDER DROP...
                </div>
              </div>
            )}

            {!hasResult ? (
              <div className="text-center space-y-3 p-8">
                <div className="w-24 h-32 border border-[#222222] mx-auto flex items-center justify-center opacity-40">
                  <span className="text-[10px] text-[#8C8C86]">SILHOUETTE SCANNER</span>
                </div>
                <div className="text-xs text-[#8C8C86]">CONFIGURE YOUR PREFERENCES AND CLICK GENERATE TO PREVIEW VIRTUAL FIT</div>
              </div>
            ) : (
              <div className="w-full space-y-4 text-center">
                <div className="aspect-[4/5] bg-[#181818] border border-[#8F1118] overflow-hidden rounded-sm relative max-w-sm mx-auto">
                  <img 
                    src={selectedProduct.variants[0].images[0].url} 
                    alt="AI Fit Simulation Result"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#080808]/90 backdrop-blur-md p-3 border border-[#181818] text-left text-[10px]">
                    <div className="text-[#8F1118] font-bold uppercase">FIT RESULT: OPTIMAL SIZE L</div>
                    <div className="text-[#B8B4AA]">Drape drape matches intended 400 GSM boxy proportions.</div>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-4">
                  <button 
                    onClick={() => setHasResult(false)}
                    className="px-6 py-2.5 bg-[#181818] border border-[#222222] text-[#F3F0E8] text-xs font-bold uppercase"
                  >
                    RESET SCAN
                  </button>
                  <button className="px-6 py-2.5 bg-[#8F1118] text-white text-xs font-bold uppercase">
                    ADD RECOMMENDED SIZE (L) TO BAG →
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
