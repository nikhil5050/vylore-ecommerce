export type ProductStatus = "draft" | "active" | "inactive";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductImage {
  id: string;
  url: string;
  isMain: boolean;
  order: number;
}

export interface ProductDetails {
  material?: string;
  weight?: string;
  dimensions?: string;
  stone?: string;
  plating?: string;
  occasion?: string;
  collection?: string;
  gender?: string;
  careInstructions?: string;
}

export interface ProductSpecifications {
  metalType?: string;
  purity?: string;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  stoneType?: string;
  stoneColor?: string;
  finish?: string;
  plating?: string;
  closureType?: string;
}

export interface ProductShippingInfo {
  estimatedDelivery?: string;
  returnPolicy?: string;
  warranty?: string;
}

export interface ProductPricing {
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  costPrice?: number;
  taxPercent: number;
}

export interface ProductInventory {
  sku: string;
  barcode?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  stockStatus: StockStatus;
  continueSellingOutOfStock: boolean;
}

export interface ProductVariant {
  id: string;
  size?: string;
  material?: string;
  sku: string;
  price: number;
  stock: number;
  weight?: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  longDescription: string;
  status: ProductStatus;
  categoryId: string;
  categoryName: string;
  collectionIds?: string[];
  images: ProductImage[];
  details: ProductDetails;
  specifications: ProductSpecifications;
  shippingInfo: ProductShippingInfo;
  pricing: ProductPricing;
  inventory: ProductInventory;
  variants: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductListItem = Pick<
  Product,
  | "id"
  | "name"
  | "sku"
  | "categoryName"
  | "status"
  | "createdAt"
> & {
  imageUrl?: string;
  sellingPrice: number;
  mrp: number;
  stockQuantity: number;
  stockStatus: StockStatus;
};
