import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Kapda Mafia & Shoes Mafia',
  description: 'Client confidentiality and data privacy policy for Kapda Mafia & Shoes Mafia.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EEEAE1] py-20 px-4 sm:px-8 max-w-4xl mx-auto font-mono">
      <div className="mb-10 pb-6 border-b border-white/10">
        <div className="text-xs text-[#8F1118] uppercase tracking-widest font-bold mb-2">CLIENT CONFIDENTIALITY</div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white">Privacy Policy</h1>
        <p className="text-xs text-[#8C8C86] mt-2">Effective Date: January 1, 2026</p>
      </div>

      <div className="space-y-8 text-sm text-[#C8C3B8] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-white tracking-wider">1. Data Architecture & Discretion</h2>
          <p>
            Kapda Mafia operates with strict discretion. We collect minimal personal details required to orchestrate dispatch, process payments securely, and sync orders with our warehouse in Faridabad.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-white tracking-wider">2. Payment & Transactions</h2>
          <p>
            All online transactions are tokenized via bank-grade payment gateways (Razorpay / Instant UPI). We do not store raw card numbers or banking passwords.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-white tracking-wider">3. Direct Dispatch & Logistics</h2>
          <p>
            Delivery information (shipping address, contact number) is shared strictly with verified courier partners (Delhivery, BlueDart, BlrExpress) solely to complete order transit.
          </p>
        </section>

        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <Link href="/shop" className="text-xs font-bold text-white hover:text-[#8F1118] uppercase tracking-wider">
            ← Return to Collection
          </Link>
          <span className="text-xs text-[#666]">Kapda Mafia & Shoes Mafia</span>
        </div>
      </div>
    </div>
  );
}
