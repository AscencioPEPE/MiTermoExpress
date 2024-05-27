import { formattedPrice } from '../../lib/formater';
import { useOrdersCustomerQuery } from '../../services/useOrder';
import useUserStore from '../../zustand/user';
import { Image, Link, Pagination } from '@nextui-org/react';

const Orders = () => {
  const { currentUser } = useUserStore();
  const { data: orders, isLoading } = useOrdersCustomerQuery(currentUser?.email);
  // console.log('orders: ', orders);

  return (
    <div className="flex flex-col gap-4 px-10 py-5">
      {[1, 2].map((order) => (
        <Link href="/products" className="flex gap-10">
          <div className="flex h-[200px] gap-4 rounded-lg bg-[#1A1A1A] p-5 shadow-inner">
            <div className="flex size-[160px] items-center justify-center">
              <Image
                src="https://fotos.productos-api.com/Termo+Vacuum+30+onzas+amarillo.png"
                classNames={{ img: 'size-full object-cover' }}
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full justify-between">
                <h2 className="text-2xl font-bold text-softWhite hover:text-white/90">Product Title of thermos</h2>
                <h3 className="font-bold text-softWhite hover:text-white/90">
                  Status: <span className="text-[#1A1A]">Paid</span>
                </h3>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-white/70 hover:text-white/60">
                  Quantity: <span>(2)</span>
                </p>
                <span className="font-bold text-softWhite hover:text-white/90">{formattedPrice(300)}</span>
              </div>
              <p className="line-clamp-3 text-white/70">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis ea quod dignissimos nisi! Distinctio,
                reprehenderit earum. Minima praesentium omnis impedit. Sapiente, ex quam! Deserunt repellendus est et
                numquam laboriosam perferendis?
              </p>
            </div>
          </div>
        </Link>
      ))}
      <div className="mt-3 flex items-center justify-end gap-3">
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
      </div>
    </div>
  );
};

export default Orders;
