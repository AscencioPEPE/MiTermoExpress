import { apiRequest } from '../lib/connection';

export const listOrdersCustomer = async (email: string) => {
  const { data } = await apiRequest({ url: `/customer?email=${encodeURIComponent(email)}`, method: 'GET' });

  return data;
};

export const listOrdersByCustomer = async () => {
  const { data } = await apiRequest({ url: '/customer/all', method: 'GET' });

  return data;
};

export const listAllOrders = async () => {
  const { data } = await apiRequest({ url: '/order/all', method: 'GET' });

  return data;
};
