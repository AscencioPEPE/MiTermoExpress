export type Customer = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  order: Order;
};

export type Order = {
  status: string;
  products: OrderProduct[];
};

export type OrderProduct = {
  name: string;
  price: number;
  variant: string;
  quantity: number;
};
