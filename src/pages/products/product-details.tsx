import { useState } from 'react';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../lib/classes';
import { useProductQuery } from '../../services/useProduct';
import { useParams } from 'wouter';
import { formattedPrice } from '../../lib/formater';
import { Button, Link } from '@nextui-org/react';

export default function ProductDetails() {
  const { productName }: { productName: string } = useParams();

  const { data: product } = useProductQuery(productName);
  const [selectedColor, setSelectedColor] = useState();

  return (
    <div className="mt-5 bg-transparent">
      <div className="mx-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product?.variants?.map((image) => (
                  <Tab
                    key={image?.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-[#0f0e0e8c] text-sm font-medium uppercase text-gray-900  outline-none hover:border-primary hover:ring-0  focus:outline-none"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{image?.id}</span>
                        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md">
                          <img src={image?.urlImage} alt="" className="size-5/6 object-contain object-center" />
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
              {product?.variants?.map((image) => (
                <Tab.Panel key={image.id} className="flex items-center justify-center">
                  <img
                    src={image?.urlImage}
                    alt="thermo"
                    className="size-5/6 bg-transparent object-contain object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h2 className="text-3xl font-bold tracking-tight text-softWhite">{product?.name}</h2>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-softWhite">{formattedPrice(product?.price ?? 0)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <p className="space-y-6 text-base text-white/70">{product?.description}</p>
            </div>

            <form className="my-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-white/80">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <span className="flex items-center space-x-3">
                    {product?.variants?.map((image) => (
                      <RadioGroup.Option
                        key={image?.id}
                        value={image?.color}
                        className={({ active, checked }) =>
                          classNames(
                            image?.color,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {image?.color}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            // color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </span>
                </RadioGroup>
              </div>

              <div className="my-6 flex w-4/6 gap-2">
                <Button
                  className="text-gray flex w-full gap-1 border-1 border-white/20 bg-[#1A1A1A]"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
