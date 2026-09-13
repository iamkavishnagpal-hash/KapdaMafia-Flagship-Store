import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import MafiaDropTransition from '@/components/MafiaDropTransition';
import PhoneOtpModal from '@/components/PhoneOtpModal';
import WorldSelectorModal from '@/components/WorldSelectorModal';
import CartDrawer from '@/components/CartDrawer';
import { AppProviders } from '@/components/AppProviders';

const inter = Inter({ subsets: ['latin'] });
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
      <body className={`${inter.className} ${display.variable} bg-[#090909] text-[#EEEAE1] antialiased`}>
        <AppProviders>
          <MafiaDropTransition />
          <PhoneOtpModal />
          <WorldSelectorModal />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-[100px] sm:pt-24">{children}</main>
          <Footer />
          <WhatsAppWidget />
        </AppProviders>
      </body>
    </html>
  );
}
