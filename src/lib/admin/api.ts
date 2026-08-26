// Admin API facade — every function here calls the real Vylore FastAPI
// backend (see paths in comments). Sections of the admin panel with no
// backend support yet (payments, shipping partners, coupons/product/festival
// offers, other CMS content, settings, analytics) have no functions here —
// those pages render an empty state directly instead of pretending to have
// data.
//
// Offer banners are the one exception: /admin/banners doesn't exist on the
// backend yet either, but the functions below are written against its
// intended contract (see BANNER_API.md) so the admin UI and homepage
// section are ready to go live the moment it ships — until then they'll
// fail with a 404, which the pages that call them handle gracefully.
import * as categoryService from "@/services/admin/category.service";
import * as productService from "@/services/admin/product.service";
import * as inventoryService from "@/services/admin/inventory.service";
import * as orderService from "@/services/admin/order.service";
import * as customerService from "@/services/admin/customer.service";
import * as dashboardService from "@/services/admin/dashboard.service";
import * as bannerService from "@/services/admin/banner.service";

// GET /api/v1/admin/dashboard/stats
export const getDashboardOverview = dashboardService.getAdminDashboardOverview;

// GET/POST /api/v1/admin/products, GET/PATCH/DELETE /api/v1/admin/products/:id
export const getProducts = productService.getAdminProducts;
export const getProduct = productService.getAdminProduct;
export const createProduct = productService.createAdminProduct;
export const updateProduct = productService.updateAdminProduct;
export const deleteProduct = productService.deleteAdminProduct;
export const toProductListItem = productService.toListItem;

// POST /api/v1/admin/products/:id/images, PATCH .../reorder, DELETE .../:imageId
export const addProductImage = productService.addProductImage;
export const reorderProductImages = productService.reorderProductImages;
export const deleteProductImage = productService.deleteProductImage;

// POST/PATCH/DELETE /api/v1/admin/products/:id/variants[/:variantId]
export const addProductVariant = productService.addProductVariant;
export const updateProductVariant = productService.updateProductVariant;
export const deleteProductVariant = productService.deleteProductVariant;

// GET/POST /api/v1/admin/categories, PATCH/DELETE /api/v1/admin/categories/:id
export const getCategories = categoryService.getAdminCategories;
export const createCategory = categoryService.createAdminCategory;
export const updateCategory = categoryService.updateAdminCategory;
export const deleteCategory = categoryService.deleteAdminCategory;

// GET /api/v1/admin/inventory, PATCH /api/v1/admin/inventory/:id
export const getInventory = inventoryService.getAdminInventory;
export const updateInventory = inventoryService.updateAdminInventory;

// GET /api/v1/admin/orders, GET /api/v1/admin/orders/:id
export const getOrders = orderService.getAdminOrders;
export const getOrder = orderService.getAdminOrder;

// GET/PATCH /api/v1/admin/orders/:id/shipment
export const getOrderShipment = orderService.getOrderShipment;
export const updateOrderShipment = orderService.updateOrderShipment;

// GET /api/v1/admin/customers, GET /api/v1/admin/customers/:id
export const getCustomers = customerService.getAdminCustomers;
export const getCustomer = customerService.getAdminCustomer;

// GET/POST /api/v1/admin/banners, PATCH/DELETE /api/v1/admin/banners/:id
// (not implemented on the backend yet — see note above)
export const getBanners = bannerService.getAdminBanners;
export const createBanner = bannerService.createAdminBanner;
export const updateBanner = bannerService.updateAdminBanner;
export const deleteBanner = bannerService.deleteAdminBanner;
