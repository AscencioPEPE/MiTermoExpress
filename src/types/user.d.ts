export type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  isGuest?: boolean;
  orders?: string[];
  token?: string;
};

export type UserResponseApi = {
  accessToken: string;
  tokenType: string;
};
