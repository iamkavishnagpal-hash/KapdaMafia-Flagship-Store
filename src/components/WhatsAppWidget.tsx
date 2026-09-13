'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent('Hey Kapda Mafia team, I have a question about the latest drop / fit recommendation!');

  return (
    <aside
      aria-label="Direct Support"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kapda Mafia VIP Concierge on WhatsApp"
        className="flex items-center gap-2.5 rounded-full border border-white/20 bg-[#121212]/90 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#8F1118] hover:bg-[#1a1a1a] hover:scale-105"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]"></span>
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-[#EEEAE1] uppercase">
            VIP CONCIERGE
          </span>
          <span className="text-[9px] text-[#77746E]">Instant Fit & Drop Help</span>
        </div>
      </a>
    </aside>
  );
}
