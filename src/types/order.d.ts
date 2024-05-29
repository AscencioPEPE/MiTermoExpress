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
  price: number;
  variant: Variant;
  quantity: number;
  description: string;
}

export interface Variant {
  id: number;
  colorHex: string;
  color: string;
  urlImage: string;
  urlImageBack: string;
}
