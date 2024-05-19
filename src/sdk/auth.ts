import { apiRequest } from '../lib/connection';
import { LoginSchema, RegisterCustomerSchema } from '../lib/schemas/schema-auth';

export const listCustomer = async () => {
  const { data } = await apiRequest({
    url: '/customer/email',
    method: 'GET',
  });

  return data;
};

export const getCustomer = async (email: string) => {
  const { data } = await apiRequest({
    url: `/customer/email?email=${email}`,
    method: 'GET',
  });

  return data;
};

export const login = async (credentials: LoginSchema) => {
  const { data } = await apiRequest({
    url: '/auth/login',
    method: 'POST',
    data: credentials,
  });

  return data;
};

export const registerCustomer = async (credentials: RegisterCustomerSchema) => {
  console.log('credentials: ', credentials);
  const { data } = await apiRequest({
    url: '/auth/register/customer?createAccount=true',
    method: 'POST',
    data: credentials,
  });

  return data;
};
