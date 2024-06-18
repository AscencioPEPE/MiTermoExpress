import { useQuery, useMutation } from '@tanstack/react-query';
import { listAdmins, createAdmin, deleteAdmin, updateAdmin } from '../sdk/admin';
import { Admin } from '../types/admin';
import { toast } from 'react-toastify';
import { queryClient } from '../lib/queryClient';

export const useListAdminsQuery = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: listAdmins,
    refetchOnWindowFocus: false,
  });
};

export const useCreateAdminQuery = () => {
  return useMutation({
    mutationKey: ['admin'],
    mutationFn: (data: Admin) => createAdmin(data),
    onSuccess: (data: Admin) => {
      toast('Admin created successfully!');
    },
    onError: () => toast('An error was ocurred, the admin wasnt created!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin'] }),
  });
};

export const useUpdateAdminQuery = () => {
  return useMutation({
    mutationKey: ['admin'],
    mutationFn: (data: Admin) => updateAdmin(data),
    onSuccess: (data: Admin) => {
      toast('Admin updated successfully!');
    },
    onError: () => toast('An error was ocurred, the admin wasnt updated!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin'] }),
  });
};

export const useDeleteAdminQuery = () => {
  return useMutation({
    mutationKey: ['admin'],
    mutationFn: (username: string) => deleteAdmin(username),
    onSuccess: (data: Admin) => {
      toast('Admin deleted successfully!');
    },
    onError: () => toast('An error was ocurred, the admin wasnt deleted!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin'] }),
  });
};
