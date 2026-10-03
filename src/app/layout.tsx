import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter_Tight, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileBottomBar from '@/components/MobileBottomBar';
import SpatialGatewayPortal from '@/components/SpatialGatewayPortal';
import WorldSelectorModal from '@/components/WorldSelectorModal';
import { AppProviders } from '@/components/AppProviders';

// Editorial display font for high-impact headlines
const display = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['600', '700'],
  variable: '--font-display' 
});

// Editorial Luxury Serif accent for high-end fashion moments
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif'
});

// Primary body and commerce typeface
const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
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
      <body className={`${display.variable} ${sans.variable} ${serif.variable} font-sans bg-[#080808] text-[#F4F4F4] antialiased`}>
        <AppProviders>
          {/* Full-Viewport Spatial Gateway (50/50 Split-Pavilion Entrance) */}
          <SpatialGatewayPortal />
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
