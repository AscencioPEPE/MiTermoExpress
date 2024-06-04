export interface Products {
  starIndex: number;
  endIndex: number;
  count: number;
  page: number;
  pages: number;
  totalProductsPage: number;
  products: Product[];
}

export interface Product {
  name: string;
  sku: string;
  price: number;
  description: string;
  capacity: number;
  quantity: number;
  colorHex: string;
  color: string;
  urlImage: string;
  urlImageBack: string;
  category: string;
  availability: number;
}

export type CartProduct = Product & { quantityToBuy: number };
