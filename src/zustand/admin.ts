/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Admin, AdminResponseApi } from '@/src/types/admin';
import { createJSONStorage, persist } from 'zustand/middleware';

type AdminPartial = Partial<Admin> & AdminResponseApi;

type AdminProps = {
  currentAdmin: AdminPartial;
  storageCurrentAdmin: (currentAdmin: AdminPartial) => void;
  removeCurrentAdmin: (currentAdmin: AdminPartial) => void;
};

const useAdminStore = create(
  persist<AdminProps>(
    (set) => ({
      currentAdmin: {
        password: '',
        username: undefined,
        role: '',
      },
      storageCurrentAdmin: (currentAdmin) => {
        return set((state) => ({
          currentAdmin: {
            username: currentAdmin.username,
            password: undefined,
            role: currentAdmin.role,
          },
        }));
      },
      removeCurrentAdmin: () => {
        return set(() => ({
          currentAdmin: {
            username: '',
            password: undefined,
            role: '',
          },
        }));
      },
    }),
    {
      name: 'currentAdmin',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAdminStore;
