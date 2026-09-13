import { CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const items = [['PREMIUM QUALITY', '400—500 GSM construction', ShieldCheck], ['COD AVAILABLE', 'Secure prepaid or cash', CreditCard], ['EASY RETURNS', '7 day exchange window', RotateCcw], ['FAST DELIVERY', 'Pan-India tracked shipping', Truck]] as const;

export default function TrustStrip() {
  return <section className="border-b border-white/10 bg-[#090909] py-7 text-[#C8C3B8]"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-5 font-mono text-[9px] tracking-[0.12em] uppercase sm:px-8 md:grid-cols-4 lg:px-16">{items.map(([title, detail, Icon]) => <div key={title} className="flex items-start gap-3"><Icon size={17} className="shrink-0 text-[#EEEAE1]" /><span><b className="mb-1 block text-[#EEEAE1]">{title}</b>{detail}</span></div>)}</div></section>;
}
