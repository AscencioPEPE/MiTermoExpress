import { Link } from '@nextui-org/react';

const Success = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">Success</h3>
      <Link href="/products">Continue buying</Link>
    </div>
  );
};

export default Success;
