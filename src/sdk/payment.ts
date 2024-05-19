import { apiRequest } from '../lib/connection';
import { Payment } from '../types/payment';

export const payProduct = async (product: Payment) => {
  const { data } = await apiRequest({
    url: 'api/payments/checkout/hosted',
    method: 'POST',
    data: product,
  });

  return data;
};
