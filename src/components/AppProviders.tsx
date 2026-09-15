'use client';

import React from 'react';
import { WorldProvider, useWorld } from '@/context/WorldContext';
import { CartProvider } from '@/context/CartContext';
import { MafiaMirrorProvider } from '@/components/MafiaMirrorDrawer';

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { world } = useWorld();
  return (
    <CartProvider currentWorld={world}>
      <MafiaMirrorProvider>
        {children}
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
