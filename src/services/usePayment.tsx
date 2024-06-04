import { useMutation } from '@tanstack/react-query';
import { Payment } from '../types/payment';
import { payProduct } from '../sdk/payment';

export const usePaymentQuery = () =>
  useMutation({
    mutationKey: ['payment'],
    mutationFn: (product: Payment) => payProduct(product),
    onSuccess: (data: { idOrder: number; url: string }) => {
      window.open(data.url, '_blank');
    },
  });
