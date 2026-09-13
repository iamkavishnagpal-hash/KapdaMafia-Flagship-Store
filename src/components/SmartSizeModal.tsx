'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { SmartSizeService } from '@/services/catalog';

interface SmartSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SmartSizeModal({ isOpen, onClose }: SmartSizeModalProps) {
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(74);
  const [fitPref, setFitPref] = useState('OVERSIZED');
  const [result, setResult] = useState<ReturnType<typeof SmartSizeService.calculateRecommendedSize> | null>(null);

  if (!isOpen) return null;

  const handleCalculate = () => {
    const res = SmartSizeService.calculateRecommendedSize({
      heightCm: height,
      weightKg: weight,
      fitPreference: fitPref
    });
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#080808] border border-[#181818] p-6 rounded-sm font-mono space-y-6 shadow-2xl">
        
        <div className="flex justify-between items-start border-b border-[#181818] pb-4">
          <div>
            <div className="text-[10px] text-[#8F1118] uppercase tracking-widest font-bold">SMART FIT ENGINE</div>
            <h3 className="text-lg font-black text-[#F3F0E8] uppercase">FIND YOUR SIZE</h3>
          </div>
          <button onClick={onClose} className="text-[#8C8C86] hover:text-[#F3F0E8]"><X size={20} /></button>
        </div>

        {!result ? (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#8C8C86] mb-1">HEIGHT (CM): <span className="text-[#F3F0E8] font-bold">{height} CM</span></label>
              <input 
                type="range" min="150" max="210" value={height} 
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-[#8F1118]"
              />
            </div>

            <div>
              <label className="block text-[#8C8C86] mb-1">WEIGHT (KG): <span className="text-[#F3F0E8] font-bold">{weight} KG</span></label>
              <input 
                type="range" min="45" max="120" value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#8F1118]"
              />
            </div>

            <div>
              <label className="block text-[#8C8C86] mb-2">PREFERRED SILHOUETTE FIT:</label>
              <div className="grid grid-cols-2 gap-2">
                {['OVERSIZED', 'REGULAR'].map(fit => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => setFitPref(fit)}
                    className={`py-2 border text-center transition-colors ${fitPref === fit ? 'border-[#8F1118] bg-[#8F1118] text-white font-bold' : 'border-[#222222] bg-[#111111] text-[#B8B4AA]'}`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-3 bg-[#8F1118] hover:bg-[#B91C1C] text-white font-bold tracking-widest uppercase flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles size={16} /> CALCULATE FIT
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#111111] border border-[#181818] rounded-sm space-y-2 text-center">
              <div className="text-[10px] text-[#8C8C86]">RECOMMENDED SIZE FOR YOU</div>
              <div className="text-4xl font-black text-[#8F1118]">{result.recommendedSize}</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 size={12} /> CONFIDENCE: {result.confidence}
              </div>
            </div>

            <p className="text-xs text-[#B8B4AA] leading-relaxed">{result.reason}</p>

            <button
              onClick={() => setResult(null)}
              className="w-full py-2.5 bg-[#181818] text-[#F3F0E8] border border-[#222222] font-bold tracking-wider uppercase"
            >
              RE-CALCULATE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
