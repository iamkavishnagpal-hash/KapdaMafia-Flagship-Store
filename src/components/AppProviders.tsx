'use client';

import React from 'react';
import { WorldProvider, useWorld } from '@/context/WorldContext';
import { CartProvider } from '@/context/CartContext';
import { MafiaMirrorProvider } from '@/components/MafiaMirrorDrawer';

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { world } = useWorld();
  const isShoes = world === 'shoes';

  return (
    <CartProvider currentWorld={world}>
      <MafiaMirrorProvider>
        <div 
          className={`min-h-screen transition-colors duration-500 relative ${
            isShoes ? 'bg-[#060e0a]' : 'bg-[#080808]'
          }`}
          data-store-canvas={world}
        >
          {children}
        </div>
      </MafiaMirrorProvider>
    </CartProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WorldProvider>
      <InnerProvider>{children}</InnerProvider>
    </WorldProvider>
  );
}
