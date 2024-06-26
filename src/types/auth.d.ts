import { Customer } from './customer';
import { Admin } from './admin';
import { User } from './user';

export type LoginResponseApi = {
  accessToken: string;
  tokenType: string;
  role: User['role'];
  address: string;
  email: string;
  name: string;
  phone: string;
  username: string;
};

export type CustomerRegisterResponseApi = {
  address: string;
  email: string;
  name: string;
  orders: null;
  phone: string;
};
export type GuestRegisterResponseApi = {
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: null;
};

export type AdminRegisterResponseApi = {
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'GUEST';
};
