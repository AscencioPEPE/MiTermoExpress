/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { CartProduct } from '@/src/types/products';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartProps = {
  currentCartItems: CartProduct[];
  lastItemAdded?: CartProduct;
  // getLastProductAdded: () => void;
  storageCartItem: (cartItem: CartProduct) => void;
  removeCartItem: (sku: CartProduct['sku']) => void;
  updateCartItem: (newQuantity: CartProduct) => void;
};

const useCartStore = create(
  persist<CartProps>(
    (set) => ({
      currentCartItems: [],
      lastItemAdded: undefined,
      storageCartItem: (cartItem) => {
        return set((state) => {
          const products = [...state.currentCartItems, cartItem];

          const uniqueItems = products.reduce((acc: CartProduct[], current: CartProduct) => {
            const isDuplicate = acc.some((item) => item.sku === current.sku);
            if (!isDuplicate) {
              acc.push(current);
            }
            return acc;
          }, []);

          return {
            currentCartItems: uniqueItems,
            lastItemAdded: cartItem,
          };
        });
      },
      removeCartItem: (sku) => {
        return set((state) => ({
          currentCartItems: state.currentCartItems.filter((item) => item.sku !== sku),
        }));
      },
      updateCartItem: (newData) => {
        return set((state) => {
          return {
            lastItemAdded: { ...state.lastItemAdded, quantityToBuy: newData.quantityToBuy } as CartProduct,
            currentCartItems: state.currentCartItems.map((item) => {
              if (item.sku === newData.sku) {
                return newData;
              }
              return item;
            }),
          };
        });
      },
    }),
    {
      name: 'currentCartItems',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
