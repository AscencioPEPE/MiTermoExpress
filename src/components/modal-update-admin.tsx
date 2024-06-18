import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Admin } from '../types/admin';
import { useCreateAdminQuery } from '../services/useAdmin';
import { useEffect } from 'react';
import useAdminStore from '../zustand/admin';

interface UpdateAdmin {
  onClose: () => void;
  // data: Admin;
}

export const ModalUpdateAdmin = ({ onClose }: UpdateAdmin) => {
  const { mutateAsync: createAdmin, isPending } = useCreateAdminQuery();
  const { currentAdmin } = useAdminStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Admin>();

  const onSubmit = (data: Admin) => {
    createAdmin(data);
    if (!isPending) onClose();
  };

  useEffect(() => {
    reset({
      username: currentAdmin.username,
    });
  }, []);

  return (
    <div>
      <h3 className="my-4 text-lg font-bold text-softWhite">Update new admin</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          {...register('username', { required: 'Please fill the username' })}
          variant="underlined"
          label="username"
          isInvalid={!!errors.username?.message}
          errorMessage={errors.username?.message}
        />
        <Input
          {...register('password', { required: false })}
          variant="underlined"
          label="password"
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
        />
        <div className="my-3 flex w-full justify-between gap-3">
          <Button className="w-full text-white/70" variant="bordered" onPress={onClose}>
            Cancel
          </Button>
          <Button className="w-full bg-blue-500 text-white/80" type="submit" isLoading={isPending}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
