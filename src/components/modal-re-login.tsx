import { Button, Link } from '@nextui-org/react';
import useUserStore from '../zustand/user';

interface ModalLoginProps {
  title?: string;
  message?: string;
  showLogout?: boolean;
}

export const ModalReLogin = ({ message, showLogout, title }: ModalLoginProps) => {
  const { removeCurrentUser } = useUserStore();

  return (
    <div className="bg-[#1A1A1A]">
      <h2 className="my-5 font-bold text-softWhite">{title ?? 'Your session expired'}</h2>
      <p className="text-softWhite">{message ?? 'Please login again to continue buying'}</p>
      <div className="my-5 flex justify-between gap-5">
        {showLogout ? (
          <Button className="w-full font-bold" as={Link} onPress={removeCurrentUser} href="/">
            Logout
          </Button>
        ) : null}
        <Button as={Link} className="w-full bg-primary font-bold" href="/auth/login" onPress={removeCurrentUser}>
          Login
        </Button>
      </div>
    </div>
  );
};
