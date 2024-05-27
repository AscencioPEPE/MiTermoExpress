import { apiRequest } from '../lib/connection';

export const listOrdersCustomer = async (email: string) => {
  const { data } = await apiRequest({ url: `/customer/${email}`, method: 'GET' });

  return data;
};

export const listOrders = async () => {
  const { data } = await apiRequest({ url: '/customer/all', method: 'GET' });

  return data;
};
