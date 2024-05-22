'use client';
import { ArrowDownIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Button, Image, Link } from '@nextui-org/react';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative"
    >
      <div className="mx-auto max-w-7xl p-4  sm:px-6  lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="aspect-h-1 aspect-w-2 sm:aspect-h-1 sm:aspect-w-1 group overflow-hidden rounded-lg sm:relative sm:row-span-2">
            <Image
              // src="https://s3bucketartetermos.com.s3.amazonaws.com/Termo+Vacuum+30+onzas+azul+cielo+back.png"
              src="https://s3bucketartetermos.com.s3.amazonaws.com/Termo+Vacuum+30+onzas+azul+cielo.png"
              alt="Two models wearing women's black cotton  tee and off-white cotton  tee."
              classNames={{
                img: 'opacity-100 z-0 group-hover:opacity-75 h-full object-cover object-center',
              }}
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-[#393939] to-[#121212f3] opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-start p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="text-7xl font-semibold text-white">THE SIMPLE</h3>
                <h3 className="text-7xl font-semibold text-white">THERMOS</h3>
                <h3 className="text-7xl font-semibold text-white">DESIGN</h3>
                <Button
                  as={Link}
                  href="/products"
                  variant="solid"
                  className="my-20 hidden h-[50px] w-[140px] items-center justify-between gap-4 rounded-lg bg-white  p-2 shadow-lg sm:flex"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-thin">SHOP</span>
                    <span className="text-sm">All Products</span>
                  </div>
                  <ShoppingCartIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full">
            <Image
              src="https://s3bucketartetermos.com.s3.amazonaws.com/Yeti+30+onzas+rosa.png"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              classNames={{
                wrapper: 'static',
                img: 'opacity-100 z-0 object-contain object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:size-full',
              }}
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-[#393939] to-[#121212f3] opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    Accessories
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
          <div className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full">
            <Image
              src="https://s3bucketartetermos.com.s3.amazonaws.com/Termo+Vacuum+30+onzas+amarillo+back.png"
              // src="https://yeti-web.imgix.net/490d23de6ee7730b/W-240001_ValentinesDay_Site_Studio_Shakethingsupset_Primary_B_2400x2400.png?bg=0fff&auto=format&w=500&q=68&h=500&fit=fill&hattr=500px&wattr=500px"
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              classNames={{
                wrapper: 'static',
                img: 'opacity-100 z-0 object-contain object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:size-full',
              }}
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    Workspace
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        as={Link}
        href="/products"
        className="bottom-1/6 absolute right-1/2 hidden h-[70px] w-[70px] items-center justify-center rounded-3xl  border-1 border-black/20 bg-white/30 shadow-lg hover:bg-white/80  sm:flex"
      >
        <ArrowDownIcon className="size-[30px]" />
      </Button>
    </motion.div>
  );
};
