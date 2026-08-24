export interface StoreSettings {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  currency: string;
  timezone: string;
}

export interface PaymentSettings {
  gateway: "PayU";
  merchantKey: string;
  merchantSalt: string;
  environment: "test" | "live";
  codEnabled: boolean;
}

export interface ShippingSettings {
  freeShippingThreshold: number;
  standardShippingFee: number;
  defaultOriginCity: string;
  handlingDays: number;
}

export interface TaxSettings {
  gstEnabled: boolean;
  gstNumber?: string;
  defaultTaxPercent: number;
}

export interface NotificationSettings {
  newOrder: boolean;
  lowStock: boolean;
  paymentFailure: boolean;
  deliveryIssue: boolean;
  returnRequest: boolean;
  notifyEmail: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl?: string;
}

export interface AdminProfileSettings {
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}
