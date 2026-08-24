import type { ContentStatus } from "./common";

export interface OfferBanner {
  id: string;
  title: string;
  subtitle: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  ctaText: string;
  ctaLink: string;
  position: number;
  startDate: string;
  endDate: string;
  status: ContentStatus;
}

export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  perCustomerLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  applicableCategories: string[];
  applicableProducts: string[];
  status: ContentStatus;
}
