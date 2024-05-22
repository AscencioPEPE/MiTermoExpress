import { useForm } from 'react-hook-form';
import { Input, Link, Button } from '@nextui-org/react';
import useUserStore from '../../zustand/user';
import { useLocation } from 'wouter';
import { GuestSchema, builderGuestSchema } from '../../lib/schemas/schema-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/src/types/user';
import { LayoutAuth } from '../../components/layout-auth';

const AuthGuest = () => {
  const [_, setLocation] = useLocation();
  const { storageCurrentUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestSchema>({ resolver: zodResolver(builderGuestSchema) });

  const onSubmit = (data: GuestSchema) => {
    const hasErrors = Object.entries(errors).length > 0;

    if (hasErrors) return;

    storageCurrentUser({ ...data, isGuest: true } as User);
    setLocation('/cart', { replace: true });
  };

  return (
    <LayoutAuth
      backHref="/cart"
      title={
        <>
          Please fill the form with <span className="text-primary">your data</span>
        </>
      }
    >
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Input
            label="Full name"
            size="sm"
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('name')}
            isInvalid={!!errors.name}
          />
          <Input
            label="Email"
            size="sm"
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('email')}
            isInvalid={!!errors.email}
          />
          <Input
            label="Phone"
            size="sm"
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('phone')}
            isInvalid={!!errors.phone}
          />
          <Input
            label="Address"
            size="sm"
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('address')}
            isInvalid={!!errors.address}
          />
          <Button color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
      <p className="w-full text-center">
        <span>or</span>
      </p>
      <p className="w-full text-center">
        Do you want to{' '}
        <Link href="auth/register" className="text-secondary">
          register?
        </Link>
      </p>
    </LayoutAuth>
  );
};

export default AuthGuest;
