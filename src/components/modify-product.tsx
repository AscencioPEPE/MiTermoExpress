import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CartProduct } from '../types/products';
import { ModalSimple } from './modal-simple';
import { Image, Divider, Select, SelectItem, Button } from '@nextui-org/react';
import { formattedPrice } from '../lib/formater';
import { SetStateAction, useEffect } from 'react';
import useDimensions from '../hooks/useDimensions';
import { useProductQuery } from '../services/useProduct';
import useCartStore from '../zustand/cart';
import { SkeletonProductModal } from './sekeleton-modal-modify';

interface ModifyProductProps {
  product: CartProduct;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ModifyProduct = ({ product, open, setOpen }: ModifyProductProps) => {
  const size = useDimensions();

  const { currentCartItems, updateCartItem } = useCartStore();

  const { data, isLoading } = useProductQuery(product?.name);

  const colors = data?.variants?.map((variant) => ({ value: variant?.color, label: variant?.color }));

  const quantity = Array(10)
    .fill({})
    ?.map((_, index) => ({ value: String(index + 1), label: String(index + 1) }));

  const currentSelection = currentCartItems?.filter((currentItem) => currentItem?.name === product?.name)?.[0];
  const image = data?.variants?.find((variant) => variant?.color === currentSelection?.variants?.[0]?.color);

  const update = (dataUpdated: any, kindOf: 'quantity' | 'color') => {
    if (!data) return;

    if (kindOf === 'color') {
      const getVariant = data?.variants.find((variant) => variant.color === dataUpdated);

      updateCartItem(product.name, { ...currentSelection, variants: [getVariant] });
    }
    if (kindOf === 'quantity')
      updateCartItem(product.name, { ...currentSelection, quantityToBuy: Number(dataUpdated) });
  };

  return (
    <ModalSimple
      size={size === 'sm' || size === 'md' ? 'full' : '4xl'}
      isOpen={open}
      onClose={() => setOpen(false)}
      className="bg-[#1A1A1A] p-5"
    >
      {isLoading ? (
        <SkeletonProductModal />
      ) : (
        <>
          <Button
            className="m-0 w-[20px] cursor-pointer justify-start border-0 bg-transparent p-0 text-softWhite hover:bg-transparent"
            onPress={() => setOpen(false)}
          >
            <ArrowLeftIcon className="w-[25px] text-white" />
          </Button>
          <h2 className="text-3xl font-bold">Choose the product details</h2>
          <div className="flex flex-col items-start justify-center py-3">
            <div className="flex gap-3">
              <Image
                src={image?.urlImage}
                classNames={{
                  img: 'w-[100px]',
                }}
              />
              <div className="justify-start- flex h-full flex-col items-start">
                <h3 className="text-center text-xl font-bold">{product?.name || 'Product Name'}</h3>
                <h3 className="text-center">{product?.description || 'Product Description'}</h3>
                <h3 className="text-center font-bold">{formattedPrice(product?.price || 300)}</h3>
              </div>
            </div>
          </div>
          <Divider className="border-white/20 bg-white/20" />
          <div className="my-5 flex w-full flex-col gap-5">
            <Select
              label="Colors"
              placeholder="Select a color to buy"
              radius="sm"
              variant="bordered"
              onChange={(e) => update(e.target.value, 'color')}
              className="w-full bg-[#262626] text-white"
              defaultSelectedKeys={[product?.variants?.[0]?.color]}
              classNames={{
                trigger: 'bg-[#262626] border-1 border-white/30 focus:outline-none outline-none', // Cambio de color del texto del trigger
                popoverContent: 'bg-[#262626]',
                value: 'text-white',
              }}
            >
              {colors?.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Quantity"
              placeholder="Select a quantity to buy"
              radius="sm"
              variant="bordered"
              onChange={(e) => update(e.target.value, 'quantity')}
              defaultSelectedKeys={String(product?.quantityToBuy)}
              className="w-full bg-[#262626] "
              classNames={{
                trigger: 'bg-[#262626] border-1 border-white/30 focus:outline-none outline-none', // Cambio de color del texto del trigger
                popoverContent: 'bg-[#262626]',
                value: 'text-white',
              }}
            >
              {quantity?.map((q) => (
                <SelectItem key={q.value} value={q.value}>
                  {q.label}
                </SelectItem>
              ))}
            </Select>
            <Button className="bg-[#E0F6BF] font-bold">Save changes</Button>
          </div>
        </>
      )}
    </ModalSimple>
  );
};
