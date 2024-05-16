import { Link } from '@nextui-org/react';

export const Success = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">Success</h3>
      <Link href="/products">Continue buying</Link>
    </div>
  );
};

export const Failed = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">Failed</h3>
      <p>The purchase doesn't payed correctly</p>
      <Link href="/cart">Return cart</Link>
    </div>
  );
};
