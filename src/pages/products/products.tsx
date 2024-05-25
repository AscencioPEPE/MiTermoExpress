import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Button, Chip, Divider, Image, Link, Pagination } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Sidebar } from '../../components/sidebar';
import { useState } from 'react';
import useCartStore from '../../zustand/cart';
import { DrawerCart } from '../../components/drawer-cart';
import useDimensions from '../../hooks/useDimensions';
import { useListProductQuery } from '../../services/useProduct';
import { SkeletonProduct } from '../../components/skeleton-products';
import { CartProduct } from '@/src/types/products';
import { classNames } from '../../lib/classes';

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

  const { data: allProducts, isLoading } = useListProductQuery({ limit, page, filters });

  const { storageCartItem } = useCartStore();
  const size = useDimensions();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
          <div className="flex w-full flex-wrap gap-3 sm:justify-between sm:gap-5 md:justify-normal">
            {isLoading ? (
              <SkeletonProduct />
            ) : (
              <>
                {allProducts?.products?.map((product, index) => (
                  <div
                    key={index}
                    className="flex w-full  flex-col gap-3 rounded-lg bg-[#1A1A1A] p-3 text-white/40  shadow-lg md:h-[320px] md:w-[250px] "
                  >
                    <Link
                      href={`/product/${product.name}`}
                      className="flex h-full cursor-pointer flex-col justify-between "
                    >
                      <div className="flex w-full items-center justify-center rounded-lg bg-[#0f0e0e8c]">
                        <Image
                          src={product?.variants?.[0]?.urlImage}
                          alt="thermos"
                          className="object-contain object-center py-2"
                          classNames={{
                            img: 'md:size-[140px] h-[150px]',
                          }}
                        />
                      </div>
                      <div className="flex h-full w-full flex-col gap-2">
                        <h4 className="truncate font-semibold text-softWhite ">{product.name}</h4>
                        <p className="line-clamp-3 text-sm text-white/40">{product.description}</p>
                        <span className="text-softWhite">${product.price}</span>
                      </div>
                    </Link>
                    <Divider className="my-4 bg-white/10 md:m-0" />
                    <div className="flex w-full gap-2">
                      <Button
                        className="text-gray flex w-full gap-1 border-1 border-white/20 bg-transparent"
                        onPress={() => {
                          storageCartItem({ ...product, variants: Array(product.variants?.[0]) } as CartProduct);
                          const isSmallScreen = size === 'sm' || size === 'md' ? true : false;
                          setShowCurrentCart({ isActive: true, isMobile: isSmallScreen });
                        }}
                      >
                        <ShoppingCartIcon className="size-[20px] text-white/40" />
                        <span className="text-xs text-white/40">Add to cart</span>
                      </Button>
                      <Link
                        className="flex w-4/6 items-center justify-center rounded-lg bg-[#E0F6BF] py-2 text-sm text-black"
                        href="/cart"
                        onPress={() =>
                          storageCartItem({ ...product, variants: Array(product.variants?.[0]) } as CartProduct)
                        }
                      >
                        Buy
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="mx-[18%] mt-3 flex items-center justify-end gap-3">
            <p className="flex gap-2 text-white/60">
              <span className="font-bold ">{allProducts?.totalProductsPage}</span>items of
              <span className="font-bold ">{allProducts?.count} </span>total
            </p>
            <Pagination
              size="lg"
              total={allProducts?.pages || 1}
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
