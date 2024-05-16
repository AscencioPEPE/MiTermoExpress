/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { User } from '@/src/types/user';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserProps = {
  currentUser: User;
  storageCurrentUser: (currentUser: User) => void;
  removeCurrentUser: () => void;
};

const useUserStore = create(
  persist<UserProps>(
    (set) => ({
      currentUser: {
        address: '',
        email: '',
        name: '',
        phone: '',
        isGuest: undefined,
        password: undefined,
      },
      storageCurrentUser: (currentUser) => {
        return set((state) => ({
          currentUser: {
            address: currentUser.address,
            email: currentUser.email,
            name: currentUser.name,
            phone: currentUser.phone,
            isGuest: currentUser.isGuest,
            password: currentUser.password,
          },
        }));
      },
      removeCurrentUser: () => {
        return set(() => ({
          currentUser: {
            address: '',
            email: '',
            name: '',
            phone: '',
            isGuest: undefined,
            password: undefined,
          },
        }));
      },
    }),
    {
      name: 'currentUser',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
