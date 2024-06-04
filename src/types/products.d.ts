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
  description: string;
  price: number;
  quantity: number;
  color: string;
  sku: string;
  colorHex: string;
  urlImage: string;
  urlImageBack: string;
  capacity: number;
  category: string;
  availability: number;
}

export type CartProduct = Product & { quantityToBuy: number };
