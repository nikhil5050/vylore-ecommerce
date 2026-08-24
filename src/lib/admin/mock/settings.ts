import type {
  AdminProfileSettings,
  NotificationSettings,
  PaymentSettings,
  SeoSettings,
  ShippingSettings,
  StoreSettings,
  TaxSettings,
} from "@/types/admin";

export const mockStoreSettings: StoreSettings = {
  storeName: "Vylore Jewellery",
  supportEmail: "support@vylore.com",
  supportPhone: "+91 98200 00000",
  address: "Unit 4, Silver Arcade Industrial Estate, Andheri East, Mumbai, Maharashtra 400069",
  currency: "INR",
  timezone: "Asia/Kolkata",
};

export const mockPaymentSettings: PaymentSettings = {
  gateway: "PayU",
  merchantKey: "",
  merchantSalt: "",
  environment: "test",
  codEnabled: true,
};

export const mockShippingSettings: ShippingSettings = {
  freeShippingThreshold: 2999,
  standardShippingFee: 99,
  defaultOriginCity: "Mumbai",
  handlingDays: 1,
};

export const mockTaxSettings: TaxSettings = {
  gstEnabled: true,
  gstNumber: "27AAAAA0000A1Z5",
  defaultTaxPercent: 3,
};

export const mockNotificationSettings: NotificationSettings = {
  newOrder: true,
  lowStock: true,
  paymentFailure: true,
  deliveryIssue: true,
  returnRequest: true,
  notifyEmail: "admin@vylore.com",
};

export const mockSeoSettings: SeoSettings = {
  metaTitle: "Vylore | Premium Silver Jewellery",
  metaDescription: "Distinctive silver jewellery crafted for those who value design, detail and individuality.",
};

export const mockAdminProfile: AdminProfileSettings = {
  name: "Admin User",
  email: "admin@vylore.com",
  phone: "+91 98200 00000",
};
