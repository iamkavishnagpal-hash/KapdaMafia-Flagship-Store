'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [clothingItems, setClothingItems] = useState<CartItem[]>([]);
  const [shoeItems, setShoeItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load carts from localStorage
  useEffect(() => {
    try {
      const savedClothing = localStorage.getItem('km_cart_clothing');
      if (savedClothing) {
        setClothingItems(JSON.parse(savedClothing));
      } else {
        // Default initial demo item for Kapda Mafia
        setClothingItems([
          {
            id: 'init-cloth-1',
            productId: 'pl-001',
            name: 'DARK BLUE BARREL FIT JEANS',
            price: 1899,
            image: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
            size: 'L',
            quantity: 1,
            category: 'denim',
            storeWorld: 'clothing'
          }
        ]);
      }

      const savedShoes = localStorage.getItem('km_cart_shoes');
      if (savedShoes) {
        setShoeItems(JSON.parse(savedShoes));
      } else {
        // Default initial demo item for Shoes Mafia
        setShoeItems([
          {
            id: 'init-shoe-1',
            productId: 'bb-114',
            name: '1239 HIGH-STREET SNEAKER',
            price: 499,
            image: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
            size: '8',
            quantity: 1,
            category: 'sport-shoes',
            storeWorld: 'shoes'
          }
        ]);
      }
    } catch {
      // ignore
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem('km_cart_clothing', JSON.stringify(clothingItems));
    } catch {
      // ignore
    }
  }, [clothingItems, initialized]);

  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem('km_cart_shoes', JSON.stringify(shoeItems));
    } catch {
      // ignore
    }
  }, [shoeItems, initialized]);

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
