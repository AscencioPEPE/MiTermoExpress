import { Variant } from './products';
import { User } from './user';

export type Payment = {
  items: ProductItems[];
  customer: Omit<User, 'password' | 'isGuest' | 'orders' | 'token' | 'username'>;
};

export type ProductItems = {
  name: string;
  price: number;
  variants?: Variant;
  capacity: number;
  quantity: number;
};
