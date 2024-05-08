import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Chip, Divider, Image, Pagination } from '@nextui-org/react';
import { m, motion } from 'framer-motion';
import { Sidebar } from '../../components/sidebar';
import useApi from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import useCartStore from '../../zustand/cart';
import { faker } from '@faker-js/faker';
import Drawer from 'react-modern-drawer';

export const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<string[]>([]);
  const [showCurrentCart, setShowCurrentCart] = useState(false);

  const { storageCartItem, lastItemAdded, updateCartItem } = useCartStore();
  console.log('lastItemAdded: ', lastItemAdded);

  const { get: products } = useApi({
    method: 'GET',
    key: ['product'],
    url: `product?limit=${limit}&page=${page}${filters.length > 0 ? `&${filters.join('&')}` : ''}`,
  });

  useEffect(() => {
    products?.refetch();
  }, [page, limit, filters]);

  const foo = {
    startIndex: 1,
    endIndex: 0,
    count: 40,
    totalProductsPage: 20,
    page: 1,
    pages: 2,
    products: Array(20)
      .fill({})
      .map(() => ({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        quantity: Math.floor(Math.random() * 10),
        capacity: Math.floor(Math.random() * 100),
        availability: 1,
        variants: Array(3)
          .fill({})
          .map(() => ({
            id: crypto.randomUUID(),
            color: 'red',
          })),
      })),
  };
  console.log(foo, 'foo');
  return (
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex size-full flex-col md:flex-row md:gap-5"
    >
      <div className="w-full md:w-[250px]">
        <Sidebar {...{ filters, setFilters }} />
      </div>
      <div className="flex size-full px-5 md:p-0">
        <div className="w-full">
          {filters.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-3">
              <h3 className="my-5 text-lg font-bold text-softWhite">Products</h3>
              {filters.map((filter, index) => {
                // prevent show order asc or desc
                if (filter.includes('priceOrder')) return null;
                return (
                  <Chip
                    variant="faded"
                    color="warning"
                    onClose={() => {
                      const deleteFilter = filters.filter((_, key) => index !== key);
                      setFilters(deleteFilter);
                    }}
                    classNames={{ base: 'bg-white/15 border-white/30' }}
                  >
                    {filter.split('=')[1]}
                  </Chip>
                );
              })}
            </div>
          ) : (
            <h3 className="my-5 text-lg font-bold text-softWhite">All Products</h3>
          )}
          <div className="flex w-full flex-wrap sm:justify-between sm:gap-5 md:justify-normal">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {foo.products?.map((product: any, index: number) => (
              <div
                key={index}
                className="flex  w-full flex-col justify-between rounded-lg  bg-[#1A1A1A] p-3 text-white/40  shadow-lg md:h-[320px] md:w-[250px] "
              >
                <div className="flex items-center justify-center rounded-lg bg-[#0f0e0e8c]">
                  <Image
                    src="https://thermos.com/cdn/shop/products/SK2020MDB_PRES_1000px.png?v=1624023598"
                    alt="thermos"
                    className="object-contain object-center"
                    classNames={{ img: 'md:w-[100px] md:h-[100px] h-[150px]' }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#F0F0F0]">{product.name}</span>
                  <span>{product.description}</span>
                  <span className="text-[#F0F0F0]">${product.price}</span>
                </div>
                <Divider className="my-4 bg-white/10 md:m-0" />
                <div className="flex w-full gap-2">
                  <Button
                    className="text-gray flex w-full gap-1 border-1 border-white/20 bg-transparent"
                    onPress={() => {
                      storageCartItem(product);
                      setShowCurrentCart(true);
                    }}
                  >
                    <ShoppingCartIcon className="size-[20px]" />
                    <span className="text-xs">Add to cart</span>
                  </Button>
                  <Button className="w-2/6 bg-[#E0F6BF]">Buy</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-[18%] mt-3 flex items-center justify-end gap-3">
            <p className="flex gap-2 text-white/60">
              <span className="font-bold ">{products?.data?.totalProductsPage}</span>items of
              <span className="font-bold ">{products?.data?.count} </span>total
            </p>
            <Pagination
              size="lg"
              total={products?.data?.pages || 1}
              classNames={{ item: 'text-white' }}
              variant="bordered"
              onChange={setPage}
            />
          </div>
        </div>
      </div>
      <Drawer
        open={showCurrentCart}
        onClose={() => setShowCurrentCart(false)}
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
    </motion.div>
  );
};
