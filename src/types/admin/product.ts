export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductImage {
  id: string;
  mediaAssetId: string;
  url: string;
  position: number;
  isPrimary: boolean;
  altText?: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: string;
  material?: string;
  weight?: string;
  price?: number;
  imageUrl?: string;
  isActive: boolean;
  stock: number;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  isActive: boolean;
  basePrice: number;
  compareAtPrice?: number;
  stock: number | null;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export type ProductListItem = Pick<Product, "id" | "name" | "sku" | "categoryName" | "isActive" | "createdAt"> & {
  imageUrl?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  stockStatus: StockStatus;
};
