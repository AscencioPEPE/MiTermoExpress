import { useMutation } from '@tanstack/react-query';
import { Payment } from '../types/payment';
import { payProduct, checkPayment } from '../sdk/payment';

export const usePaymentQuery = () =>
  useMutation({
    mutationKey: ['payment'],
    mutationFn: (product: Payment) => payProduct(product),
    onSuccess: (data: string) => {
      window.open(data, '_blank');
    },
  });

export const useCheckPaymentQuery = () =>
  useMutation({
    mutationKey: ['payment'],
    mutationFn: (sessionId: string) => checkPayment(sessionId),
    onSuccess: (data: any) => {
      // console.log('data: ', data);
    },
  });
