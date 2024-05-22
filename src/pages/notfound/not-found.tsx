import { Link } from '@nextui-org/react';

const NotFound = () => {
  return (
    <div className="flex h-dvhContainer items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center">
          <h2 className="text-6xl font-bold">404</h2>
          <p className="text-xl">Page not found</p>
        </div>
        <div className="flex justify-center">
          <p>
            Do you want to go to <Link className="cursor-pointer text-primary hover:text-primary">HOME</Link>?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
