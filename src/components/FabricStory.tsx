import { Layers, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

const details = [
  ['280–440 GSM', 'HEAVYWEIGHT COMBED TERRY', 'Layers'], 
  ['BIO-WASHED', 'SOFTENED VINTAGE WEAVE', 'Sparkles'], 
  ['REINFORCED', 'TACTICAL HARDWARE & SEAMS', 'ShieldCheck'], 
  ['RELAXED', 'ENGINEERED BARREL SILHOUETTE', 'RefreshCw']
];

export default function FabricStory() {
  return (
    <section className="border-b border-[#1E1E1E] bg-[#080808] py-20 text-[#F4F4F4] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 text-xs tracking-widest text-[#7D0A0A] uppercase font-mono font-bold">
              THE DETAILS // CRAFTSMANSHIP SPEC
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] uppercase sm:text-6xl text-[#F4F4F4]">
              WHY IT EARNS ITS PRICE.
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-[#888888] font-mono">
            Technical metadata for the fabrics, custom hardware, and construction choices behind each drop.
          </p>
        </div>
        <div className="grid gap-px bg-[#1E1E1E] border border-[#1E1E1E] sm:grid-cols-2 lg:grid-cols-4">
          {details.map(([title, subtitle, icon]) => { 
            const Icon = icon === 'Layers' ? Layers : icon === 'Sparkles' ? Sparkles : icon === 'ShieldCheck' ? ShieldCheck : RefreshCw; 
            return (
              <div key={title} className="bg-[#111111] p-6 transition-colors hover:bg-[#161616]">
                <Icon size={22} className="mb-10 text-[#7D0A0A]" />
                <div className="text-2xl font-bold tracking-[-0.03em] font-[var(--font-display)] text-[#F4F4F4]">{title}</div>
                <div className="mt-2 text-xs tracking-wider text-[#888888] uppercase font-mono">{subtitle}</div>
              </div>
            ); 
          })}
        </div>
      </div>
    </section>
  );
}

