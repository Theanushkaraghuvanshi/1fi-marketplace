export interface ProductVariant {
  id: string;
  label: string;
  /** Variant group name, e.g. Storage / Color */
  type: 'storage' | 'color' | 'size' | 'model';
  priceAdjustment?: number;
  available: boolean;
}

export interface EmiPlan {
  id: string;
  months: number;
  /** Monthly EMI amount in INR (whole rupees) */
  emiAmount: number;
  /** Total payable in INR */
  totalPayable: number;
  /** Display label for interest; mock data uses no-cost */
  interestLabel: string;
  processingFee?: number;
  downPayment?: number;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  availability: 'in_stock' | 'limited' | 'out_of_stock';
  brand: string;
  variants: ProductVariant[];
  emiPlans: EmiPlan[];
  specifications?: { label: string; value: string }[];
}
