// Mock-backed admin API layer. Every function here mirrors a real endpoint
// (see paths in comments) and returns realistic data synchronously wrapped
// in a Promise. Swap the body for a `fetch("/api/admin/...")` call once the
// Flask backend exists — call sites elsewhere in the admin app should not
// need to change.
import * as mock from "@/lib/admin/mock";
import type {
  AdminOrder,
  Coupon,
  Customer,
  DeliveryPartner,
  IcarrySettings,
  OfferBanner,
  OrderStatus,
  PaymentTransaction,
  Product,
  Shipment,
} from "@/types/admin";

function resolved<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

// GET /api/admin/dashboard
export async function getDashboardOverview() {
  return resolved({
    kpis: mock.mockKpis,
    salesSeries: mock.mockSalesSeries,
    orderStatusCounts: mock.mockOrderStatusCounts,
    recentOrders: [...mock.mockOrders].sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1)).slice(0, 6),
  });
}

// GET /api/admin/products, GET /api/admin/products/:id
export async function getProducts() {
  return resolved(mock.mockProducts);
}
export async function getProduct(id: string): Promise<Product | undefined> {
  return resolved(mock.mockProducts.find((p) => p.id === id));
}
// POST /api/admin/products
export async function createProduct(input: Partial<Product>) {
  return resolved({ id: `p-${Date.now()}`, ...input } as Product);
}
// PUT /api/admin/products/:id
export async function updateProduct(id: string, input: Partial<Product>) {
  const existing = mock.mockProducts.find((p) => p.id === id);
  return resolved({ ...existing, ...input, id } as Product);
}
// DELETE /api/admin/products/:id
export async function deleteProduct(_id: string) {
  return resolved({ success: true });
}
// POST /api/admin/products/:id/images (prepared for Cloudinary)
export async function uploadProductImages(_id: string, files: File[]) {
  return resolved(files.map((file, index) => ({ id: `img-${Date.now()}-${index}`, url: URL.createObjectURL(file), isMain: index === 0, order: index })));
}

export async function getCategories() {
  return resolved(mock.mockCategories);
}

// GET /api/admin/orders, GET /api/admin/orders/:id
export async function getOrders() {
  return resolved(mock.mockOrders);
}
export async function getOrder(id: string): Promise<AdminOrder | undefined> {
  return resolved(mock.mockOrders.find((o) => o.id === id));
}
// PUT /api/admin/orders/:id/status
export async function updateOrderStatus(id: string, status: OrderStatus) {
  const order = mock.mockOrders.find((o) => o.id === id);
  return resolved({ ...order, status } as AdminOrder);
}

// GET /api/admin/customers
export async function getCustomers() {
  return resolved(mock.mockCustomers);
}
export async function getCustomer(id: string): Promise<Customer | undefined> {
  return resolved(mock.mockCustomers.find((c) => c.id === id));
}
export async function getCustomerGroups() {
  return resolved(mock.mockCustomerGroups);
}

// GET /api/admin/payments
export async function getPayments(): Promise<PaymentTransaction[]> {
  return resolved(mock.mockPayments);
}

// GET /api/admin/shipments, POST /api/admin/shipments
export async function getShipments(): Promise<Shipment[]> {
  return resolved(mock.mockShipments);
}
export async function createShipment(input: Partial<Shipment>) {
  return resolved({ id: `SHP-${Date.now()}`, ...input } as Shipment);
}
export async function getDeliveryPartners(): Promise<DeliveryPartner[]> {
  return resolved(mock.mockDeliveryPartners);
}
export async function getIcarrySettings(): Promise<IcarrySettings> {
  return resolved(mock.mockIcarrySettings);
}
export async function updateIcarrySettings(input: Partial<IcarrySettings>) {
  return resolved({ ...mock.mockIcarrySettings, ...input });
}
export async function testIcarryConnection() {
  return resolved({ connected: true, message: "Connection successful (sandbox)." });
}

// GET /api/admin/banners, POST/PUT/DELETE /api/admin/banners/:id
export async function getBanners(): Promise<OfferBanner[]> {
  return resolved(mock.mockBanners);
}
export async function createBanner(input: Partial<OfferBanner>) {
  return resolved({ id: `ban-${Date.now()}`, ...input } as OfferBanner);
}
export async function updateBanner(id: string, input: Partial<OfferBanner>) {
  const existing = mock.mockBanners.find((b) => b.id === id);
  return resolved({ ...existing, ...input, id } as OfferBanner);
}
export async function deleteBanner(_id: string) {
  return resolved({ success: true });
}

// GET /api/admin/coupons, POST /api/admin/coupons
export async function getCoupons(): Promise<Coupon[]> {
  return resolved(mock.mockCoupons);
}
export async function createCoupon(input: Partial<Coupon>) {
  return resolved({ id: `cpn-${Date.now()}`, usedCount: 0, ...input } as Coupon);
}
export async function updateCoupon(id: string, input: Partial<Coupon>) {
  const existing = mock.mockCoupons.find((c) => c.id === id);
  return resolved({ ...existing, ...input, id } as Coupon);
}
export async function deleteCoupon(_id: string) {
  return resolved({ success: true });
}

export async function getContentBlocks() {
  return resolved(mock.mockContentBlocks);
}
export async function getTestimonials() {
  return resolved(mock.mockTestimonials);
}
export async function getBlogArticles() {
  return resolved(mock.mockBlogArticles);
}

export async function getStoreSettings() {
  return resolved(mock.mockStoreSettings);
}
export async function getPaymentSettings() {
  return resolved(mock.mockPaymentSettings);
}
export async function getShippingSettings() {
  return resolved(mock.mockShippingSettings);
}
export async function getTaxSettings() {
  return resolved(mock.mockTaxSettings);
}
export async function getNotificationSettings() {
  return resolved(mock.mockNotificationSettings);
}
export async function getAdminProfile() {
  return resolved(mock.mockAdminProfile);
}
