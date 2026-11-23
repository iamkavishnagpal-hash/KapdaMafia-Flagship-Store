// src/components/CustomerReviewsSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, ShieldCheck, ThumbsUp } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  rating: number;
  productName: string;
  sizeBought: string;
  userStats: string;
  fitVerdict: string;
  comment: string;
  date: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Aarav Mehta',
    location: 'Mumbai, MH',
    verified: true,
    rating: 5,
    productName: 'DARK BLUE BARREL FIT JEANS',
    sizeBought: 'Size 32',
    userStats: "Height: 6'1\" · Weight: 74kg",
    fitVerdict: 'TRUE TO BOXY STREETWEAR CUT',
    comment: 'The curve on these jeans is unmatched. Most Indian brands sell basic straight cut calling it baggy, but Kapda Mafia actually engineered the knee articulation and weight. 10/10.',
    date: '2 DAYS AGO'
  },
  {
    id: 'rev-2',
    name: 'Kabir Singhania',
    location: 'New Delhi, DL',
    verified: true,
    rating: 5,
    productName: 'AFTER DARK 440 GSM BOX TEE',
    sizeBought: 'Size L',
    userStats: "Height: 5'11\" · Weight: 78kg",
    fitVerdict: 'PERFECT HEAVYWEIGHT DRAPE',
    comment: 'The 440 GSM claim is 100% real. Heavy collar that does not bacon or sag, premium ribbed neckline, and the drop shoulder sits exactly where high-end streetwear should.',
    date: '5 DAYS AGO'
  },
  {
    id: 'rev-3',
    name: 'Rohan Sharma',
    location: 'Bengaluru, KA',
    verified: true,
    rating: 5,
    productName: 'MODULAR TACTICAL CARGO VAULT',
    sizeBought: 'Size M',
    userStats: "Height: 5'9\" · Weight: 68kg",
    fitVerdict: 'RELAXED BALLOON TAPER',
    comment: 'Pockets are deep and structural without puffing out awkwardly. Heavy twill fabric with solid D-ring hardware. Quality is on par with international brands like Cole Buxton.',
    date: '1 WEEK AGO'
  },
  {
    id: 'rev-4',
    name: 'Devansh Verma',
    location: 'Chandigarh, PB',
    verified: true,
    rating: 5,
    productName: 'MONOCHROME STRIPED T-SHIRT',
    sizeBought: 'Size XL',
    userStats: "Height: 6'2\" · Weight: 84kg",
    fitVerdict: 'PERFECT SLOUCH & LENGTH',
    comment: 'Prepaid order came in 48 hours to Chandigarh. The packaging, inner tape, and garment weight felt like a true luxury experience. Ordering the denim next.',
    date: '2 WEEKS AGO'
  }
];

export default function CustomerReviewsSection() {
  return (
    <section className="bg-[#080808] border-b border-[#1E1E1E] py-16 sm:py-24 text-[#F4F4F4]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Rating Summary Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1E1E1E] gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#7D0A0A] font-mono font-bold tracking-[0.2em] uppercase mb-1">
              <ShieldCheck size={14} />
              <span>VERIFIED STREETWEAR FEEDBACK // NIRMAAN ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-[var(--font-display)]">
              WORN BY THE CULTURE
            </h2>
          </div>

          {/* Social Proof Aggregate Badge */}
          <div className="flex items-center gap-4 bg-[#111111] border border-[#222222] p-3 sm:px-5 sm:py-3 rounded-lg font-mono">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center gap-1">
              <span>4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#AAAAAA] leading-tight border-l border-[#222222] pl-3">
              <span className="text-white font-bold block">480+ VERIFIED RATINGS</span>
              <span>Across NCR, Mumbai, BLR & Punjab</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-mono">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0D0D0D] border border-[#1E1E1E] hover:border-[#333333] p-5 sm:p-6 rounded-xl flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Rating stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[9px] text-[#666666] tracking-widest">{rev.date}</span>
                </div>

                {/* Product Name & Size */}
                <div className="mb-3">
                  <h4 className="text-[11px] font-bold text-white uppercase truncate">
                    {rev.productName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[9px] text-[#888888]">
                    <span className="bg-[#181818] px-1.5 py-0.5 rounded border border-[#262626] text-[#C8C3B8]">
                      {rev.sizeBought}
                    </span>
                    <span>{rev.userStats}</span>
                  </div>
                </div>

                {/* Fit Verdict Callout */}
                <div className="bg-[#141414] border-l-2 border-[#7D0A0A] px-2.5 py-1 text-[9px] font-bold text-[#A09D94] uppercase tracking-wider mb-3">
                  {rev.fitVerdict}
                </div>

                {/* Comment */}
                <p className="text-xs text-[#CCCCCC] leading-relaxed font-sans font-normal">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 mt-4 border-t border-[#1A1A1A] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block uppercase">
                    {rev.name}
                  </span>
                  <span className="text-[9px] text-[#666666] uppercase">
                    {rev.location}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">
                  <CheckCircle size={10} />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
