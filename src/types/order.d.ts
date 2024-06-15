export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: OrderElement[];
}

export interface OrderElement {
  status: string;
  products: Product[];
}

export interface Product {
  name: string;
  sku: string;
  price: number;
  description: string;
  colorHex: string;
  color: string;
  urlImage: string;
  urlImageBack: string;
  quantity: number;
}

export interface Variant {
  id: number;
  colorHex: string;
  color: string;
  urlImage: string;
  urlImageBack: string;
}
