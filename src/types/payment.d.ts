import { User } from './user';

export type Payment = {
  items: ProductItems[];
  customer: Omit<User, 'password' | 'isGuest' | 'orders' | 'token'>;
};

export type ProductItems = {
  name: string;
  price: number;
  variants: string;
  capacity: number;
  quantity: number;
};
