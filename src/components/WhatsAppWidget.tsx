'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const phoneNumber = '918375000819';
  const defaultMessage = encodeURIComponent('Hey Kapda Mafia team, I have a question about the latest drop / fit recommendation!');

  // On PDP mobile, hide to give full priority to sticky Add to Bag
  if (pathname.startsWith('/product/')) {
    return null;
  }

  return (
    <aside
      aria-label="Direct Concierge"
      className="fixed bottom-16 right-3 sm:bottom-6 sm:right-6 z-30 flex items-center group"
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Flagship Concierge"
        className="flex items-center gap-2 rounded-none border border-white/10 bg-[#080808]/90 px-3 py-1.5 text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-[#111]"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        </span>
        <span className="font-mono text-[9px] font-bold tracking-[0.22em] text-[#C8C3B8] uppercase">
          CONCIERGE
        </span>
      </a>
    </aside>
  );
}
