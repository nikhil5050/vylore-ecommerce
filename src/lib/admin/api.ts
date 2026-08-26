// Admin API facade — every function here calls the real Vylore FastAPI
// backend (see paths in comments). Sections of the admin panel with no
// backend support yet (payments, shipping partners, offers, CMS content,
// settings, analytics) have no functions here — those pages render an empty
// state directly instead of pretending to have data.
import * as categoryService from "@/services/admin/category.service";
import * as productService from "@/services/admin/product.service";
import * as inventoryService from "@/services/admin/inventory.service";
import * as orderService from "@/services/admin/order.service";
import * as customerService from "@/services/admin/customer.service";
import * as dashboardService from "@/services/admin/dashboard.service";

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
