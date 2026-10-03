import { CatalogService } from '@/services/catalog';
import ShoesMafiaView from '@/components/ShoesMafiaView';

export const metadata = {
  title: 'FOOTWEAR // SHOES MAFIA | Chunky Soles & High-Tops',
  description: 'Official Shoes Mafia footwear portal. Dual-density speed runners, chunky lugged soles, and high-top street trainers.'
};

export default async function FootwearPage() {
  const shoeProducts = await CatalogService.getProducts({ world: 'shoes' });
  return <ShoesMafiaView products={shoeProducts} />;
}
