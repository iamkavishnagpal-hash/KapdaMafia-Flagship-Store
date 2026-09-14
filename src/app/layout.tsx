import './globals.css';
import type { Metadata } from 'next';
import { Syne, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import MafiaDropTransition from '@/components/MafiaDropTransition';
import PhoneOtpModal from '@/components/PhoneOtpModal';
import WorldSelectorModal from '@/components/WorldSelectorModal';
import CartDrawer from '@/components/CartDrawer';
import MobileBottomBar from '@/components/MobileBottomBar';
import { AppProviders } from '@/components/AppProviders';

const syne = Syne({ 
  subsets: ['latin'], 
  weight: ['700', '800'],
  variable: '--font-syne' 
});

const mono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono' 
});

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

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
        url: "/media/campaign-after-dark.png",
        width: 1200,
        height: 630,
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
      <body className={`${syne.variable} ${mono.variable} ${display.variable} font-mono bg-[#050505] text-[#EEEAE1] antialiased pb-16 sm:pb-0`}>
        <AppProviders>
          <MafiaDropTransition />
          <PhoneOtpModal />
          <WorldSelectorModal />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-[96px] sm:pt-24">{children}</main>
          <Footer />
          <MobileBottomBar />
          <WhatsAppWidget />
        </AppProviders>
      </body>
    </html>
  );
}
