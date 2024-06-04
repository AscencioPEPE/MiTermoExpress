import { Product } from './products';
import { User } from './user';

export type Payment = {
  items: Omit<Product, 'capacity' | 'category' | 'availability'>[];
  customer: Omit<User, 'password' | 'isGuest' | 'orders' | 'token' | 'username'>;
};

export type ProductItems = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  sku: string;
  colorHex: string;
  urlImage: string;
  urlImageBack: string;
};
