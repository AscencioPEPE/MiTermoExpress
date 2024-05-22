import { Button, Divider, Image, ScrollShadow } from '@nextui-org/react';
import useCartStore from '../../zustand/cart';
import { CartProduct } from '@/src/types/products';
import { ModalConfirmation } from '../../components/modal-confirmation';
import { useState } from 'react';
import useUserStore from '../../zustand/user';
import { formattedFixed, formattedPrice } from '../../lib/formater';
import { useLocation } from 'wouter';
import { usePaymentQuery } from '../../services/usePayment';
import { Payment } from '@/src/types/payment';
import Drawer from '../../components/drawer-payment';
import useScroll from '../../hooks/useScroll';
import { classNames } from '../../lib/classes';
import { ModalSimple } from '../../components/modal-simple';
import { ModifyProduct } from '../../components/modify-product';

const SHIPPED = 0;

export const Cart = () => {
  const { currentCartItems, removeCartItem, updateCartItem } = useCartStore();
  const { currentUser, storageCurrentUser } = useUserStore();
  const [_, setLocation] = useLocation();
  const { mutateAsync: payment, isPending } = usePaymentQuery();

  const [openDrawer, setOpenDrawer] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<CartProduct | undefined>(undefined);
  const [productToModify, setProductToModify] = useState<CartProduct | undefined>(undefined);
  const [modifyModal, setModifyModal] = useState(false);

  const handleSubtract = (product: CartProduct) => {
    if (product.quantityToBuy > 1) {
      updateCartItem(product.name, product.quantityToBuy - 1);
      return;
    }
    setModalData(product);
    setShowModal(true);
  };

  const handlePayment = () => {
    /**
     * Check if the customer has account
     */
    const isUserLogged = !!currentUser.address;

    if (!isUserLogged) {
      setLocation('/auth/guest');
      return;
    }
    /**
     * Get the cart and mapping the data for form post
     */
    const items: Payment['items'] = currentCartItems.map((product) => ({
      name: product.name,
      price: Number(formattedFixed(product.price)),
      variants: product.variants[0]['color'],
      capacity: product.capacity,
      quantity: product.quantityToBuy,
    }));
    /**
     * Get the customer and mapping the data for form post
     */
    const customer: Payment['customer'] = {
      address: currentUser.address,
      email: currentUser.email,
      name: currentUser.name,
      phone: currentUser.phone,
    };
    /**
     * Get the customer and products
     */
    const paymentData: Payment = {
      items,
      customer,
    };
    /**
     * Do the payment
     */
    payment(paymentData);
  };

  const getTotal = () => {
    let total = 0;

    currentCartItems.forEach((item) => {
      total += Math.abs(item.price * item.quantityToBuy);
    });

    // Devuelve el total calculado
    return total;
  };

  return (
    <>
      <ModalConfirmation
        title="Eliminar Producto"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onOk={() => {
          removeCartItem(modalData?.name ?? '');
          setShowModal(false);
        }}
        onOkText="Eliminar"
        content="Estas seguro de que deseas eliminar el producto?"
      />
      <ModifyProduct product={productToModify} open={modifyModal} setOpen={setModifyModal} />
      <div className="flex w-full flex-col items-center  justify-center overflow-hidden p-3 md:items-start">
        <div className=" flex w-full flex-col gap-3  md:w-2/3 md:justify-start md:p-3">
          {currentCartItems.map((product, key) => {
            return (
              <div key={key} className="w-full rounded-md bg-[#1A1A1A] py-5 shadow-lg">
                <div className="w-100 flex h-[100px] w-full items-center">
                  <div className="h-100 flex w-full items-center ">
                    <Image
                      src="https://thermos.com/cdn/shop/products/SK2020MDB_PRES_1000px.png?v=1624023598"
                      classNames={{ img: 'min-w-[80px] w-[150px] md:size-[100px] z-1' }}
                      alt="thermos"
                    />
                    <div className="flex w-full flex-col gap-2">
                      <h3 className="truncate font-bold text-softWhite">{product.name}</h3>

                      <p className="line-clamp-1 text-white/60 md:line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-start gap-2">
                        <Button
                          variant="flat"
                          className={classNames(
                            'm-0 border-0 bg-transparent p-0 text-softWhite/80 outline-none hover:outline-none focus:outline-none'
                          )}
                          onPress={() => {
                            setProductToModify(product);
                            setModifyModal(true);
                          }}
                        >
                          Modificar
                        </Button>
                        <Button
                          className="order-0 bg-transparent text-danger outline-none hover:outline-none focus:outline-none md:text-softWhite/80"
                          onPress={() => {
                            setModalData(product);
                            setShowModal(true);
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                    <div className="w-1/3 gap-1 md:flex">
                      <p className="text-white/60">{formattedPrice(product.price)}</p>
                      <p className="text-white/40">({product.quantityToBuy})</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Divider
          orientation="vertical"
          className="mx-2 hidden border-1 border-white bg-white text-white md:inline-block"
        />
        <div className="hidden w-full md:fixed  md:right-0 md:top-[75px] md:inline md:w-1/3">
          <div className="flex flex-col p-3">
            <div className="flex flex-col justify-center gap-5 rounded-md bg-[#1A1A1A] px-2 py-5 shadow-lg">
              <div className="flex items-center gap-5">
                <span className="text-softWhite/60">{`Producto (${currentCartItems.length}):`}</span>
                <span className="text-softWhite/80">{getTotal()}</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-softWhite/60">Shipped:</span>
                <span className="text-softWhite/80">Free</span>
              </div>
              <Divider className="bg-softWhite/20" />
              <div className="flex items-center gap-5">
                <span className="text-softWhite/60">Total: </span>
                <span className="text-softWhite/80">{formattedPrice(Math.abs(getTotal() + SHIPPED || 0))}</span>
              </div>
              <Button className="bg-blue-500 font-bold text-white" onPress={handlePayment} isLoading={isPending}>
                Go to buy!
              </Button>
            </div>
          </div>
        </div>
        <Button className="my-5 w-full bg-[#E0F6BF] font-bold md:hidden" onPress={() => setOpenDrawer(true)}>
          View Order
        </Button>
        <Drawer open={openDrawer} setOpen={setOpenDrawer}>
          <div className="flex flex-col items-start justify-center  gap-y-2 ">
            <div className="flex w-1/2 items-center justify-between">
              <h3 className="text-xl font-bold">Total</h3>
              <h3 className="font-bold">{formattedPrice(getTotal())}</h3>
            </div>
            <div className="mb-4 flex w-1/2 items-center justify-between">
              <p>Shipped</p>
              <p className="font-bold">Free</p>
            </div>
            <div className="max-h-[180px] w-full overflow-auto">
              {currentCartItems.map((item) => (
                <div className="flex items-center justify-between border-b-1 border-white/10 py-2">
                  <p className="w-1/3 text-sm">{item.name}</p>
                  <p className="w-1/3 text-sm">({item.quantityToBuy})</p>
                  <p className="w-1/3 text-sm font-bold">{formattedPrice(Math.abs(item.price * item.quantityToBuy))}</p>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="my-4 w-full bg-blue-500 font-bold text-white"
            onPress={handlePayment}
            isLoading={isPending}
          >
            Go to buy!
          </Button>
        </Drawer>
      </div>
    </>
  );
};

export default Cart;
