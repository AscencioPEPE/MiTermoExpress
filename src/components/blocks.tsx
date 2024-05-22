import { Button, Image, Divider, Link } from '@nextui-org/react';
import { MotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Product, Variant } from '../types/products';
import { formattedPrice } from '../lib/formater';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { SetStateAction } from 'react';
import { classNames } from '../lib/classes';

type BlockProps = {
  className?: string;
} & MotionProps;

interface BlockInfoProps {
  product: Product;
  setVarianSelected: React.Dispatch<SetStateAction<Variant>>;
  variantSelected: Variant;
  openImage: React.Dispatch<SetStateAction<boolean>>;
}

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge('col-span-4 rounded-lg border border-zinc-700 ', className)}
      {...rest}
    />
  );
};

export const HeaderBlock = ({ coverImage }: { coverImage: string }) => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <Button className="m-0 h-full w-full bg-transparent p-0">
      <Image src={coverImage} alt="avatar" className="mb-4 size-full rounded-full object-cover" />
    </Button>
  </Block>
);

export const SocialsBlock = ({ product, setVarianSelected, variantSelected, openImage }: BlockInfoProps) => (
  <>
    <Block
      whileHover={{
        rotate: '2.5deg',
        scale: 1.1,
      }}
      className="col-span-6 bg-transparent md:col-span-3"
    >
      <Button className="m-0 h-full w-full bg-transparent p-0" onPress={() => openImage(true)}>
        <Image src={product?.variants?.[1].urlImage} alt="avatar" className="mb-4 size-full object-cover" />
      </Button>
    </Block>
    <Block
      whileHover={{
        rotate: '-2.5deg',
        scale: 1.1,
      }}
      className="col-span-6 bg-transparent md:col-span-3"
    >
      <Button className="m-0 h-full w-full bg-transparent p-0" onPress={() => openImage(true)}>
        <Image
          src={product?.variants?.[2].urlImage}
          alt="avatar"
          className="mb-4 size-full object-contain object-center"
        />
      </Button>
    </Block>
    <Block className="col-span-6 border-0 bg-transparent md:col-span-6">
      <div className="m-0 flex h-full w-full flex-col justify-between  rounded-lg  p-5">
        <h3 className="text-2xl font-bold text-softWhite">{product?.name || 'Product Name'}</h3>
        <h3 className="text-lg font-bold text-softWhite">
          Price: {formattedPrice(product?.price || 0) || 'Product Price'}
        </h3>
        <Divider className="my-4 bg-white/40" />
        <span>Colors:</span>
        <div className="my-2 flex flex-wrap items-center gap-2">
          {product?.variants?.map((variant) => (
            <Button
              variant="bordered"
              onPress={() => setVarianSelected(variant)}
              className={classNames(
                variantSelected?.color === variant?.color ? 'border-primary' : 'border-white/30',
                'border-1  bg-[#1A1A1A]'
              )}
            >
              {variant?.color}
            </Button>
          ))}
        </div>
        <div className="my-2 flex w-full gap-2">
          <Button
            className="text-gray flex w-full gap-1 border-1 border-white/20 bg-[#1A1A1A] "
            onPress={() => {
              // storageCartItem(product as CartProduct);
              // const isSmallScreen = size === 'sm' || size === 'md' ? true : false;
              // setShowCurrentCart({ isActive: true, isMobile: isSmallScreen });
            }}
          >
            <ShoppingCartIcon className="size-[20px] text-white/40" />
            <span className="text-xs text-white/40">Add to cart</span>
          </Button>
          <Link
            className="flex w-4/6 items-center justify-center rounded-lg bg-[#E0F6BF] py-2 text-sm text-black"
            href="/cart"
            // onPress={() => storageCartItem(product as CartProduct)}
          >
            Buy
          </Link>
        </div>
      </div>
    </Block>
  </>
);
