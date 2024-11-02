export interface ProductDto {
  productId: number;
  unitPrice: number;
  brandId: number;
  categoryId: number;
  title: string;
  sku: string;
  description: string;
  categoryName: string;
  brandName: string;
  imageUrl: string;
}

export interface Brand {
  brandId: number;
  brandName: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}
