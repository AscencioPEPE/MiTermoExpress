'use client';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Button, Image } from '@nextui-org/react';
import { motion } from 'framer-motion';
import useApi from '@/hooks/useApi';

const Products = () => {
  const { get: products } = useApi({
    method: 'GET',
    key: ['product'],
    url: 'product',
  });

  return (
    <motion.div initial={{ y: '100vh' }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="flex size-full ">
      <div className="w-full">
        <h3 className="my-5 text-softWhite">All Products</h3>
        <div className="flex w-full flex-wrap gap-5">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {products?.data?.map((product: any, index: number) => (
            <div
              key={index}
              className="flex h-[320px] w-[250px] flex-col justify-between rounded-lg  bg-[#1A1A1A] p-3 text-white/40 shadow-lg"
            >
              <div className="flex items-center justify-center rounded-lg bg-[#0f0e0e8c]">
                <Image
                  src="https://thermos.com/cdn/shop/products/SK2020MDB_PRES_1000px.png?v=1624023598"
                  width={100}
                  alt="thermos"
                  className="object-contain object-center"
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#F0F0F0]">{product.name}</span>
                <span>{product.description}</span>
                <span className="text-[#F0F0F0]">${product.price}</span>
              </div>
              <div className="flex w-full gap-2">
                <Button className="text-gray flex w-full gap-1 border-1 bg-transparent">
                  <ShoppingCartIcon className="size-[20px]" />
                  <span className="text-xs">Add to cart</span>
                </Button>
                <Button className="w-2/6 bg-[#E0F6BF]">Buy</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
