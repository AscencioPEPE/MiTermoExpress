import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CartProduct } from '../types/products';
import { ModalSimple } from './modal-simple';
import { Image, Link, Divider, Select, SelectItem, Button } from '@nextui-org/react';
import { formattedPrice } from '../lib/formater';
import { SetStateAction } from 'react';
import useDimensions from '../hooks/useDimensions';

const animals = [
  { label: 'Cat', value: 'cat', description: 'The second most popular pet in the world' },
  { label: 'Dog', value: 'dog', description: 'The most popular pet in the world' },
  { label: 'Elephant', value: 'elephant', description: 'The largest land animal' },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
  { label: 'Giraffe', value: 'giraffe', description: 'The tallest land animal' },
  {
    label: 'Dolphin',
    value: 'dolphin',
    description: 'A widely distributed and diverse group of aquatic mammals',
  },
  { label: 'Penguin', value: 'penguin', description: 'A group of aquatic flightless birds' },
  { label: 'Zebra', value: 'zebra', description: 'A several species of African equids' },
  {
    label: 'Shark',
    value: 'shark',
    description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
  },
  {
    label: 'Whale',
    value: 'whale',
    description: 'Diverse group of fully aquatic placental marine mammals',
  },
  { label: 'Otter', value: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
  { label: 'Crocodile', value: 'crocodile', description: 'A large semiaquatic reptile' },
];

interface ModifyProductProps {
  product: CartProduct;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ModifyProduct = ({ product, open, setOpen }: ModifyProductProps) => {
  const size = useDimensions();

  return (
    <ModalSimple
      size={size === 'sm' || size === 'md' ? 'full' : '4xl'}
      isOpen={open}
      onClose={() => setOpen(false)}
      className="bg-[#1A1A1A] p-5"
    >
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
            src="https://s3bucketartetermos.com.s3.amazonaws.com/Termo+Vacuum+30+onzas+azul+cielo.png"
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
          label="Quantity"
          placeholder="Select a quantity to buy"
          radius="sm"
          variant="bordered"
          disabledKeys={['zebra', 'tiger', 'lion', 'elephant', 'crocodile', 'whale']}
          className="w-full bg-[#262626] text-white"
          classNames={{
            trigger: 'bg-[#262626] border-1 border-white/30 focus:outline-none outline-none', // Cambio de color del texto del trigger
            popoverContent: 'bg-[#262626]',
          }}
        >
          {animals.map((animal) => (
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
          disabledKeys={['zebra', 'tiger', 'lion', 'elephant', 'crocodile', 'whale']}
          className="w-full bg-[#262626] text-white"
          classNames={{
            trigger: 'bg-[#262626] border-1 border-white/30 focus:outline-none outline-none', // Cambio de color del texto del trigger
            popoverContent: 'bg-[#262626]',
          }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Button className="bg-[#E0F6BF] font-bold">Save changes</Button>
      </div>
    </ModalSimple>
  );
};
