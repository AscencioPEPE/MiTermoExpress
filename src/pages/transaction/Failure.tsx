import { useRoute } from '../../hooks/useParams';
import { useCheckPaymentQuery } from '../../services/usePayment';
import { Link } from '@nextui-org/react';
import { QueryParamProps } from './Success';
import useCartStore from '../../zustand/cart';
import { useEffect } from 'react';

const Failure = () => {
  const { clearCartItems } = useCartStore();
  const [_, queryParam] = useRoute('/failure');
  console.log('queryParam: ', queryParam);
  const { mutateAsync: checkPayment } = useCheckPaymentQuery();

  useEffect(() => {
    checkPayment((queryParam as unknown as QueryParamProps)?.session_id);
    clearCartItems();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="rounded-lg bg-[#1A1A1A]  sm:w-[500px] sm:p-5 sm:shadow-gray">
        <h3 className="text-2xl font-bold text-softWhite">Failed!</h3>
        <p className="text-softWhite">The purchase doesn't payed correctly</p>
        <Link href="/cart">Return cart</Link>
      </div>
    </div>
  );
};

export default Failure;
