import { EmiPlan, Product } from '@/src/types/product';

/** Build no-cost EMI plans from a base price (mock, principal only). */
function buildNoCostPlans(price: number): EmiPlan[] {
  const tenures = [3, 6, 9, 12];
  return tenures.map((months) => {
    const emiAmount = Math.round(price / months);
    return {
      id: `emi-${months}`,
      months,
      emiAmount,
      totalPayable: price,
      interestLabel: 'No-cost EMI',
      processingFee: 0,
      downPayment: 0,
    };
  });
}

/**
 * Mock Marketplace catalog.
 * Product imagery uses public Unsplash placeholders; replace when reference assets are provided.
 */
export const products: Product[] = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    shortDescription: 'Titanium. A18 Pro. Camera Control.',
    description:
      'iPhone 16 Pro features a Grade 5 titanium design, the A18 Pro chip, and an advanced camera system with Camera Control. Unlock no-cost EMIs backed by your mutual funds with 1Fi.',
    imageUrl:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    price: 119900,
    originalPrice: 134900,
    discountPercent: 11,
    availability: 'in_stock',
    brand: 'Apple',
    variants: [
      { id: '128gb', label: '128 GB', type: 'storage', available: true },
      {
        id: '256gb',
        label: '256 GB',
        type: 'storage',
        priceAdjustment: 10000,
        available: true,
      },
      {
        id: '512gb',
        label: '512 GB',
        type: 'storage',
        priceAdjustment: 30000,
        available: true,
      },
      { id: 'black', label: 'Black Titanium', type: 'color', available: true },
      { id: 'white', label: 'White Titanium', type: 'color', available: true },
      {
        id: 'desert',
        label: 'Desert Titanium',
        type: 'color',
        available: true,
      },
    ],
    emiPlans: buildNoCostPlans(119900),
    specifications: [
      { label: 'Display', value: '6.3-inch Super Retina XDR' },
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Camera', value: '48MP Fusion + 48MP Ultra Wide' },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air 13" M3',
    shortDescription: 'Thin. Fast. All-day battery.',
    description:
      'MacBook Air with M3 delivers exceptional performance and up to 18 hours of battery life in a fanless design. Available on no-cost EMIs via 1Fi Marketplace.',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    price: 99900,
    originalPrice: 114900,
    discountPercent: 13,
    availability: 'in_stock',
    brand: 'Apple',
    variants: [
      { id: '256gb', label: '256 GB', type: 'storage', available: true },
      {
        id: '512gb',
        label: '512 GB',
        type: 'storage',
        priceAdjustment: 20000,
        available: true,
      },
      { id: 'midnight', label: 'Midnight', type: 'color', available: true },
      { id: 'starlight', label: 'Starlight', type: 'color', available: true },
    ],
    emiPlans: buildNoCostPlans(99900),
    specifications: [
      { label: 'Chip', value: 'Apple M3' },
      { label: 'Memory', value: '8GB Unified Memory' },
      { label: 'Display', value: '13.6-inch Liquid Retina' },
    ],
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    shortDescription: 'Galaxy AI. Titanium frame.',
    description:
      'Galaxy S24 Ultra brings Galaxy AI, a built-in S Pen, and a 200MP camera. Shop with 0% interest EMIs backed by your mutual fund holdings.',
    imageUrl:
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    price: 109999,
    originalPrice: 129999,
    discountPercent: 15,
    availability: 'in_stock',
    brand: 'Samsung',
    variants: [
      { id: '256gb', label: '256 GB', type: 'storage', available: true },
      {
        id: '512gb',
        label: '512 GB',
        type: 'storage',
        priceAdjustment: 15000,
        available: true,
      },
      { id: 'titanium-black', label: 'Titanium Black', type: 'color', available: true },
      { id: 'titanium-gray', label: 'Titanium Gray', type: 'color', available: true },
    ],
    emiPlans: buildNoCostPlans(109999),
    specifications: [
      { label: 'Display', value: '6.8-inch Dynamic AMOLED 2X' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { label: 'Camera', value: '200MP Wide' },
    ],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    shortDescription: 'Industry-leading noise canceling.',
    description:
      'WH-1000XM5 headphones deliver exceptional noise canceling and 30-hour battery life. Buy now on no-cost EMIs with 1Fi.',
    imageUrl:
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    price: 29990,
    originalPrice: 34990,
    discountPercent: 14,
    availability: 'limited',
    brand: 'Sony',
    variants: [
      { id: 'black', label: 'Black', type: 'color', available: true },
      { id: 'silver', label: 'Silver', type: 'color', available: true },
    ],
    emiPlans: buildNoCostPlans(29990),
    specifications: [
      { label: 'Battery', value: 'Up to 30 hours' },
      { label: 'Noise Canceling', value: 'Yes' },
      { label: 'Weight', value: '250 g' },
    ],
  },
  {
    id: 'dyson-v15',
    name: 'Dyson V15 Detect',
    shortDescription: 'Laser dust detection. Powerful suction.',
    description:
      'Dyson V15 Detect Absolute reveals microscopic dust with a laser and adapts suction automatically. Available on no-cost EMIs.',
    imageUrl:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
    price: 62900,
    availability: 'in_stock',
    brand: 'Dyson',
    variants: [
      { id: 'absolute', label: 'Absolute', type: 'model', available: true },
      {
        id: 'detect',
        label: 'Detect+',
        type: 'model',
        priceAdjustment: 5000,
        available: true,
      },
    ],
    emiPlans: buildNoCostPlans(62900),
    specifications: [
      { label: 'Runtime', value: 'Up to 60 minutes' },
      { label: 'Bin volume', value: '0.76 L' },
      { label: 'Filtration', value: 'HEPA' },
    ],
  },
];
