import { useQuery } from '@tanstack/react-query';
import { getCustomer, listCustomer } from '../sdk/auth';

export const useListCustomerQuery = () => useQuery({ queryKey: ['customer'], queryFn: listCustomer });

export const useCustomerQuery = () => useQuery({ queryKey: ['customer'], queryFn: () => getCustomer('') });
