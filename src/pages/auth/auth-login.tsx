import { Button, Input, Link } from '@nextui-org/react';
import { LayoutAuth } from '../../components/layout-auth';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, builderLoginSchema } from '../../lib/schemas/schema-auth';
import { useLoginQuery } from '../../services/useAuth';

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: login, isPending } = useLoginQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(builderLoginSchema) });

  const onSubmit = (data: LoginSchema) => {
    const hasErrors = Object.entries(errors).length > 0;

    if (hasErrors) return;

    login(data);
  };

  return (
    <LayoutAuth
      backHref="/"
      title={
        <>
          <span className="text-primary">Login </span>to continue
        </>
      }
    >
      <form className="flex h-full w-full flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col justify-center gap-y-5">
          <Input
            label="Email"
            size="sm"
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('username')}
            isInvalid={!!errors.username}
          />
          <Input
            label="Password"
            size="sm"
            type={showPassword ? 'text' : 'password'}
            variant="underlined"
            className="outline-none hover:outline-none focus:outline-none"
            {...register('password')}
            isInvalid={!!errors.password}
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
          <Button color="primary" type="submit" className="text-md mt-8 font-bold" isLoading={isPending}>
            Login
          </Button>
        </div>
      </form>
      <p className="my-5 w-full text-center">
        <span>or</span>
      </p>
      <p className="w-full text-center">
        Do you want to create an{' '}
        <Link href="/auth/register/customer" className="text-secondary">
          account?
        </Link>
      </p>
    </LayoutAuth>
  );
};

export default AuthLogin;
