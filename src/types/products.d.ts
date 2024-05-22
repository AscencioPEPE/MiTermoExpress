export type Products = {
  starIndex: number;
  endIndex: number;
  count: number;
  page: number;
  pages: number;
  totalProductsPage: number;
  products: Product[];
};

export type Product = {
  name: string;
  price: number;
  description: string;
  quantity: number;
  capacity: number;
  category: string;
  availability: number;
  variants: Variant[];
};

export type Variant = {
  id: 5;
  color: string;
  urlImage: string;
  urlImageBack: string;
};

export type CartProduct = Product & { quantityToBuy: number };
