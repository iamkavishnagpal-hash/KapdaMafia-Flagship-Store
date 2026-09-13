'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

export function InfiniteMarquee({ items, tone = 'dark' }: { items: string[]; tone?: 'dark' | 'light' }) {
  const content = [...items, ...items];
  return (
    <div className={`infinite-marquee ${tone === 'light' ? 'infinite-marquee-light' : ''}`} aria-label="Kapda Mafia brand notes">
      <div className="infinite-marquee-track">
        {content.map((item, index) => <span key={`${item}-${index}`} className="infinite-marquee-item">{item}<i aria-hidden="true">✳</i></span>)}
      </div>
    </div>
  );
}
