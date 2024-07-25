import { useForm } from 'react-hook-form';
import { CreateProduct, Product, UpdateProduct } from '../types/products';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useUpdateProductQuery } from '../services/useProduct';
import { useDragDrop } from '../hooks/useDragDrop';
import DragAndDrop from './dragAndDrop';
import useProductStore from '../zustand/product';
import { useEffect } from 'react';

interface CreateProductProps {
  onClose: () => void;
}

export const ModalUpdateProduct = ({ onClose }: CreateProductProps) => {
  const { mutateAsync: updateProduct, isPending } = useUpdateProductQuery();
  const { currentProduct, removeCurrentProduct } = useProductStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UpdateProduct>({
    defaultValues: {
      colorHex: '#000000',
    },
  });

  const imageDrag = useDragDrop({ setValue, registerKey: 'image' });
  const imageBackDrag = useDragDrop({ setValue, registerKey: 'imageBack' });

  const onSubmit = (data: UpdateProduct) => {
    console.log('data: ', data);

    if (typeof data.image !== 'string' && typeof data.imageBack !== 'string') {
      console.log('BOTH FILE');
      updateProduct({ ...data, image: data.image[0], imageBack: data.imageBack[0] });
    }

    if (typeof data.image !== 'string' && typeof data.imageBack === 'string') {
      console.log('Imageback String');
      updateProduct({ ...data, image: data.image[0] });
    }
    if (typeof data.imageBack !== 'string' && typeof data.image === 'string') {
      console.log('Image String');

      updateProduct({ ...data, imageBack: data.imageBack[0] });
    }
    if (typeof data.image === 'string' && typeof data.imageBack === 'string') {
      console.log('BOTH STRING');
      updateProduct({ ...data });
    }
  };

  useEffect(() => {
    const images = { image: currentProduct.urlImage, imageBack: currentProduct.urlImageBack };

    const products = { ...currentProduct, ...images };
    delete products.urlImage;
    delete products.urlImageBack;
    reset({ ...products });
  }, []);

  return (
    <div className="max-h-[650px] overflow-auto">
      <p className="my-5 font-bold">Update product</p>
      <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <Input
            {...register('name', { required: 'Please write the name of the product' })}
            variant="bordered"
            label="Product name"
            isInvalid={!!errors.name?.message}
            errorMessage={errors.name?.message}
          />
        </div>
        <div>
          <Textarea
            {...register('description', { required: 'Please write the description of the product' })}
            variant="bordered"
            label="Product description"
            isInvalid={!!errors.description?.message}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('color', { required: 'Please write the color of the product' })}
            variant="bordered"
            label="Product color"
            isInvalid={!!errors.color?.message}
            errorMessage={errors.color?.message}
          />
          <Input
            {...register('colorHex', { required: 'Please write the colorHex of the product' })}
            variant="flat"
            type="color"
            className="data-hover:bg-transparent rounded-lg bg-transparent hover:bg-transparent focus:bg-transparent data-[focus-within=true]:bg-transparent data-[focus=true]:bg-transparent"
            classNames={{
              inputWrapper:
                'h-full p-0 bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent rounded-lg focus:bg-transparent data-[focus=true]:bg-transparent data-[focus-within=true]:bg-transparent grou[',
              input: 'h-full rounded-lg',
            }}
            // label="Product colorHex"
            isInvalid={!!errors.colorHex?.message}
            errorMessage={errors.colorHex?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('availability', { required: 'Please write the availability of the product' })}
            variant="bordered"
            label="Product availability"
            isInvalid={!!errors.availability?.message}
            errorMessage={errors.availability?.message}
          />
          <Input
            {...register('capacity', { required: 'Please write the capacity of the product' })}
            variant="bordered"
            label="Product capacity"
            isInvalid={!!errors.capacity?.message}
            errorMessage={errors.capacity?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('category', { required: 'Please write the category of the product' })}
            variant="bordered"
            label="Product category"
            isInvalid={!!errors.category?.message}
            errorMessage={errors.category?.message}
          />
          <Input
            {...register('price', { required: 'Please write the price of the product' })}
            variant="bordered"
            label="Product price"
            isInvalid={!!errors.price?.message}
            errorMessage={errors.price?.message}
          />
        </div>
        <div className="flex gap-5">
          <Input
            {...register('sku', { required: 'Please write the sku of the product' })}
            variant="bordered"
            label="Product sku"
            isInvalid={!!errors.sku?.message}
            errorMessage={errors.sku?.message}
          />
          <Input
            {...register('quantity', { required: 'Please write the quantity of the product' })}
            variant="bordered"
            label="Product quantity"
            isInvalid={!!errors.quantity?.message}
            errorMessage={errors.quantity?.message}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex w-full flex-col">
            <label>Front Image</label>
            <DragAndDrop
              filesTypes="PNG, JPG o JPEG"
              onDrop={imageDrag.onDrop}
              register={register}
              registerKey="image"
              resetValue={imageDrag.resetValue}
              selectedFile={([watch('image')] as any) || imageDrag.selectedFile}
              clearSelectedFile={imageDrag.clearSelectedFile}
              watch={watch}
            />
          </div>
          <div className="flex w-full flex-col">
            <label>Back Image</label>
            <DragAndDrop
              filesTypes="PNG, JPG o JPEG"
              onDrop={imageBackDrag.onDrop}
              register={register}
              registerKey="imageBack"
              resetValue={imageBackDrag.resetValue}
              selectedFile={([watch('imageBack')] as any) || imageDrag.selectedFile}
              clearSelectedFile={imageBackDrag.clearSelectedFile}
              watch={watch}
            />
          </div>
        </div>
        <div className="my-8 flex w-full justify-between gap-3">
          <Button className="w-full" variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button className="w-full bg-blue-500" type="submit" isLoading={isPending}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
