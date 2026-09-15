import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Inter_Tight } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import MafiaDropTransition from '@/components/MafiaDropTransition';
import PhoneOtpModal from '@/components/PhoneOtpModal';
import WorldSelectorModal from '@/components/WorldSelectorModal';
import CartDrawer from '@/components/CartDrawer';
import MobileBottomBar from '@/components/MobileBottomBar';
import { AppProviders } from '@/components/AppProviders';

// TIER 1: Display & High-Tension Headlines (Monument Extended / Space Grotesk Bold 700)
const display = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['700'],
  variable: '--font-display' 
});

// TIER 2: Technical Specs & Metadata (Commit Mono / JetBrains Mono Medium 500)
const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['500', '700'],
  variable: '--font-mono' 
});

// TIER 3: Product Titles & Prices (The Commerce Layer - Inter Tight Medium 500/600)
const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: "KAPDA MAFIA & SHOES MAFIA | Streetwear & Footwear Portals",
  description: "Built for the ones who don't blend in. Explore 400 GSM heavyweight tees, tactical cargos, 500 GSM fleece hoodies, and Kapda Mafia official sneaker collection.",
  keywords: ["streetwear", "menswear", "oversized tees", "cargos", "hoodies", "shoes", "sneakers", "Shoes Mafia", "Kapda Mafia"],
  openGraph: {
    title: "KAPDA MAFIA & SHOES MAFIA — Dual Shopping Worlds",
    description: "Premium Men's Streetwear & Footwear Digital Flagship Experience.",
    url: "https://kapda-mafia.vercel.app",
    siteName: "KAPDA MAFIA",
    images: [
      {
        url: "/media/kapda-mafia-storefront-hero.jpg",
        width: 1200,
        height: 675,
        alt: "KAPDA MAFIA Menswear Campaign"
      }
    ],
    locale: "en_IN",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${display.variable} ${mono.variable} ${sans.variable} font-sans bg-[#080808] text-[#F4F4F4] antialiased`}>
        <AppProviders>
          <MafiaDropTransition />
          <PhoneOtpModal />
          <WorldSelectorModal />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-[56px] lg:pt-[68px]">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
