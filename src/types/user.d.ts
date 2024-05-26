export type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  isGuest?: boolean;
  orders?: string[];
  token?: string;
  role?: 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_GUEST';
};
