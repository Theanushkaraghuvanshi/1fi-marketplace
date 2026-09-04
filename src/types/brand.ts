export interface Brand {
  id: string;
  name: string;
  maxEmiMonths: number;
  /** Solid brand color used as logo placeholder when image fails */
  logoColor: string;
  logoInitials: string;
  logoUrl?: string;
}
