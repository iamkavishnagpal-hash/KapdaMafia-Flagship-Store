'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Share2, ShieldCheck, Truck, RotateCcw, Footprints, Eye, Heart } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import InstagramLiveFeed from './InstagramLiveFeed';

interface ShoesMafiaViewProps {
  products: Product[];
}

export default function ShoesMafiaView({ products }: ShoesMafiaViewProps) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Color and Size Filter states (The Souled Store Vibe)
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('ALL');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('ALL');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('ALL');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Filter products by shoe category, size, price, and color
  const filteredShoes = products.filter(p => {
    // Category filter
    if (activeCategory !== 'ALL') {
      if (activeCategory === 'SPORT SHOES' && p.shoeCategory !== 'SPORT SHOES') return false;
      if (activeCategory === 'Sneaker Shoes' && p.shoeCategory !== 'Sneaker Shoes') return false;
      if (activeCategory === 'FORMAL SHOES' && p.shoeCategory !== 'FORMAL SHOES') return false;
    }
    // Size filter
    if (selectedSizeFilter !== 'ALL') {
      const hasSize = p.variants[0]?.sizes.some(s => s.size === selectedSizeFilter && s.stock > 0);
      if (!hasSize) return false;
    }
    // Price filter
    if (selectedPriceFilter === 'UNDER_500' && p.price > 499) return false;
    if (selectedPriceFilter === '500_1000' && (p.price < 500 || p.price > 1000)) return false;
    // Color filter
    if (selectedColorFilter !== 'ALL') {
      const col = p.variants[0]?.colorName?.toLowerCase() || '';
      if (!col.includes(selectedColorFilter.toLowerCase())) return false;
    }
    return true;
  });

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const nextState = !prev[productId];
      showToast(nextState ? 'SAVED TO WISHLIST' : 'REMOVED FROM WISHLIST');
      return { ...prev, [productId]: nextState };
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.variants[0]?.sizes[0]?.size || '7';
    const heroImage = product.variants[0]?.images[0]?.url || '/media/flying-sneaker-3d.jpg';
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: heroImage,
      size: `UK ${size}`,
      category: product.shoeCategory || 'Footwear',
      storeWorld: 'shoes'
    });

    showToast(`COMMITTED: ${product.name} (UK ${size})`);
    openCart();
  };

  const handleOrderNow = (product: Product) => {
    const size = selectedSizes[product.id] || product.variants[0]?.sizes[0]?.size || '7';
    const heroImage = product.variants[0]?.images[0]?.url || '/media/flying-sneaker-3d.jpg';

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: heroImage,
      size: `UK ${size}`,
      category: product.shoeCategory || 'Footwear',
      storeWorld: 'shoes'
    });

    router.push('/checkout?store=shoes');
  };

  return (
    <div className="bg-[#070b0e] text-[#EEEAE1] font-mono min-h-screen selection:bg-[#00695c]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00695c] text-white px-5 py-3 shadow-2xl font-mono text-xs tracking-wider flex items-center gap-2 border border-teal-400">
          <span>✓</span> {toastMessage}
        </div>
      )}

      {/* Luxury Brutalist Sneaker Vault Hero with 3D UGC Levitation Showcase */}
      <div className="relative border-b border-[#142028] bg-gradient-to-b from-[#0a1217] via-[#091117] to-[#070b0e] py-8 sm:py-14 overflow-hidden">
        {/* Ambient atmospheric glow behind 3D sneaker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00695c]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 Columns: Editorial Headline & Store Identity */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#09181f] border border-[#00695c]/40 text-[#00695c] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00695c] animate-ping" />
                <span>FOOTWEAR · NIT-5 FARIDABAD</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white font-editorial leading-[0.9]">
                MEN'S <span className="text-[#00695c]">FOOTWEAR</span>
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-[#8a9ba8] max-w-xl leading-relaxed tracking-tight">
                High-street streetwear silhouettes, speed runners, and court high-tops calibrated with shock-absorbent dual-density sole engineering. The Souled Store level curation meets Kapda Mafia raw aesthetic.
              </p>

              {/* Quick Spec Highlights */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-[#8a9ba8]">
                <div className="px-3 py-1 bg-[#0e1c24] border border-[#162a36] text-white font-mono font-bold flex items-center gap-1.5">
                  <span className="text-[#00695c]">●</span> UK 6 — 10 IN STOCK
                </div>
                <div className="px-3 py-1 bg-[#0e1c24] border border-[#162a36] text-[#c1d1db] font-mono">
                  FREE 48-HR LOCAL TRANSIT
                </div>
                <div className="px-3 py-1 bg-[#0e1c24] border border-[#162a36] text-[#00695c] font-mono font-bold">
                  MAFIA MEMBER DEALS STARTING ₹499
                </div>
              </div>
            </div>

            {/* Right 5 Columns: 3D UGC Levitating Sneaker Spotlight */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="absolute w-64 h-64 rounded-full border border-teal-500/20 animate-shockwave pointer-events-none" />
              
              <div className="relative w-full max-w-[360px] aspect-[4/3] flex items-center justify-center animate-shoe-3d-hover group cursor-pointer">
                <img
                  src="/media/flying-sneaker-3d.jpg"
                  alt="Shoes Mafia 3D Street Sneaker"
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,105,92,0.6)] filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Trust Strip (The Souled Store Style Clean USPs) */}
      <div className="border-b border-[#142028] bg-[#091117] py-2.5 font-mono text-[11px] text-[#8a9ba8]">
        <div className="max-w-[1600px] mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <Truck size={14} className="text-[#00695c]" />
            <span className="uppercase tracking-wider">FREE EXPRESS TRANSIT</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RotateCcw size={14} className="text-[#00695c]" />
            <span className="uppercase tracking-wider">7 DAYS HASSLE-FREE EXCHANGE</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[#00695c]" />
            <span className="uppercase tracking-wider">GENUINE DUAL-DENSITY RUBBER</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Footprints size={14} className="text-[#00695c]" />
            <span className="uppercase tracking-wider">CASH ON DELIVERY VERIFIED</span>
          </div>
        </div>
      </div>

      {/* The Souled Store Inspired E-commerce Experience: Filter Sidebar + Footwear Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Filters (Size, Price, Colors, Silhouettes) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-[90px] bg-[#0a1318] p-5 border border-[#162733] font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#162733]">
              <span className="text-xs font-bold uppercase tracking-wider text-white">FILTERS</span>
              {(selectedSizeFilter !== 'ALL' || selectedPriceFilter !== 'ALL' || selectedColorFilter !== 'ALL' || activeCategory !== 'ALL') && (
                <button
                  onClick={() => {
                    setSelectedSizeFilter('ALL');
                    setSelectedPriceFilter('ALL');
                    setSelectedColorFilter('ALL');
                    setActiveCategory('ALL');
                  }}
                  className="text-[10px] text-[#00695c] hover:underline uppercase font-bold"
                >
                  RESET ALL
                </button>
              )}
            </div>

            {/* 1. SIZE FILTER (Souled Store Pills) */}
            <div>
              <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5">
                SIZE (UK)
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['ALL', '6', '7', '8', '9', '10'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizeFilter(size)}
                    className={`py-2 text-xs font-bold uppercase transition-all cursor-pointer border ${
                      selectedSizeFilter === size
                        ? 'bg-[#00695c] text-white border-[#00695c] shadow-md'
                        : 'bg-[#060c10] text-[#8a9ba8] border-[#162733] hover:text-white hover:border-[#2a4457]'
                    }`}
                  >
                    {size === 'ALL' ? 'ALL' : `UK ${size}`}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. CATEGORY / SILHOUETTE */}
            <div>
              <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5">
                SILHOUETTE
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'ALL SILHOUETTES', value: 'ALL' },
                  { label: 'SPORT RUNNERS', value: 'SPORT SHOES' },
                  { label: 'SNEAKER SHOES', value: 'Sneaker Shoes' },
                  { label: 'HIGH-TOP COURT', value: 'FORMAL SHOES' }
                ].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 text-xs uppercase font-bold transition-colors flex items-center justify-between border ${
                      activeCategory === cat.value
                        ? 'bg-[#00695c]/20 border-[#00695c] text-teal-300'
                        : 'border-transparent text-[#8a9ba8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {activeCategory === cat.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. PRICE RANGE */}
            <div>
              <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5">
                PRICE RANGE
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'ALL PRICES', value: 'ALL' },
                  { label: 'UNDER ₹500', value: 'UNDER_500' },
                  { label: '₹500 - ₹1,000', value: '500_1000' }
                ].map(item => (
                  <button
                    key={item.value}
                    onClick={() => setSelectedPriceFilter(item.value)}
                    className={`w-full text-left px-3 py-2 text-xs uppercase font-bold transition-colors flex items-center justify-between border ${
                      selectedPriceFilter === item.value
                        ? 'bg-[#00695c]/20 border-[#00695c] text-teal-300'
                        : 'border-transparent text-[#8a9ba8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedPriceFilter === item.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. COLOR FILTER */}
            <div>
              <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5">
                COLOR PALETTE
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'ALL', color: '#fff' },
                  { name: 'White', color: '#e5e7eb' },
                  { name: 'Black', color: '#111827' },
                  { name: 'Grey', color: '#4b5563' },
                  { name: 'Royal', color: '#1e3a8a' },
                  { name: 'Cream', color: '#f5f2eb' }
                ].map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColorFilter(col.name)}
                    className={`py-1.5 px-2 text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 border ${
                      selectedColorFilter === col.name
                        ? 'border-[#00695c] bg-[#00695c]/20 text-white'
                        : 'border-[#162733] text-[#8a9ba8] hover:text-white hover:border-[#2a4457]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: col.color }} />
                    <span className="truncate">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Faridabad NIT-5 Store Info Card */}
            <div className="pt-4 border-t border-[#162733] text-[10px] text-[#788e9d] space-y-1">
              <div className="text-white font-bold">📍 NIT-5 FLAGSHIP FARIDABAD</div>
              <div>Ground Floor, 5G-38, Faridabad 121001</div>
              <div className="text-[#00695c] font-bold">Helpline: +91 83750 00819</div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Products Grid (The Souled Store Inspired Aesthetic) */}
          <main className="lg:col-span-9">
            
            {/* Top Bar: Count & Quick Pills */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-[#142028] gap-3">
              <div className="text-xs text-[#8a9ba8] tracking-wider uppercase font-mono">
                SHOWING <span className="text-white font-bold">{filteredShoes.length}</span> CURATED FOOTWEAR MODELS
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
                {['ALL', 'SPORT SHOES', 'Sneaker Shoes', 'FORMAL SHOES'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                      activeCategory === tab
                        ? 'bg-[#00695c] text-white border-[#00695c]'
                        : 'bg-[#0a141b] text-[#8a9ba8] border-[#162733] hover:text-white'
                    }`}
                  >
                    {tab === 'ALL' ? 'ALL STYLES' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid: Souled Store Aspect Ratio + Visual Hierarchy */}
            {filteredShoes.length === 0 ? (
              <div className="py-24 text-center space-y-3 bg-[#0a1318] border border-[#162733] p-8">
                <div className="text-sm font-bold text-white uppercase font-mono">NO SNEAKERS MATCH YOUR FILTER SELECTION</div>
                <p className="text-xs text-[#8a9ba8]">Try clearing your size or color filters to explore the rest of the collection.</p>
                <button 
                  onClick={() => { setSelectedSizeFilter('ALL'); setSelectedPriceFilter('ALL'); setSelectedColorFilter('ALL'); setActiveCategory('ALL'); }}
                  className="px-6 py-2.5 bg-[#00695c] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#007a6e] transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredShoes.map(shoe => {
                  const currentVariant = shoe.variants[0];
                  const heroImage = currentVariant?.images[0]?.url || '/media/flying-sneaker-3d.jpg';
                  const availableSizes = currentVariant?.sizes || [];
                  const selectedSize = selectedSizes[shoe.id] || availableSizes[0]?.size || '7';
                  const isWishlisted = !!wishlist[shoe.id];

                  return (
                    <article
                      key={shoe.id}
                      className="group relative flex flex-col justify-between bg-[#0a1217] border border-[#162733] hover:border-[#00695c]/60 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden font-mono"
                    >
                      {/* Image Canvas with Aspect Ratio 3/4 (Souled Store Men Footwear proportion) */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#060b0e] flex items-center justify-center">
                        {/* Top Badge (SUPERHIT / BEST SELLER / NEW / LIMITED) */}
                        <div className="absolute top-2.5 left-2.5 z-10 bg-[#00695c] text-white px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md">
                          {shoe.badge || 'SUPERHIT'}
                        </div>

                        {/* Top Right Wishlist Heart Button */}
                        <button
                          onClick={(e) => toggleWishlist(shoe.id, e)}
                          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            isWishlisted 
                              ? 'bg-rose-600 text-white shadow-lg' 
                              : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/80'
                          }`}
                          title="Add to Wishlist"
                          aria-label="Wishlist"
                        >
                          <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                        </button>

                        {/* Sneaker Image */}
                        <img
                          src={heroImage}
                          alt={shoe.name}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* The Souled Store Style Bottom Visual Strip on Image */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 text-[9px] text-[#80cbc4] font-bold uppercase tracking-wider text-center">
                          {shoe.tagline ? shoe.tagline.replace('KAPDA MAFIA SHOES / ', '') : 'OFFICIAL STREETWEAR SOLE'}
                        </div>
                      </div>

                      {/* Card Body: Title, Category, Pricing, Size Selection */}
                      <div className="p-3 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#00695c] font-bold">
                            {shoe.shoeCategory || 'SNEAKER'}
                          </div>
                          
                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white line-clamp-1 group-hover:text-teal-300 transition-colors">
                            {shoe.name}
                          </h3>

                          {/* Price Display + Member Price Pill */}
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-sm sm:text-base font-black text-white">
                              ₹{shoe.price.toLocaleString('en-IN')}
                            </span>
                            {shoe.originalPrice && (
                              <span className="text-[11px] text-[#556977] line-through">
                                ₹{shoe.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#00695c]/20 text-teal-300 border border-[#00695c]/40 font-bold uppercase tracking-wider">
                              MAFIA DEAL
                            </span>
                          </div>
                        </div>

                        {/* Size Selector Chips (UK 6, 7, 8, 9, 10) */}
                        <div className="pt-2 border-t border-[#142028]">
                          <div className="flex items-center justify-between text-[10px] text-[#6d8291] mb-1.5 uppercase">
                            <span>SELECT SIZE (UK):</span>
                            <span className="text-white font-bold">UK {selectedSize}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {availableSizes.map(s => {
                              const isSelected = selectedSize === s.size;
                              const isOutOfStock = s.stock === 0;

                              return (
                                <button
                                  key={s.size}
                                  disabled={isOutOfStock}
                                  onClick={() => handleSelectSize(shoe.id, s.size)}
                                  className={`h-6 min-w-[26px] px-1.5 text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer border ${
                                    isOutOfStock
                                      ? 'bg-white/5 text-gray-600 line-through border-transparent'
                                      : isSelected
                                      ? 'bg-[#00695c] text-white border-[#00695c]'
                                      : 'bg-[#0e1a22] text-[#8a9ba8] border-[#1b2c38] hover:border-[#355266]'
                                  }`}
                                >
                                  {s.size}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 1-Tap Add to Bag + Buy Now CTAs */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button
                            onClick={() => handleAddToCart(shoe)}
                            className="flex min-h-[34px] items-center justify-center gap-1 bg-[#101c24] border border-[#1b2f3d] hover:border-white/30 text-[10px] font-bold uppercase tracking-wider text-[#d1e0ea] transition-colors cursor-pointer"
                          >
                            <ShoppingBag size={12} />
                            <span>ADD BAG</span>
                          </button>

                          <button
                            onClick={() => handleOrderNow(shoe)}
                            className="flex min-h-[34px] items-center justify-center gap-1 bg-[#00695c] hover:bg-[#007a6e] text-[10px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                          >
                            <span>BUY NOW</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>

                      </div>

                    </article>
                  );
                })}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Social Live Feed */}
      <InstagramLiveFeed />

    </div>
  );
}
