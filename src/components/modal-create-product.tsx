import { useForm } from 'react-hook-form';
import { Product } from '../types/products';
import { Button, Input, Textarea } from '@nextui-org/react';

interface CreateProduct {
  onClose: () => void;
}

export const ModalCreateProduct = ({ onClose }: CreateProduct) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (data: Product) => {};

  return (
    <div>
      <p className="my-5 font-bold">Create new product</p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <Input
            {...register('name', { required: 'Please write the name of the product' })}
            variant="underlined"
            label="Product name"
            isInvalid={!!errors.name?.message}
            errorMessage={errors.name?.message}
          />
        </div>
        <div>
          <Textarea
            {...register('description', { required: 'Please write the description of the product' })}
            variant="underlined"
            label="Product description"
            isInvalid={!!errors.description?.message}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('color', { required: 'Please write the color of the product' })}
            variant="underlined"
            label="Product color"
            isInvalid={!!errors.color?.message}
            errorMessage={errors.color?.message}
          />
          <Input
            {...register('colorHex', { required: 'Please write the colorHex of the product' })}
            variant="underlined"
            label="Product colorHex"
            isInvalid={!!errors.colorHex?.message}
            errorMessage={errors.colorHex?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('availability', { required: 'Please write the availability of the product' })}
            variant="underlined"
            label="Product availability"
            isInvalid={!!errors.availability?.message}
            errorMessage={errors.availability?.message}
          />
          <Input
            {...register('capacity', { required: 'Please write the capacity of the product' })}
            variant="underlined"
            label="Product capacity"
            isInvalid={!!errors.capacity?.message}
            errorMessage={errors.capacity?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('category', { required: 'Please write the category of the product' })}
            variant="underlined"
            label="Product category"
            isInvalid={!!errors.category?.message}
            errorMessage={errors.category?.message}
          />
          <Input
            {...register('price', { required: 'Please write the price of the product' })}
            variant="underlined"
            label="Product price"
            isInvalid={!!errors.price?.message}
            errorMessage={errors.price?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('sku', { required: 'Please write the sku of the product' })}
            variant="underlined"
            label="Product sku"
            isInvalid={!!errors.sku?.message}
            errorMessage={errors.sku?.message}
          />
          <Input
            {...register('quantity', { required: 'Please write the quantity of the product' })}
            variant="underlined"
            label="Product quantity"
            isInvalid={!!errors.quantity?.message}
            errorMessage={errors.quantity?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('urlImage', { required: 'Please write the urlImage of the product' })}
            variant="underlined"
            label="Product urlImage"
            isInvalid={!!errors.urlImage?.message}
            errorMessage={errors.urlImage?.message}
          />
          <Input
            {...register('urlImageBack', { required: 'Please write the urlImageBack of the product' })}
            variant="underlined"
            label="Product urlImageBack"
            isInvalid={!!errors.urlImageBack?.message}
            errorMessage={errors.urlImageBack?.message}
          />
        </div>
        <div className="my-8 flex w-full justify-between gap-3">
          <Button className="w-full" variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button className="w-full bg-blue-500" type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
