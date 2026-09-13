'use client';

import { useEffect, useState } from 'react';

export default function MafiaDropTransition() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 1200); return () => window.clearTimeout(timer); }, []);
  if (!visible) return null;
  return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090909]" aria-hidden="true"><div className="text-center font-mono"><div className="text-[10px] font-bold tracking-[0.4em] text-[#8F1118] uppercase">DROP 09 / SHADOW PROTOCOL</div><h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold tracking-[-0.05em] text-[#EEEAE1] uppercase sm:text-5xl">KAPDA MAFIA</h2><div className="mt-2 text-[10px] tracking-[0.3em] text-[#77746E] uppercase">INITIALIZING UNIFORM...</div></div></div>;
}
