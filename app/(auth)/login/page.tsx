'use client';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useApi from '@/hooks/useApi';
import useUserStorage from '@/zustand/user';

interface LoginProps {
  username: string;
  password: string;
}

const Login = () => {
  const { storageCurrentUser } = useUserStorage();

  const { handleSubmit, register } = useForm<LoginProps>();
  const { post: login } = useApi({
    key: ['auth'],
    method: 'POST',
    url: 'auth/login',
  });

  const onSubmit = async (data: LoginProps) => {
    const response = await login?.mutateAsync(data);
    storageCurrentUser(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username')} />
        <Input {...register('password')} />
        <Button type="submit">enviar</Button>
      </form>
    </div>
  );
};

export default Login;
