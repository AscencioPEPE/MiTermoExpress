import { Button, Divider, Image, Tooltip } from '@nextui-org/react';
import useCartStore from '../../zustand/cart';
import { CartProduct, Variant } from '@/src/types/products';
import { ModalConfirmation } from '../../components/modal-confirmation';
import { useEffect, useState } from 'react';
import useUserStore from '../../zustand/user';
import { formattedFixed, formattedPrice } from '../../lib/formater';
import { useLocation } from 'wouter';
import { usePaymentQuery } from '../../services/usePayment';
import { Payment } from '@/src/types/payment';
import { classNames } from '../../lib/classes';
import { ModifyProduct } from '../../components/modify-product';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ModalSimple } from '../../components/modal-simple';
import useDimensions from '../../hooks/useDimensions';

const SHIPPING = 0;

export const Cart = () => {
  const { currentCartItems, removeCartItem, updateCartItem } = useCartStore();

  const { currentUser } = useUserStore();
  const [_, setLocation] = useLocation();
  const { mutateAsync: payment, isPending } = usePaymentQuery();
  const size = useDimensions();

  const [openDrawer, setOpenDrawer] = useState(size == 'sm' || size == 'md');

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<CartProduct | undefined>(undefined);
  const [productToModify, setProductToModify] = useState<CartProduct | undefined>(undefined);
  const [modifyModal, setModifyModal] = useState(false);

  const handlePayment = () => {
    /**
     * Check if the customer has account
     */
    const isUserLogged = !!currentUser.address && !!currentUser.email;

    if (!isUserLogged) {
      setLocation('/auth/guest');
      return;
    }
    /**
     * Get the cart and mapping the data for form post
     */
    const items: Payment['items'] = currentCartItems.map((product) => ({
      name: product.name,
      description: product.description,
      variant: product.variants[0],
      capacity: product.capacity,
      price: Number(formattedFixed(product.price)),
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

  useEffect(() => {
    setOpenDrawer(size == 'sm' || size == 'md');
  }, [size]);

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
                      src={product?.variants[0]?.urlImage}
                      classNames={{ img: 'min-w-[80px] w-[150px] md:size-[100px] z-1 object-contain' }}
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
                          className="order-0 bg-transparent text-danger outline-none hover:outline-none focus:outline-none"
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
                <span className="text-softWhite/60">Shipping:</span>
                <div className="flex items-center gap-2">
                  <span className="text-softWhite/80">Free</span>
                  <Tooltip content="Only Mexico" className="bg-[#0f0e0e] text-white/50">
                    <QuestionMarkCircleIcon className="size-[25px] cursor-pointer text-blue-500" />
                  </Tooltip>
                </div>
              </div>
              <Divider className="bg-softWhite/20" />
              <div className="flex items-center gap-5">
                <span className="text-softWhite/60">Total: </span>
                <span className="text-softWhite/80">{formattedPrice(Math.abs(getTotal() + SHIPPING || 0))}</span>
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
        <ModalSimple
          isOpen={openDrawer}
          placement="bottom"
          size="5xl"
          className="bg-[#1A1A1A] pb-5"
          onClose={() => setOpenDrawer(false)}
        >
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
              {currentCartItems.map((item, index) => (
                <div className="flex items-center justify-between border-b-1 border-white/10 py-2" key={index}>
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
        </ModalSimple>
      </div>
    </>
  );
};

export default Cart;
