/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { CartProduct } from '@/src/types/products';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartProps = {
  currentCartItems: CartProduct[];
  lastItemAdded?: CartProduct;
  // getLastProductAdded: () => void;
  storageCartItem: (cartItem: CartProduct) => void;
  removeCartItem: (itemName: CartProduct['name']) => void;
  updateCartItem: (itemName: CartProduct['name'], newQuantity: CartProduct) => void;
};

const useCartStore = create(
  persist<CartProps>(
    (set) => ({
      currentCartItems: [],
      lastItemAdded: undefined,
      storageCartItem: (cartItem) => {
        return set((state) => {
          /**
           * When the user add a new product/item, user will be add only one item
           */
          const DEFAULT_QUANTITY = 1;

          const addQuantityToBuy: CartProduct = { ...cartItem, quantityToBuy: DEFAULT_QUANTITY };

          return {
            currentCartItems: [...state.currentCartItems, addQuantityToBuy],
            lastItemAdded: addQuantityToBuy,
          };
        });
      },
      removeCartItem: (itemName) => {
        return set((state) => ({
          currentCartItems: state.currentCartItems.filter((item) => item.name !== itemName),
        }));
      },
      updateCartItem: (itemName, newData) => {
        return set((state) => {
          return {
            lastItemAdded: { ...state.lastItemAdded, quantityToBuy: newData.quantityToBuy } as CartProduct,
            currentCartItems: state.currentCartItems.map((item) => {
              if (item.name === itemName) {
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
