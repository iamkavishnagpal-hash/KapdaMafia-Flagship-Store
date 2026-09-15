'use client';

import { PointerEvent, ReactNode, useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/products';
import { InfiniteMarquee } from '@/components/MotionPrimitives';

type WallItem = {
  productIndex: number;
  displayName: string;
  badge: string;
  front: string;
  back: string;
};

const wallItems: WallItem[] = [
  { productIndex: 0, displayName: 'DARK BLUE BARREL FIT JEANS', badge: 'NEW', front: '/media/product-cargo.png', back: '/media/hero-editorial-model.jpg' },
  { productIndex: 1, displayName: 'STRIPED 280 GSM BOXY TEE', badge: 'BEST SELLER', front: '/media/product-tee.png', back: '/media/product-jacket.png' },
  { productIndex: 2, displayName: 'ACID WASH CREST TEE', badge: 'LIMITED', front: '/media/product-tee.png', back: '/media/hero-editorial-model.jpg' },
  { productIndex: 3, displayName: 'PANELED BAGGY TRACKPANT', badge: 'NEW', front: '/media/product-cargo.png', back: '/media/product-hoodie.png' },
  { productIndex: 4, displayName: 'TACTICAL HEAVY FLUSH CARGO', badge: 'POPULAR', front: '/media/product-cargo.png', back: '/media/product-tee.png' },
  { productIndex: 5, displayName: 'BLACK FLEECE DROP-SHOULDER HOODIE', badge: '440 GSM', front: '/media/product-hoodie.png', back: '/media/hero-editorial-model.jpg' },
  { productIndex: 6, displayName: 'RAW DENIM UTILITY OVERSHIRT', badge: 'RUN 001', front: '/media/product-jacket.png', back: '/media/product-tee.png' },
  { productIndex: 7, displayName: 'PARACHUTE WIDE-LEG WORK PANT', badge: 'RARE', front: '/media/product-cargo.png', back: '/media/product-jacket.png' },
];

function TiltFrame({ children }: { children: ReactNode }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return <div className="product-tilt" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `perspective(1100px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}>{children}</div>;
}

export default function ProductWall() {
  return <section className="bg-[#050505] text-[#F5F5F0]"><div className="mx-auto max-w-[1600px] px-2 pb-10 pt-5 sm:px-4 lg:px-8"><div className="mb-4 flex items-end justify-between border-b border-[#222] pb-3 font-mono"><div><div className="text-[9px] tracking-[0.22em] text-[#A5161F] uppercase font-semibold">CORE COLLECTION / FIRST EDITION</div><h2 className="mt-1 font-[var(--font-display)] text-3xl font-bold tracking-[-0.06em] uppercase sm:text-5xl">THE UNIFORM WALL</h2></div><div className="text-right text-[8px] tracking-[0.18em] text-[#77746E] uppercase">8 PIECES / FRONT + BACK<br />CHOOSE YOUR CUT</div></div><div className="grid grid-cols-2 gap-px bg-[#222] lg:grid-cols-4">{wallItems.map((item, index) => { const product = MOCK_PRODUCTS[item.productIndex]; return <article key={`${item.displayName}-${index}`} className="group relative min-w-0 bg-[#121212]"><TiltFrame><Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#121212]" aria-label={`Choose options for ${item.displayName}`}><img src={item.front} alt={`${item.displayName} front`} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" /><img src={item.back} alt={`${item.displayName} back`} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" /><span className="absolute left-2 top-2 border border-[#333] bg-[#050505]/85 px-2 py-1 font-mono text-[8px] tracking-[0.12em] text-[#F5F5F0] uppercase">{item.badge}</span><span className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center border border-white/20 bg-[#050505]/85 py-3 font-mono text-[9px] font-bold tracking-[0.16em] text-[#F5F5F0] uppercase opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">[ CHOOSE OPTIONS ]</span></Link></TiltFrame><div className="border-t border-[#222] px-3 py-3 font-mono"><div className="flex items-start justify-between gap-2"><h3 className="line-clamp-1 min-w-0 text-sm font-bold tracking-[0.04em] text-[#F5F5F0] uppercase">{item.displayName}</h3><span className="shrink-0 text-[10px] font-bold text-[#F5F5F0]">RS. {product.price.toLocaleString('en-IN')}</span></div></div></article>; })}</div><InfiniteMarquee items={['FRONT / BACK', 'NO RESTOCKS', 'HEAVYWEIGHT COTTON', 'BUILT IN FARIDABAD']} /></div></section>;
}
