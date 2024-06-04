import { useEffect, useState } from 'react';
import { RadioGroup, Tab } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../lib/classes';
import { useProductQuery } from '../../services/useProduct';
import { useParams } from 'wouter';
import { formattedPrice } from '../../lib/formater';
import { Button, Link, Select, SelectItem, Tooltip } from '@nextui-org/react';
import { getBgColor } from '../../lib/colors';
import useCartStore from '../../zustand/cart';
import { CartProduct } from '@/src/types/products';
import { DrawerCart } from '../../components/drawer-cart';
import useDimensions from '../../hooks/useDimensions';
import { SkeletonProductDetail } from '../../components/skeleton-product-details';
import { quantities } from '../../lib/constants';

export default function ProductDetails() {
  const { productName }: { productName: string } = useParams();
  const { storageCartItem, updateCartItem } = useCartStore();
  const size = useDimensions();

  const [showCurrentCart, setShowCurrentCart] = useState({
    isMobile: false,
    isActive: false,
  });

  const { data: product, isLoading } = useProductQuery(productName);

  const [selectedColor, setSelectedColor] = useState<string>(product?.[0].color);
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  console.log('quantityToBuy: ', quantityToBuy);

  const productByColor = product
    ?.filter((prod) => prod?.color === selectedColor)
    .map((image) => ({
      urlImage: image.urlImage,
      urlImageBack: image.urlImageBack,
    }))
    .flatMap((variant) => [variant.urlImage, variant.urlImageBack])
    .filter((url) => url);

  useEffect(() => {
    setSelectedColor(product?.[0].color);
  }, [product]);

  if (isLoading) return <SkeletonProductDetail />;

  return (
    <div className="bg-transparent py-5">
      <div className="mx-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {productByColor?.map((image, index) => (
                  <Tab
                    key={index}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-[#0f0e0e8c] text-sm font-medium uppercase text-gray-900  outline-none hover:border-primary hover:ring-0  focus:outline-none"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{index}</span>
                        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md">
                          <img src={image} alt="" className="size-5/6 object-contain object-center" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'border-1 border-primary' : 'border-0 ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {productByColor?.map((image, index) => (
                <Tab.Panel key={index} className="flex items-center justify-center">
                  <img
                    src={image}
                    alt="thermo"
                    className="size-5/6 bg-transparent object-contain object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h2 className="text-3xl font-bold tracking-tight text-softWhite">{product?.[0]?.name}</h2>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-softWhite">{formattedPrice(product?.[0]?.price ?? 0)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <p className="space-y-6 text-base text-white/70">{product?.[0]?.description}</p>
            </div>

            <form className="lg:my-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-white/80">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <span className="flex flex-wrap items-center gap-3">
                    {product?.map((image) => {
                      return (
                        <RadioGroup.Option
                          key={image?.sku}
                          value={image?.color}
                          style={{ background: image?.colorHex }}
                          className={({ active, checked }) =>
                            classNames(
                              active && checked ? 'ring-2 ring-primary' : '',
                              !active && checked ? 'ring-2 ring-primary' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 outline-none focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {image?.color}
                          </RadioGroup.Label>
                          <Tooltip content={image?.color} className="bg-[#0f0e0e] text-white/50">
                            <span
                              style={{ background: image?.colorHex }}
                              aria-hidden="true"
                              className={classNames('h-8 w-8 rounded-full border-2 border-black/20 border-opacity-50')}
                            />
                          </Tooltip>
                        </RadioGroup.Option>
                      );
                    })}
                  </span>
                </RadioGroup>
              </div>

              <div className="mt-6 flex w-full flex-col gap-3">
                <Select
                  radius="sm"
                  label="Quantity to buy"
                  variant="bordered"
                  size="sm"
                  defaultSelectedKeys={[1]}
                  onChange={(e) => setQuantityToBuy(Number(e.target.value))}
                  className=" w-full bg-[#262626] text-white lg:w-4/6"
                  classNames={{
                    trigger: 'bg-[#262626] border-1 border-white/30 focus:outline-none outline-none ', // Cambio de color del texto del trigger
                    popoverContent: 'bg-[#262626]',
                    value: 'text-white',
                  }}
                >
                  {quantities.map((quantity) => (
                    <SelectItem key={quantity.key} value={quantity.value}>
                      {quantity.label}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  className="text-gray flex w-full gap-1 border-1 border-white/20 bg-[#1A1A1A] lg:w-4/6"
                  onPress={() => {
                    const getProduct = product.find((prod) => prod.color === selectedColor);
                    storageCartItem({ ...getProduct, quantityToBuy });
                    const isSmallScreen = size === 'sm' || size === 'md' ? true : false;
                    setShowCurrentCart({ isActive: true, isMobile: isSmallScreen });
                  }}
                >
                  <ShoppingCartIcon className="size-[20px] text-white/40" />
                  <span className="text-xs text-white/40">Add to cart</span>
                </Button>
                <Link
                  className="flex w-full items-center justify-center rounded-lg bg-[#E0F6BF] py-2 text-sm text-black lg:w-4/6"
                  href="/cart"
                  onPress={() => {
                    const getProduct = product.find((prod) => prod.color === selectedColor);

                    storageCartItem({ ...getProduct, quantityToBuy });
                  }}
                >
                  Buy
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DrawerCart setShowCurrentCart={setShowCurrentCart} showCurrentCart={showCurrentCart} />
    </div>
  );
}
