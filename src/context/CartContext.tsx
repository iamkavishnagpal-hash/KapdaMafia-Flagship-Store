'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  category: string;
  storeWorld: 'clothing' | 'shoes';
}

interface CartContextType {
  clothingItems: CartItem[];
  shoeItems: CartItem[];
  activeItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: (world?: 'clothing' | 'shoes') => void;
  clothingTotal: number;
  shoeTotal: number;
  activeTotal: number;
  clothingCount: number;
  shoeCount: number;
  activeCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, currentWorld }: { children: React.ReactNode; currentWorld: 'clothing' | 'shoes' }) {
  const [clothingItems, setClothingItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedClothing = localStorage.getItem('km_cart_clothing');
      if (savedClothing) return JSON.parse(savedClothing);
    } catch {
      // fallback
    }
    return [];
  });

  const [shoeItems, setShoeItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedShoes = localStorage.getItem('km_cart_shoes');
      if (savedShoes) return JSON.parse(savedShoes);
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isMountedRef.current) return;
    try {
      localStorage.setItem('km_cart_clothing', JSON.stringify(clothingItems));
    } catch {
      // ignore
    }
  }, [clothingItems]);

  useEffect(() => {
    if (!isMountedRef.current) return;
    try {
      localStorage.setItem('km_cart_shoes', JSON.stringify(shoeItems));
    } catch {
      // ignore
    }
  }, [shoeItems]);

  const activeItems = currentWorld === 'shoes' ? shoeItems : clothingItems;

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const isShoe = item.storeWorld === 'shoes';
    const updater = isShoe ? setShoeItems : setClothingItems;

    updater(prev => {
      const existingIdx = prev.findIndex(p => p.productId === item.productId && p.size === item.size);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.size}-${Date.now()}`,
        quantity: 1
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    if (currentWorld === 'shoes') {
      setShoeItems(prev => prev.filter(item => item.id !== id));
    } else {
      setClothingItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updater = currentWorld === 'shoes' ? setShoeItems : setClothingItems;
    updater(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = (targetWorld?: 'clothing' | 'shoes') => {
    const target = targetWorld || currentWorld;
    if (target === 'shoes') {
      setShoeItems([]);
    } else {
      setClothingItems([]);
    }
  };

  const clothingTotal = clothingItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shoeTotal = shoeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const activeTotal = currentWorld === 'shoes' ? shoeTotal : clothingTotal;

  const clothingCount = clothingItems.reduce((acc, item) => acc + item.quantity, 0);
  const shoeCount = shoeItems.reduce((acc, item) => acc + item.quantity, 0);
  const activeCount = currentWorld === 'shoes' ? shoeCount : clothingCount;

  return (
    <CartContext.Provider
      value={{
        clothingItems,
        shoeItems,
        activeItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clothingTotal,
        shoeTotal,
        activeTotal,
        clothingCount,
        shoeCount,
        activeCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
