import { useCheckPaymentQuery } from '../../services/usePayment';
import { useRoute } from '../../hooks/useParams';
import { Divider, Image, Link } from '@nextui-org/react';
import { useEffect } from 'react';
import { formattedPrice } from '../../lib/formater';
import { Product } from '@/src/types/products';
import useCartStore from '../../zustand/cart';

export interface QueryParamProps {
  session_id: string;
}

const Success = () => {
  const [_, queryParam] = useRoute('/success');
  const { mutateAsync: checkPayment, data } = useCheckPaymentQuery();
  const { clearCartItems } = useCartStore();

  useEffect(() => {
    checkPayment((queryParam as unknown as QueryParamProps).session_id);
    clearCartItems();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center sm:py-5">
      <div className="rounded-lg bg-[#1A1A1A]  sm:w-[500px] sm:p-5 sm:shadow-gray">
        <h3 className="text-center text-2xl font-bold text-primary">Success!</h3>
        <p className="text-center text-lg text-softWhite">Thank you to bought with us</p>
        {data?.order?.products.map((product: Product) => (
          <>
            <div className="my-5 flex w-full gap-5 ">
              <div className="flex w-full">
                <Image src={product.urlImage} className="size-[100px] object-contain" />
              </div>
              <div className="flex w-full flex-col">
                <p className="text-sm font-bold text-white/90">{product.name}</p>
                <p className="text-sm text-white/70">
                  Unit Price: <span className="font-bold text-white/75">{formattedPrice(product.price)}</span>
                </p>
                <p className="text-sm text-white/70">
                  Color: <span className="font-bold text-white/75">{product.color}</span>
                </p>
                <p className="text-sm text-white/70">
                  Capacity: <span className="font-bold text-white/75">{product.capacity ?? 'N/A'}</span>
                </p>
                <p className="text-sm text-white/70">
                  Quantity: <span className="font-bold text-white/75">{product.quantity}</span>
                </p>
              </div>
            </div>
            <p className="mb-5 line-clamp-2 text-xs text-white/40">{product.description}</p>
            <Divider className="bg-white/20" />
          </>
        ))}
        <h3 className="mt-3 text-center text-lg font-bold text-softWhite">
          Total: <span>{formattedPrice(data?.order?.total ?? 0)}</span>
        </h3>

        <div className="my-5 flex flex-col items-center justify-center text-white/40">
          <Divider className="bg-white/20" />
          <span>NOTE:</span>
          <p>Your order will be arriving a few days ago</p>
          <p>We will send you a email with the status of shipment</p>
          <p className="mt-4">Contact this email to custom your thermos:</p>
          <Link className="text-white/70">admin@artetermos.com</Link>
        </div>
        <div className="flex justify-center pb-5">
          <Link href="admin@artetermos.com">Continue buying</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
