import { products } from '@/src/data/products';
import { EmiPlan, Product } from '@/src/types/product';
import { calculateNoCostEmi } from '@/src/utils/currency';

const DEFAULT_DELAY_MS = 550;

function delay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ProductServiceOptions {
  forceError?: boolean;
}

function withAdjustedEmiPlans(product: Product, price: number): EmiPlan[] {
  return product.emiPlans.map((plan) => ({
    ...plan,
    emiAmount: calculateNoCostEmi(price, plan.months),
    totalPayable: price,
  }));
}

export function getEffectivePrice(
  product: Product,
  selectedVariantIds: string[],
): number {
  const adjustment = product.variants
    .filter((variant) => selectedVariantIds.includes(variant.id))
    .reduce((sum, variant) => sum + (variant.priceAdjustment ?? 0), 0);
  return product.price + adjustment;
}

export const productService = {
  async getProducts(options: ProductServiceOptions = {}): Promise<Product[]> {
    await delay();

    if (options.forceError) {
      throw new Error('Unable to load products');
    }

    return products.map((product) => ({
      ...product,
      variants: [...product.variants],
      emiPlans: [...product.emiPlans],
      specifications: product.specifications
        ? [...product.specifications]
        : undefined,
    }));
  },

  async getProductById(
    id: string,
    options: ProductServiceOptions = {},
  ): Promise<Product | null> {
    await delay();

    if (options.forceError) {
      throw new Error('Unable to load product details');
    }

    const product = products.find((item) => item.id === id);
    if (!product) {
      return null;
    }

    return {
      ...product,
      variants: [...product.variants],
      emiPlans: [...product.emiPlans],
      specifications: product.specifications
        ? [...product.specifications]
        : undefined,
    };
  },

  getEmiPlansForPrice(product: Product, price: number): EmiPlan[] {
    return withAdjustedEmiPlans(product, price);
  },
};
