'use client';

import React, { createContext, useContext, useState } from 'react';

export type StoreWorld = 'clothing' | 'shoes';

interface WorldContextType {
  world: StoreWorld;
  setWorld: (world: StoreWorld) => void;
  toggleWorld: () => void;
  isAuthenticated: boolean;
  userPhone: string;
  loginWithPhone: (phone: string) => void;
  logout: () => void;
  showWorldSelector: boolean;
  setShowWorldSelector: (show: boolean) => void;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorldState] = useState<StoreWorld>(() => {
    if (typeof window === 'undefined') return 'clothing';
    try {
      const savedWorld = localStorage.getItem('km_active_world') as StoreWorld;
      if (savedWorld === 'clothing' || savedWorld === 'shoes') return savedWorld;
    } catch {
      // fallback
    }
    return 'clothing';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('km_user_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [userPhone, setUserPhone] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    try {
      return localStorage.getItem('km_user_phone') || '';
    } catch {
      return '';
    }
  });

  const [showWorldSelector, setShowWorldSelector] = useState<boolean>(false);

  const setWorld = (newWorld: StoreWorld) => {
    setWorldState(newWorld);
    try {
      localStorage.setItem('km_active_world', newWorld);
    } catch {
      // ignore
    }
  };

  const toggleWorld = () => {
    const next = world === 'clothing' ? 'shoes' : 'clothing';
    setWorld(next);
  };

  const loginWithPhone = (phone: string) => {
    setIsAuthenticated(true);
    setUserPhone(phone);
    try {
      localStorage.setItem('km_user_authenticated', 'true');
      localStorage.setItem('km_user_phone', phone);
    } catch {
      // ignore
    }
    // Immediately after login, show the world selector modal (Swiggy vs Instamart choice)
    setShowWorldSelector(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserPhone('');
    try {
      localStorage.removeItem('km_user_authenticated');
      localStorage.removeItem('km_user_phone');
    } catch {
      // ignore
    }
  };

  return (
    <WorldContext.Provider
      value={{
        world,
        setWorld,
        toggleWorld,
        isAuthenticated,
        userPhone,
        loginWithPhone,
        logout,
        showWorldSelector,
        setShowWorldSelector
      }}
    >
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
}
