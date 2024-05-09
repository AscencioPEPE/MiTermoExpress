import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Chip, Divider, Image, Pagination } from '@nextui-org/react';
import { m, motion } from 'framer-motion';
import { Sidebar } from '../../components/sidebar';
import useApi from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import useCartStore from '../../zustand/cart';
import { faker } from '@faker-js/faker';
import { DrawerCart } from '../../components/drawer-cart';
import useDimensions from '../../hooks/useDimensions';

export interface CartDrawer {
  isActive: boolean;
  isMobile: boolean;
}

export const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<string[]>([]);
  const [showCurrentCart, setShowCurrentCart] = useState({
    isMobile: false,
    isActive: false,
  });

  const { storageCartItem } = useCartStore();
  const size = useDimensions();

  const { get: products } = useApi({
    method: 'GET',
    key: ['product'],
    url: `product?limit=${limit}&page=${page}${filters.length > 0 ? `&${filters.join('&')}` : ''}`,
  });

  useEffect(() => {
    products?.refetch();
  }, [page, limit, filters]);

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
                    key={index}
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
            {products?.data?.products?.map((product: any, index: number) => (
              <div
                key={index}
                className="flex  w-full flex-col justify-between gap-y-2 rounded-lg  bg-[#1A1A1A] p-3 text-white/40  shadow-lg md:h-[320px] md:w-[250px] "
              >
                <div className="flex items-center justify-center rounded-lg bg-[#0f0e0e8c]">
                  <Image
                    src="https://thermos.com/cdn/shop/products/SK2020MDB_PRES_1000px.png?v=1624023598"
                    alt="thermos"
                    className="object-contain object-center"
                    classNames={{ img: 'md:w-[100px] md:h-[100px] h-[150px]' }}
                  />
                </div>
                <div className="flex h-full flex-col gap-2">
                  <h4 className="truncate font-semibold text-softWhite">{product.name}</h4>
                  <p className="line-clamp-3 text-sm">{product.description}</p>
                  <span className="text-softWhite">${product.price}</span>
                </div>
                <Divider className="my-4 bg-white/10 md:m-0" />
                <div className="flex w-full gap-2">
                  <Button
                    className="text-gray flex w-full gap-1 border-1 border-white/20 bg-transparent"
                    onPress={() => {
                      storageCartItem(product);
                      const isSmallScreen = size === 'sm' || size === 'md' ? true : false;
                      setShowCurrentCart({ isActive: true, isMobile: isSmallScreen });
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
      <DrawerCart setShowCurrentCart={setShowCurrentCart} showCurrentCart={showCurrentCart} />
    </motion.div>
  );
};
