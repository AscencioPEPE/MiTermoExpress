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

export type AdminRegisterResponseApi = Admin;
