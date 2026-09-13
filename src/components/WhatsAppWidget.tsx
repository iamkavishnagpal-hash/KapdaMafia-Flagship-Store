'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent('Hey Kapda Mafia team, I have a question about the latest drop / fit recommendation!');

  return (
    <aside
      aria-label="Direct Support"
      className="fixed bottom-8 right-6 z-40 flex items-center group"
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Need Help? Contact Kapda Mafia Concierge"
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0d0d]/95 px-4 py-2 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]"></span>
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#EEEAE1] uppercase">
          NEED HELP?
        </span>
      </a>
    </aside>
  );
}
