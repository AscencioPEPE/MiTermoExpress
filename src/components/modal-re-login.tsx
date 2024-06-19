import { useForm } from 'react-hook-form';
import { Product } from '../types/products';
import { Button, Input, Textarea, Link } from '@nextui-org/react';
import useUserStore from '../zustand/user';

export const ModalReLogin = () => {
  const { removeCurrentUser } = useUserStore();

  return (
    <div className="bg-[#1A1A1A]">
      <h2 className="my-5 font-bold">Your session expired</h2>
      <p>Please login again to continue buying</p>
      <div className="my-5 flex justify-between gap-5">
        <Button className="w-1/2 font-bold" as={Link} onPress={removeCurrentUser} href="/">
          Logout
        </Button>
        <Button as={Link} className="w-1/2 bg-primary font-bold" href="/auth/login" onPress={removeCurrentUser}>
          Login
        </Button>
      </div>
    </div>
  );
};
