import { CatalogService } from '@/services/catalog';
import ShopPageContent from '@/components/ShopPageContent';

export const metadata = {
  title: 'APPAREL // KAPDA MAFIA | Heavyweight 440 GSM Streetwear Archive',
  description: 'Explore the Kapda Mafia heavyweight streetwear archive. 440 GSM boxy cut tees, tactical cargos, and heavyweight denim.'
};

export default async function ApparelPage() {
  const initialProducts = await CatalogService.getProducts({ world: 'clothing' });
  return <ShopPageContent initialProducts={initialProducts} defaultWorld="clothing" pageTitle="APPAREL // ARCHIVE" />;
}
