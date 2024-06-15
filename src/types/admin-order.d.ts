/**
 *
 * Types for get all orders by customer
 */
export interface ProductByCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: Order[];
}

export interface Order {
  status: string;
  products: ProductElementByCustomer[];
}

export interface ProductElementByCustomer {
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

/**
 *
 * Types for all orders
 */
export interface AllOrders {
  status: string;
  registeredDate: Date;
  updateDate: null;
  customerEmail: string;
  customerAddress: string;
  customerName: string;
  customerPhone: string;
  products: OrderElement[];
}

export interface OrderElement {
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
