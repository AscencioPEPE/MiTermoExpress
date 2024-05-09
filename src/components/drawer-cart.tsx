import Drawer from 'react-modern-drawer';
import { Image, Button, Divider } from '@nextui-org/react';
import useCartStore from '../zustand/cart';
import { SetStateAction } from 'react';
import { ModalSimple } from './modal-simple';
import { CartDrawer } from '../pages/products/products';

interface DrawerCartProps {
  showCurrentCart: CartDrawer;
  setShowCurrentCart: React.Dispatch<SetStateAction<CartDrawer>>;
}

export const DrawerCart = ({ setShowCurrentCart, showCurrentCart }: DrawerCartProps) => {
  console.log('showCurrentCart: ', showCurrentCart);
  const { lastItemAdded, updateCartItem } = useCartStore();

  return (
    <>
      <Drawer
        open={showCurrentCart.isActive && !showCurrentCart.isMobile}
        onClose={() => setShowCurrentCart({ isActive: false, isMobile: false })}
        direction="right"
        className="!bg-[#1A1A1A]"
        size={300}
      >
        <div className="flex h-4/6 flex-col justify-between px-3">
          <div className="flex flex-col">
            <div className="w-ful my-8 flex  flex-col items-center justify-center gap-y-5">
              <Image src="/icons/congrats.png" classNames={{ img: 'w-[80px] object-contain object-center' }} />
              <h3 className="w-full text-center font-bold text-white/80">Has añadido un producto a tu inventario</h3>
            </div>
            <div className="my-8 flex flex-col items-center gap-y-2">
              <span className="font-bold">{lastItemAdded?.name}</span>
              <span className="text-white/60">{lastItemAdded?.description}</span>
            </div>
            <div className="my-8 flex items-center  justify-between rounded-lg border-1 border-softWhite/40  bg-[#2f2f2f]">
              <Button
                className="rounded-lg rounded-e-none bg-[#262626] text-softWhite/80"
                isDisabled={lastItemAdded?.quantityToBuy == 1 ? true : false}
                onPress={() => updateCartItem(lastItemAdded?.name ?? '', (lastItemAdded?.quantityToBuy ?? 0) - 1)}
              >
                -
              </Button>
              <span className="px-5 text-softWhite/70 ">{lastItemAdded?.quantityToBuy}</span>
              <Button
                className="rounded-lg rounded-s-none bg-[#262626] text-softWhite/80"
                onPress={() => updateCartItem(lastItemAdded?.name ?? '', (lastItemAdded?.quantityToBuy ?? 0) + 1)}
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Divider className="bg-white/40" />
            <div className="flex w-4/6 flex-wrap justify-between">
              {(lastItemAdded?.quantityToBuy ?? 0) > 1 && (
                <>
                  <span>Precio unitario</span>
                  <span>${lastItemAdded?.price}</span>
                </>
              )}
              <span>Total</span>
              <span>${Math.abs((lastItemAdded?.price ?? 0) * (lastItemAdded?.quantityToBuy ?? 0))}</span>
            </div>
          </div>
        </div>
      </Drawer>
      <ModalSimple
        isOpen={showCurrentCart.isActive && showCurrentCart.isMobile}
        placement="bottom"
        size="5xl"
        className="bg-[#1A1A1A]"
        onClose={() => setShowCurrentCart({ isActive: false, isMobile: false })}
      >
        <div className="flex h-4/6 flex-col justify-between px-3">
          <div className="flex flex-col">
            <div className="w-ful my-8 flex  flex-col items-center justify-center gap-y-5">
              <Image src="/icons/congrats.png" classNames={{ img: 'w-[80px] object-contain object-center' }} />
              <h3 className="w-full text-center font-bold text-white/80">Has añadido un producto a tu inventario</h3>
            </div>
            <div className="my-8 flex flex-col items-center gap-y-2">
              <span className="font-bold">{lastItemAdded?.name}</span>
              <span className="text-white/60">{lastItemAdded?.description}</span>
            </div>
            <div className="my-8 flex items-center  justify-between rounded-lg border-1 border-softWhite/40  bg-[#2f2f2f]">
              <Button
                className="rounded-lg rounded-e-none bg-[#262626] text-softWhite/80"
                isDisabled={lastItemAdded?.quantityToBuy == 1 ? true : false}
                onPress={() => updateCartItem(lastItemAdded?.name ?? '', (lastItemAdded?.quantityToBuy ?? 0) - 1)}
              >
                -
              </Button>
              <span className="px-5 text-softWhite/70 ">{lastItemAdded?.quantityToBuy}</span>
              <Button
                className="rounded-lg rounded-s-none bg-[#262626] text-softWhite/80"
                onPress={() => updateCartItem(lastItemAdded?.name ?? '', (lastItemAdded?.quantityToBuy ?? 0) + 1)}
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Divider className="bg-white/40" />
            <div className="flex w-4/6 flex-wrap justify-between">
              {(lastItemAdded?.quantityToBuy ?? 0) > 1 && (
                <>
                  <span>Precio unitario</span>
                  <span>${lastItemAdded?.price}</span>
                </>
              )}
              <span>Total</span>
              <span>${Math.abs((lastItemAdded?.price ?? 0) * (lastItemAdded?.quantityToBuy ?? 0))}</span>
            </div>
          </div>
        </div>
      </ModalSimple>
    </>
  );
};
