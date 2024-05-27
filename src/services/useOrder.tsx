import { useQuery } from '@tanstack/react-query';
import { listOrdersCustomer, listOrders } from '../sdk/order';

export const useOrdersCustomerQuery = (email: string) =>
  useQuery({ queryKey: ['orders'], queryFn: () => listOrdersCustomer(email) });

export const useOrdersQuery = () => useQuery({ queryKey: ['orders'], queryFn: listOrders });
