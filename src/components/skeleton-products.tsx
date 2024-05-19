import { Card } from '@nextui-org/react';

export const SkeletonProduct = () => {
  return (
    <div className="flex flex-wrap justify-normal">
      {Array(10)
        .fill({})
        .map((_, index) => (
          <Card key={index} className="mx-auto mt-2 h-[300px] w-[250px] overflow-x-auto bg-[#1A1A1A] p-3">
            <div className="h-[100px]  animate-pulse bg-[#0f0e0e8c] dark:bg-gray-700" />
            <div className="my-5 flex flex-col justify-between gap-3 ">
              <div className="h-[20px] animate-pulse rounded-lg bg-[#0f0e0e8c] dark:bg-gray-700" />
              <div className="h-[20px] animate-pulse rounded-lg bg-[#0f0e0e8c] dark:bg-gray-700" />
              <div className="h-[20px] animate-pulse rounded-lg bg-[#0f0e0e8c] dark:bg-gray-700" />
              <div className="h-[20px] animate-pulse rounded-lg bg-[#0f0e0e8c] dark:bg-gray-700" />
            </div>
          </Card>
        ))}
    </div>
  );
};
