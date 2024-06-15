import { useQuery } from '@tanstack/react-query';
import { listOrdersCustomer, listAllOrders, listOrdersByCustomer } from '../sdk/order';
import { Order } from '@/src/types/order';
import { AllOrders, ProductByCustomer } from '../types/admin-order';

export const useOrdersCustomerQuery = (email: string) =>
  useQuery<Order>({ queryKey: ['orders'], queryFn: () => listOrdersCustomer(email) });

export const useAllOrdersByCustomerQuery = () =>
  useQuery<ProductByCustomer[]>({ queryKey: ['orders'], queryFn: listOrdersByCustomer });

export const useAllOrdersQuery = () => useQuery<AllOrders[]>({ queryKey: ['orders'], queryFn: listAllOrders });
