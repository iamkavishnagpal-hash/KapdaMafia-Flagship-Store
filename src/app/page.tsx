import { CatalogService } from '@/services/catalog';
import DualHomePage from '@/components/DualHomePage';

export default async function HomePage() {
  const clothingProducts = await CatalogService.getProducts({ world: 'clothing' });
  const shoeProducts = await CatalogService.getProducts({ world: 'shoes' });
  const lookbooks = await CatalogService.getLookbooks();

  return (
    <DualHomePage
      clothingProducts={clothingProducts}
      shoeProducts={shoeProducts}
      lookbooks={lookbooks}
    />
  );
}
