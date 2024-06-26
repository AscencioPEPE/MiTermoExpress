import { useMutation } from '@tanstack/react-query';
import { login, registerAdmin, registerCustomer } from '../sdk/auth';
import {
  CustomerRegisterResponseApi,
  LoginResponseApi,
  AdminRegisterResponseApi,
  GuestRegisterResponseApi,
} from '../types/auth';
import {
  LoginSchema,
  RegisterCustomerSchema,
  RegisterAdminSchema,
  RegisterGuestSchema,
} from '../lib/schemas/schema-auth';
import { useLocation } from 'wouter';
import { toast } from 'react-toastify';
import useUserStore from '../zustand/user';

export const useLoginQuery = () => {
  const { currentUser, storageCurrentUser } = useUserStore();
  const [_, setLocation] = useLocation();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (credentials: LoginSchema) => login(credentials),
    onSuccess: (data: LoginResponseApi) => {
      console.log('data: ', data);
      storageCurrentUser({ ...data, isGuest: false, token: data.accessToken });
      setLocation('/');
    },
    onError: () => toast('User or Password is incorrect'),
  });
};

export const useRegisterCustomerQuery = () => {
  const [_, setLocation] = useLocation();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (credentials: RegisterCustomerSchema) => registerCustomer(credentials),
    onSuccess: (data: CustomerRegisterResponseApi) => {
      setLocation('/auth/login');
    },
    onError: () => toast('An error was ocurred! Please try again'),
  });
};

export const useRegisterGuestQuery = () => {
  const { currentUser, storageCurrentUser } = useUserStore();
  const [_, setLocation] = useLocation();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (credentials: RegisterGuestSchema) => registerCustomer(credentials),
    onSuccess: (data: GuestRegisterResponseApi) => {
      storageCurrentUser({ ...data, isGuest: true, username: data.email });
      setLocation('/cart');
    },
    onError: () => toast('An error was ocurred! Please try again'),
  });
};

export const useRegisterAdminQuery = () => {
  const [_, setLocation] = useLocation();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (credentials: RegisterAdminSchema) => registerAdmin(credentials),
    onSuccess: (data: AdminRegisterResponseApi) => {
      setLocation('/auth/login');
    },
    onError: () => toast('An error was ocurred! Please try again'),
  });
};
