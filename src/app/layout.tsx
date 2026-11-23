import './globals.css';
import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileBottomBar from '@/components/MobileBottomBar';
import CinematicEntrance from '@/components/CinematicEntrance';
import WorldSelectorModal from '@/components/WorldSelectorModal';
import { AppProviders } from '@/components/AppProviders';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'], 
  variable: '--font-instrument-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kapda-mafia.vercel.app'),
  title: "KAPDA MAFIA | Heavyweight Streetwear & Shoes Mafia Portals",
  description: "Explore 400 GSM heavyweight tees, tactical cargos, and Shoes Mafia sneaker line. Two distinct shopping worlds under one flagship.",
  keywords: ["streetwear", "menswear", "heavyweight tees", "cargos", "hoodies", "sneakers", "Shoes Mafia", "Kapda Mafia"],
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
      <body className={`${instrumentSans.variable} bg-[#080808] text-[#F4F4F4] antialiased`}>
        <AppProviders>
          {/* Premium Cinematic Physical Storefront Entrance */}
          <CinematicEntrance />
          {/* Global world portal modal switcher */}
          <WorldSelectorModal />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-[84px] lg:pt-[106px]">{children}</main>
          <Footer />
          <MobileBottomBar />
        </AppProviders>
      </body>
    </html>
  );
}
