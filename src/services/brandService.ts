import { brands } from '@/src/data/brands';
import { Brand } from '@/src/types/brand';

const DEFAULT_DELAY_MS = 450;

function delay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface BrandServiceOptions {
  /** Force an error for testing error UI */
  forceError?: boolean;
  search?: string;
}

export const brandService = {
  async getBrands(options: BrandServiceOptions = {}): Promise<Brand[]> {
    await delay();

    if (options.forceError) {
      throw new Error('Unable to load brands');
    }

    const query = options.search?.trim().toLowerCase();
    if (!query) {
      return [...brands];
    }

    return brands.filter((brand) => brand.name.toLowerCase().includes(query));
  },

  async getBrandById(id: string): Promise<Brand | null> {
    await delay(250);
    return brands.find((brand) => brand.id === id) ?? null;
  },
};
