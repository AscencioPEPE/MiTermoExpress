import { Button, Input, Link } from '@nextui-org/react';
import { LayoutAuth } from '../../components/layout-auth';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import useUserStore from '../../zustand/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, builderRegisterSchema } from '../../lib/schemas/schema-auth';

export const AuthRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { storageCurrentUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(builderRegisterSchema) });

  const onSubmit = (data: RegisterSchema) => {
    const hasErrors = Object.entries(errors).length > 0;

    if (hasErrors) return;

    // storageCurrentUser({ ...data, isGuest: true } as User);
    // setLocation('/cart', { replace: true });
  };

  return (
    <LayoutAuth
      backHref="/"
      title={
        <>
          Please fill the form to <span className="text-primary">Register</span> to us!
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
          <Input
            label="Email"
            size="sm"
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('email')}
            isInvalid={!!errors.email}
          />
          <Input
            label="Password"
            size="sm"
            type={showPassword ? 'text' : 'password'}
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('password')}
            isInvalid={!!errors.address}
            endContent={
              <Button
                isIconOnly
                className="m-0 bg-transparent p-0 hover:border-none hover:outline-none focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-[20px] justify-end text-2xl text-softWhite" />
                ) : (
                  <EyeIcon className="w-[20px] justify-end text-2xl text-softWhite" />
                )}
              </Button>
            }
          />
          <Button color="primary" className="text-md font-bold" type="submit">
            Register me!
          </Button>
        </div>
      </form>
      <p className="w-full text-center">
        <span>or</span>
      </p>
      <p className="w-full text-center font-bold">
        Do you have{' '}
        <Link href="/auth/login" className="text-secondary">
          account?
        </Link>
      </p>
    </LayoutAuth>
  );
};
