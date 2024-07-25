import { apiRequest } from '../lib/connection';
import { Admin } from '../types/admin';

export const listAdmins = async () => {
  const { data } = await apiRequest({ url: '/super-admin/allAdmins', method: 'GET' });

  return data;
};

export const createAdmin = async (adminData: Admin) => {
  const { data } = await apiRequest({ url: '/super-admin/admin', method: 'POST', data: adminData });

  return data;
};

export const updateAdmin = async (adminData: Admin) => {
  const { data } = await apiRequest({
    url: `/super-admin/admin?username=${adminData.username}`,
    method: 'PUT',
    data: adminData,
  });

  return data;
};

export const deleteAdmin = async (username: string) => {
  const { data } = await apiRequest({ url: `/super-admin/admin?username=${username}`, method: 'DELETE' });

  return data;
};
