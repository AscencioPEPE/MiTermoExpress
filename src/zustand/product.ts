/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Product } from '@/src/types/products';
import { createJSONStorage, persist } from 'zustand/middleware';

type ProductProps = {
  currentProduct: Product;
  storageCurrentProduct: (currentProduct: Product) => void;
  removeCurrentProduct: () => void;
};

const useProductStore = create(
  persist<ProductProps>(
    (set) => ({
      currentProduct: {
        availability: 1,
        capacity: 0,
        category: '',
        color: '',
        colorHex: '',
        description: '',
        name: '',
        price: 0,
        quantity: 0,
        sku: '',
        urlImage: '',
        urlImageBack: '',
      },
      storageCurrentProduct: (currentProduct) => {
        return set((state) => ({
          currentProduct: { ...currentProduct },
        }));
      },
      removeCurrentProduct: () => {
        return set(() => ({
          currentProduct: {
            availability: 1,
            capacity: 0,
            category: '',
            color: '',
            colorHex: '',
            description: '',
            name: '',
            price: 0,
            quantity: 0,
            sku: '',
            urlImage: '',
            urlImageBack: '',
          },
        }));
      },
    }),
    {
      name: 'currentProduct',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;
