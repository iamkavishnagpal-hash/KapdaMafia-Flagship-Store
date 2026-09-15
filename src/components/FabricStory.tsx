import { Layers, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

const details = [
  ['280–440 GSM', 'HEAVYWEIGHT COMBED TERRY', 'Layers'], 
  ['BIO-WASHED', 'SOFTENED VINTAGE WEAVE', 'Sparkles'], 
  ['REINFORCED', 'TACTICAL HARDWARE & SEAMS', 'ShieldCheck'], 
  ['RELAXED', 'ENGINEERED BARREL SILHOUETTE', 'RefreshCw']
];

export default function FabricStory() {
  return (
    <section className="border-b border-white/10 bg-[#EEEAE1] py-20 text-[#090909] sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 text-xs tracking-widest text-[#77746E] uppercase font-mono">
              THE DETAILS / CRAFTSMANSHIP
            </div>
            <h2 className="font-[var(--font-display)] text-4xl font-bold tracking-[-0.04em] uppercase sm:text-6xl">
              WHY IT EARNS ITS PRICE.
            </h2>
          </div>
          {/* Issue 11 Fix: Accessible font size text-xs (12px) */}
          <p className="max-w-xs text-xs leading-relaxed text-[#555] font-mono">
            Technical metadata for the fabrics and construction choices behind each drop.
          </p>
        </div>
        <div className="grid gap-px bg-[#090909] sm:grid-cols-2 lg:grid-cols-4">
          {details.map(([title, subtitle, icon]) => { 
            const Icon = icon === 'Layers' ? Layers : icon === 'Sparkles' ? Sparkles : icon === 'ShieldCheck' ? ShieldCheck : RefreshCw; 
            return (
              <div key={title} className="bg-[#F7F4EE] p-6 transition-colors hover:bg-[#C8C3B8]">
                <Icon size={22} className="mb-10 text-[#8F1118]" />
                <div className="text-2xl font-bold tracking-[-0.03em] font-[var(--font-display)]">{title}</div>
                <div className="mt-2 text-xs tracking-wider text-[#77746E] uppercase font-mono">{subtitle}</div>
              </div>
            ); 
          })}
        </div>
      </div>
    </section>
  );
}
