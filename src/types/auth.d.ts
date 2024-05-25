import { Customer } from './customer';
import { Admin } from './admin';

export type LoginResponseApi = {
  accessToken: string;
  tokenType: string;
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
