import { CatalogService } from '@/services/catalog';
import ShoesMafiaView from '@/components/ShoesMafiaView';

export const metadata = {
  title: 'SHOES MAFIA | Kapda Mafia Footwear Collection',
  description: 'Official Kapda Mafia footwear store. Shop performance runners, streetwear sneakers, and court high-tops.'
};

export default async function ShoesPage() {
  const shoeProducts = await CatalogService.getProducts({ world: 'shoes' });

  return <ShoesMafiaView products={shoeProducts} />;
}
