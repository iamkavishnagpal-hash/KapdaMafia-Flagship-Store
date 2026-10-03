'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, Check, ShoppingBag, ArrowRight, RefreshCw } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { MOCK_PRODUCTS } from '@/data/products';

interface MafiaMirrorContextType {
  isOpen: boolean;
  activeProduct: Product | null;
  openMirror: (product: Product) => void;
  closeMirror: () => void;
}

const MafiaMirrorContext = createContext<MafiaMirrorContextType | null>(null);

export function useMafiaMirror() {
  const context = useContext(MafiaMirrorContext);
  if (!context) {
    throw new Error('useMafiaMirror must be used within a MafiaMirrorProvider');
  }
  return context;
}

export function MafiaMirrorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const openMirror = (product: Product) => {
    setActiveProduct(product);
    setIsOpen(true);
  };

  const closeMirror = () => {
    setIsOpen(false);
  };

  return (
    <MafiaMirrorContext.Provider value={{ isOpen, activeProduct, openMirror, closeMirror }}>
      {children}
      <MafiaMirrorDrawer />
    </MafiaMirrorContext.Provider>
  );
}

function MafiaMirrorDrawer() {
  const { isOpen, activeProduct, closeMirror } = useMafiaMirror();
  const { addToCart, openCart } = useCart();

  const [inputMode, setInputMode] = useState<'camera' | 'upload' | 'preview'>('preview');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Curate Outfit Stack: Top + Bottom + Kicks
  const topItem = activeProduct?.category === 'tees' || activeProduct?.category === 'hoodies' || activeProduct?.category === 'jackets'
    ? activeProduct
    : MOCK_PRODUCTS.find(p => p.category === 'tees') || MOCK_PRODUCTS[1];

  const bottomItem = activeProduct?.category === 'denim' || activeProduct?.category === 'cargos'
    ? activeProduct
    : MOCK_PRODUCTS.find(p => p.category === 'denim') || MOCK_PRODUCTS[0];

  const kickItem = MOCK_PRODUCTS.find(p => p.storeWorld === 'shoes') || {
    id: 'shoe-1239',
    name: 'Model 1239 High-Street Sneaker',
    price: 1899,
    variants: [{ images: [{ url: '/media/product-cargo.png' }] }],
    category: 'sneakers'
  };

  const fullLookPrice = (topItem?.price || 1449) + (bottomItem?.price || 1899) + (kickItem?.price || 1899);

  // Stop camera stream on close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setInputMode('preview');
    }
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    setInputMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch {
      setCameraError('Camera access unavailable. Drop a mirror selfie instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setUserPhoto(dataUrl);
      setInputMode('preview');
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
        setInputMode('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFullLook = () => {
    if (topItem) {
      addToCart({
        productId: topItem.id,
        name: topItem.name,
        price: topItem.price,
        image: topItem.variants?.[0]?.images?.[0]?.url || '/media/product-tee.png',
        size: 'L',
        category: topItem.category,
        storeWorld: 'clothing'
      });
    }

    if (bottomItem && bottomItem.id !== topItem?.id) {
      addToCart({
        productId: bottomItem.id,
        name: bottomItem.name,
        price: bottomItem.price,
        image: bottomItem.variants?.[0]?.images?.[0]?.url || '/media/product-cargo.png',
        size: '32',
        category: bottomItem.category,
        storeWorld: 'clothing'
      });
    }

    if (kickItem) {
      addToCart({
        productId: kickItem.id,
        name: kickItem.name,
        price: kickItem.price,
        image: (kickItem as any).images?.[0]?.url || (kickItem as any).variants?.[0]?.images?.[0]?.url || '/media/product-cargo.png',
        size: 'UK 9',
        category: 'sneakers',
        storeWorld: 'shoes'
      });
    }

    closeMirror();
    openCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex justify-end font-mono text-[#EEEAE1] animate-fade-in">
      <div className="w-full max-w-xl h-full bg-[#080808] border-l border-white/15 flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0c0c0c]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#8F1118] text-base">✦</span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Virtual Mirror · Outfit Studio
              </h3>
              <span className="text-xs text-[#8C8C86] tracking-wider uppercase">
                Fit Calibration &amp; Outfit Builder
              </span>
            </div>
          </div>
          <button 
            onClick={closeMirror} 
            className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Studio Body: Photo Canvas + Outfit Stack */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Dual Inputs: Live Camera / Drop Photo */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={startCamera}
              className={`py-2.5 px-3 border text-[9px] font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                inputMode === 'camera'
                  ? 'border-[#8F1118] bg-[#8F1118]/20 text-white'
                  : 'border-white/15 bg-[#111] text-[#AAA] hover:text-white hover:border-white/30'
              }`}
            >
              <Camera size={13} />
              <span>LIVE CAMERA</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 px-3 border border-white/15 bg-[#111] text-[#AAA] hover:text-white hover:border-white/30 text-[9px] font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Upload size={13} />
              <span>DROP PHOTO</span>
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>

          {/* Interactive Visual Canvas */}
          <div className="relative aspect-[3/4] bg-[#0f0f0f] border border-white/10 overflow-hidden flex items-center justify-center group">
            {inputMode === 'camera' && (
              <div className="relative w-full h-full">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover transform -scale-x-100" 
                />
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-[#8F1118] text-white font-bold text-[9px] tracking-[0.2em] uppercase flex items-center gap-2 shadow-xl hover:bg-[#a6151e] cursor-pointer"
                >
                  <Camera size={13} />
                  <span>FREEZE FRAME</span>
                </button>
              </div>
            )}

            {inputMode !== 'camera' && userPhoto && (
              <div className="relative w-full h-full">
                <img 
                  src={userPhoto} 
                  alt="User Mirror Selfie" 
                  className="w-full h-full object-cover" 
                />
                <button
                  onClick={() => setUserPhoto(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/80 border border-white/20 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  title="Remove selfie"
                >
                  <RefreshCw size={12} />
                </button>
              </div>
            )}

            {inputMode !== 'camera' && !userPhoto && (
              <div className="relative w-full h-full">
                <img 
                  src="/media/streetwear-night-lamp.jpg" 
                  alt="Editorial Streetwear Fit Reference" 
                  className="w-full h-full object-cover filter contrast-[1.05]" 
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="border border-white/20 bg-black/80 px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#C8C3B8] uppercase backdrop-blur-md mb-2">
                    DEFAULT EDITORIAL REFERENCE
                  </div>
                  <p className="text-[10px] text-[#888] max-w-xs leading-relaxed">
                    Activate camera or drop a mirror selfie to see proportions calibrated on your body frame.
                  </p>
                </div>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-x-3 bottom-3 bg-red-950/90 border border-red-500/50 p-2.5 text-[9px] text-red-200 text-center">
                {cameraError}
              </div>
            )}

            {/* Silhouette Proportions Overlay Pill */}
            <div className="absolute bottom-3 left-3 bg-black/85 border border-white/20 px-2.5 py-1 text-[8px] tracking-widest text-[#C8C3B8] uppercase backdrop-blur-md">
              CALIBRATED: 440 GSM BOX + BARREL + RUNNER
            </div>
          </div>

          {/* The Outfit Canvas Stack (Top + Bottom + Kicks) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[9px] text-[#77746E] uppercase tracking-widest border-b border-[#1a1a1a] pb-1.5">
              <span>CURATED OUTFIT STACK</span>
              <span>3 PIECE SYNDICATE</span>
            </div>

            {/* TOP */}
            <div className="flex items-center gap-3 p-2.5 bg-[#101010] border border-white/10">
              <img 
                src={topItem?.variants?.[0]?.images?.[0]?.url || '/media/product-tee.png'} 
                alt={topItem?.name} 
                className="w-12 h-14 object-cover bg-black shrink-0 border border-white/10" 
              />
              <div className="flex-1 min-w-0">
                <span className="text-[8px] text-[#8F1118] font-bold uppercase tracking-wider block">TOP LAYER</span>
                <h4 className="text-[11px] font-bold text-white uppercase truncate">{topItem?.name}</h4>
                <span className="text-[9px] text-[#888]">280 GSM BOXY FIT</span>
              </div>
              <span className="text-[11px] font-black text-white shrink-0">₹{topItem?.price?.toLocaleString('en-IN')}</span>
            </div>

            {/* BOTTOM */}
            <div className="flex items-center gap-3 p-2.5 bg-[#101010] border border-white/10">
              <img 
                src={bottomItem?.variants?.[0]?.images?.[0]?.url || '/media/product-cargo.png'} 
                alt={bottomItem?.name} 
                className="w-12 h-14 object-cover bg-black shrink-0 border border-white/10" 
              />
              <div className="flex-1 min-w-0">
                <span className="text-[8px] text-[#8F1118] font-bold uppercase tracking-wider block">BOTTOM LAYER</span>
                <h4 className="text-[11px] font-bold text-white uppercase truncate">{bottomItem?.name}</h4>
                <span className="text-[9px] text-[#888]">440 GSM BARREL CURVE</span>
              </div>
              <span className="text-[11px] font-black text-white shrink-0">₹{bottomItem?.price?.toLocaleString('en-IN')}</span>
            </div>

            {/* KICKS (Shoes Mafia Portal) */}
            <div className="flex items-center gap-3 p-2.5 bg-[#101010] border border-[#00695c]/30">
              <img 
                src={(kickItem as any).images?.[0]?.url || (kickItem as any).variants?.[0]?.images?.[0]?.url || '/media/product-cargo.png'} 
                alt={kickItem.name} 
                className="w-12 h-14 object-cover bg-black shrink-0 border border-[#00695c]/20" 
              />
              <div className="flex-1 min-w-0">
                <span className="text-[8px] text-[#80cbc4] font-bold uppercase tracking-wider block">KICKS (SHOES MAFIA)</span>
                <h4 className="text-[11px] font-bold text-white uppercase truncate">{kickItem.name}</h4>
                <span className="text-[9px] text-[#888]">HIGH-STREET STREETWEAR RUNNER</span>
              </div>
              <span className="text-[11px] font-black text-[#80cbc4] shrink-0">₹{kickItem.price?.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Footer: One-Tap Full Look Bag CTA */}
        <div className="p-5 border-t border-white/10 bg-[#0a0a0a] space-y-2">
          <button
            onClick={handleAddFullLook}
            className="w-full py-4 bg-[#F3F0E8] hover:bg-white text-black font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.01]"
          >
            <ShoppingBag size={15} />
            <span>GET THE FULL LOOK — ₹{fullLookPrice.toLocaleString('en-IN')}</span>
            <ArrowRight size={14} />
          </button>
          <div className="flex items-center justify-between text-[8px] text-[#666] tracking-widest uppercase px-1">
            <span>✓ 3-PIECE SYNDICATE</span>
            <span>✓ FREE EXPRESS DELIVERY</span>
            <span>✓ 1-TAP BAG DISPATCH</span>
          </div>
        </div>

      </div>
    </div>
  );
}
