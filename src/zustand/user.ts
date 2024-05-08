/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { User } from '@/src/types/user';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserProps = {
  currentUser: User;
  storageCurrentUser: (currentUser: User) => void;
  clearCurrentUser: () => void;
};

const useUserStore = create(
  persist<UserProps>(
    (set) => ({
      currentUser: {
        accessToken: '',
        tokenType: '',
      },
      storageCurrentUser: (currentUser) => {
        return set((state) => ({
          currentUser: {
            ...state.currentUser,
            ...currentUser,
          },
        }));
      },
      clearCurrentUser: () => {
        return set(() => ({
          currentUser: {
            accessToken: '',
            tokenType: '',
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
