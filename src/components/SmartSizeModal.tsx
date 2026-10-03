'use client';

import React, { useState } from 'react';
import { X, Layers, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { SmartSizeService } from '@/services/catalog';

interface SmartSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SmartSizeModal({ isOpen, onClose }: SmartSizeModalProps) {
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(74);
  const [targetGsm, setTargetGsm] = useState<number>(440);
  const [fitPref, setFitPref] = useState<'OVERSIZED' | 'BOXY' | 'REGULAR'>('OVERSIZED');
  const [result, setResult] = useState<ReturnType<typeof SmartSizeService.calculateRecommendedSize> | null>(null);

  if (!isOpen) return null;

  const handleCalculate = () => {
    const res = SmartSizeService.calculateRecommendedSize({
      heightCm: height,
      weightKg: weight,
      fitPreference: fitPref === 'BOXY' ? 'OVERSIZED' : fitPref
    });
    setResult(res);
  };

  // Mathematical GSM drape density calculation
  const drapeWeightCoefficient = ((weight / (height / 100) ** 2) * (targetGsm / 400)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="max-w-lg w-full bg-[#111111] border border-[#1E1E1E] p-6 sm:p-7 shadow-2xl text-[#F4F4F4] space-y-6">
        
        {/* Header - Blueprint 4: PROPORTIONAL DRAPE LAB */}
        <div className="flex justify-between items-start border-b border-[#1E1E1E] pb-4">
          <div>
            <div className="text-[10px] text-[#7D0A0A] uppercase tracking-widest font-mono font-bold">
              ARCHIVE DRAPE MATRIX // LAB 01
            </div>
            <h3 className="text-xl font-bold text-[#F4F4F4] uppercase tracking-tight font-editorial mt-0.5">
              PROPORTIONAL DRAPE LAB
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-[#666666] hover:text-[#F4F4F4] transition-colors cursor-pointer"
            aria-label="Close drape lab"
          >
            <X size={20} />
          </button>
        </div>

        {!result ? (
          <div className="space-y-5 text-xs">
            
            {/* Height & Weight Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-3.5 space-y-2">
                <div className="flex justify-between text-[10px] text-[#8C8C86]">
                  <span>STATURE:</span>
                  <span className="text-white font-bold">{height} CM ({Math.floor(height / 30.48)}&apos;{Math.round((height % 30.48) / 2.54)}&quot;)</span>
                </div>
                <input 
                  type="range" min="155" max="205" value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-[#8F1118] cursor-pointer"
                />
              </div>

              <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-3.5 space-y-2">
                <div className="flex justify-between text-[10px] text-[#8C8C86]">
                  <span>MASS:</span>
                  <span className="text-white font-bold">{weight} KG</span>
                </div>
                <input 
                  type="range" min="50" max="115" value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-[#8F1118] cursor-pointer"
                />
              </div>
            </div>

            {/* GSM Selection */}
            <div>
              <label className="block text-[10px] text-[#77746E] uppercase tracking-wider mb-2">
                FABRIC DENSITY COEFFICIENT (GSM):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[280, 400, 440].map(gsm => (
                  <button
                    key={gsm}
                    type="button"
                    onClick={() => setTargetGsm(gsm)}
                    className={`py-2 text-[10px] font-bold border transition-colors cursor-pointer ${
                      targetGsm === gsm 
                        ? 'border-[#8F1118] bg-[#8F1118] text-white' 
                        : 'border-[#222] bg-[#121212] text-[#888] hover:border-[#444]'
                    }`}
                  >
                    {gsm} GSM {gsm === 440 ? '(HEAVY)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Silhouette Drape Bias */}
            <div>
              <label className="block text-[10px] text-[#77746E] uppercase tracking-wider mb-2">
                SILHOUETTE VOLUME BIAS:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'OVERSIZED', label: 'RADICAL OVERSIZE' },
                  { id: 'BOXY', label: 'STRUCTURED BOXY' },
                  { id: 'REGULAR', label: 'ARCHIVAL STANDARD' }
                ].map(fit => (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() => setFitPref(fit.id as typeof fitPref)}
                    className={`p-2 border text-left transition-colors cursor-pointer ${
                      fitPref === fit.id 
                        ? 'border-[#8F1118] bg-[#1a0809] text-white' 
                        : 'border-[#222] bg-[#101010] text-[#77746E] hover:border-[#333]'
                    }`}
                  >
                    <span className="block text-[9px] font-bold">{fit.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mathematical Summary Line */}
            <div className="flex items-center justify-between p-3 bg-[#080808] border border-[#1c1c1c] text-[9px] text-[#77746E]">
              <span>CALCULATED DRAPE INDEX:</span>
              <span className="text-white font-bold">{drapeWeightCoefficient} DENSITY PTS</span>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-4 bg-[#F3F0E8] hover:bg-[#C8C3B8] text-black font-black tracking-[0.24em] uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>RUN MATRIX &amp; SOLVE FIT</span>
              <ArrowRight size={14} />
            </button>

          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-6 bg-[#0e0e0e] border border-[#222] space-y-3 text-center">
              <div className="text-[9px] text-[#8C8C86] uppercase tracking-widest">
                RECOMMENDED ARCHIVAL PROPORTION
              </div>
              <div className="text-5xl font-black text-[#8F1118] font-editorial">
                {result.recommendedSize}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-[9px] font-bold uppercase">
                <CheckCircle2 size={11} /> CONFIDENCE RATING: {result.confidence}
              </div>
            </div>

            <div className="p-3.5 bg-[#0a0a0a] border border-[#1a1a1a] text-[10px] text-[#B8B4AA] leading-relaxed space-y-1">
              <span className="text-[#8F1118] font-bold block uppercase">ENGINEERING RATIONALE:</span>
              <p>{result.reason}</p>
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full py-3 bg-[#141414] hover:bg-[#1a1a1a] text-[#F3F0E8] border border-[#262626] font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              RE-CALIBRATE PROPORTIONS
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
