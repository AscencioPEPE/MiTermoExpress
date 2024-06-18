import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Admin } from '../types/admin';
import { useCreateAdminQuery } from '../services/useAdmin';

export const ModalCreateAdmin = ({ onClose }: { onClose: () => void }) => {
  const { mutateAsync: createAdmin, isSuccess, isError, isPending } = useCreateAdminQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Admin>();

  const onSubmit = (data: Admin) => {
    createAdmin(data);
    onClose();
  };

  return (
    <div>
      <h3 className="my-4 text-lg font-bold text-softWhite">Create new admin</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          {...register('username', { required: 'Please fill the username' })}
          variant="underlined"
          label="username"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
        />
        <Input
          {...register('password', { required: 'Please fill the password' })}
          variant="underlined"
          label="password"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
        />
        <div className="my-3 flex w-full justify-between gap-3">
          <Button className="w-full text-white/70" variant="bordered" onPress={onClose}>
            Cancel
          </Button>
          <Button className="w-full bg-blue-500 text-white/80" type="submit" isLoading={isPending}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
