import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import MafiaDropTransition from '@/components/MafiaDropTransition';

const inter = Inter({ subsets: ['latin'] });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: "KAPDA MAFIA | Premium Men's Streetwear Digital Flagship",
  description: "Built for the ones who don't blend in. Explore 400 GSM heavyweight tees, tactical cargos, 500 GSM fleece hoodies, and luxury streetwear uniforms.",
  keywords: ["streetwear", "menswear", "oversized tees", "cargos", "hoodies", "Kapda Mafia", "Gen-Z fashion"],
  openGraph: {
    title: "KAPDA MAFIA — Built For The Ones Who Don't Blend In",
    description: "Premium Men's Streetwear Digital Flagship Experience.",
    url: "https://kapdamafia.com",
    siteName: "KAPDA MAFIA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "KAPDA MAFIA Campaign"
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
        <MafiaDropTransition />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
