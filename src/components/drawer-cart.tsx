import Drawer from 'react-modern-drawer';
import { Image, Button, Divider, Link } from '@nextui-org/react';
import useCartStore from '../zustand/cart';
import { SetStateAction } from 'react';
import { ModalSimple } from './modal-simple';
import { CartDrawer } from '../pages/products/products';

interface DrawerCartProps {
  showCurrentCart: CartDrawer;
  setShowCurrentCart: React.Dispatch<SetStateAction<CartDrawer>>;
}

export const DrawerCart = ({ setShowCurrentCart, showCurrentCart }: DrawerCartProps) => {
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
            <div className="my-8 flex flex-col items-start gap-y-4">
              <div className="flex w-full justify-center">
                <Image className="size-[140px] object-contain" src={lastItemAdded?.variants?.[0]?.urlImage} />
              </div>
              <h4 className="w-full text-center text-lg font-bold">{lastItemAdded?.name}</h4>
              <span className="text-white/60">{lastItemAdded?.description}</span>

              <span className="text-white/60">Color: {lastItemAdded?.variants?.[0]?.color}</span>
            </div>
          </div>
          <Link href="/cart" className="flex justify-center rounded-lg bg-blue-500 py-1.5 font-bold text-white/60">
            Ver el carrito
          </Link>
        </div>
      </Drawer>
      <ModalSimple
        isOpen={showCurrentCart.isActive && showCurrentCart.isMobile}
        placement="bottom"
        size="5xl"
        className="bg-[#1A1A1A] pb-5"
        onClose={() => setShowCurrentCart({ isActive: false, isMobile: false })}
      >
        <div className="flex h-4/6 flex-col justify-between px-3">
          <div className="flex flex-col">
            <div className="w-ful my-5 flex  flex-col items-center justify-center gap-y-5">
              <h3 className="w-full text-center font-bold text-white/80">Has añadido un producto a tu inventario</h3>
            </div>
            <div className="my-8 flex flex-col items-center gap-y-2">
              <Image className="size-[100px] object-contain" src={lastItemAdded?.variants?.[0]?.urlImage} />
              <span className="font-bold">{lastItemAdded?.name}</span>
              <span className="text-white/60">{lastItemAdded?.description}</span>
              <span className="text-white/60">Color: {lastItemAdded?.variants?.[0]?.color}</span>
            </div>
          </div>
          <Link href="/cart" className="flex justify-center rounded-lg bg-blue-500 py-1.5 font-bold text-white/60">
            Ver el carrito
          </Link>
        </div>
      </ModalSimple>
    </>
  );
};
