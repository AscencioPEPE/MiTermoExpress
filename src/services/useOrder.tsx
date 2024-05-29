import { useQuery } from '@tanstack/react-query';
import { listOrdersCustomer, listOrders } from '../sdk/order';
import { Order } from '@/src/types/order';

export const useOrdersCustomerQuery = (email: string) =>
  useQuery<Order>({ queryKey: ['orders'], queryFn: () => listOrdersCustomer(email) });

export const useOrdersQuery = () => useQuery({ queryKey: ['orders'], queryFn: listOrders });
