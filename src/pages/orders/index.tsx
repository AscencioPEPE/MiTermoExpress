import { statusColor } from '../../lib/colors';
import { formattedPrice } from '../../lib/formater';
import { useOrdersCustomerQuery } from '../../services/useOrder';
import useUserStore from '../../zustand/user';
import { Accordion, AccordionItem, Image, Link, Pagination } from '@nextui-org/react';

const Orders = () => {
  const { currentUser } = useUserStore();
  const { data, isLoading } = useOrdersCustomerQuery(currentUser?.email);

  const productOrders = data?.orders?.flatMap(({ products, status }) => {
    return products?.map((product) => ({ ...product, status }));
  });

  return (
    <div className="flex flex-col gap-4 px-10 py-5">
      {productOrders?.map((product, index) => (
        <Link href={`/product/${product.name}`} className="flex gap-10" key={index}>
          <div className="flex h-[200px] w-full gap-4 rounded-lg bg-[#1A1A1A] p-5 shadow-inner">
            <div className="flex size-[160px] items-center justify-center">
              <Image src={product?.variant?.urlImage} classNames={{ img: 'size-full object-cover' }} />
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full justify-between">
                <h2 className="text-2xl font-bold text-softWhite hover:text-white/90">{product?.name}</h2>
                <h3 className="font-bold text-softWhite hover:text-white/90">
                  Status: <span className={statusColor(product?.status)}>{product?.status}</span>
                </h3>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-white/70 hover:text-white/60">
                  Quantity: <span>({product?.quantity})</span>
                </p>
                <span className="font-bold text-softWhite hover:text-white/90">
                  {formattedPrice(product?.price || 0)}
                </span>
              </div>
              <p className="line-clamp-3 text-white/70">{product?.description}</p>
            </div>
          </div>
        </Link>
      ))}
      {/**
       * TODO:
       *  */}
      {/* <div className="mt-3 flex items-center justify-end gap-3">
        <p className="flex gap-2 text-white/60">
          <span className="font-bold ">{10}</span>items of
          <span className="font-bold ">{10} </span>total
        </p>
        <Pagination
          size="lg"
          total={10 || 1}
          classNames={{ item: 'text-white' }}
          variant="bordered"
          // onChange={setPage}
        />
      </div> */}
    </div>
  );
};

export default Orders;
