import { Link } from '@nextui-org/react';

const Failure = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">Failed</h3>
      <p>The purchase doesn't payed correctly</p>
      <Link href="/cart">Return cart</Link>
    </div>
  );
};

export default Failure;
