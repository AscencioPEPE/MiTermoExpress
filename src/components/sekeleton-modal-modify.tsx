export const SkeletonProductModal = () => {
  return (
    <div className="flex h-[400px] w-full flex-col gap-4 bg-[#1A1A1A]">
      <div className="row-span-2 h-[60px] w-full animate-pulse  rounded bg-[#0f0e0e] text-white dark:bg-gray-700" />
      <div className="flex h-[100px] w-full gap-4">
        <div className="h-full w-2/6 animate-pulse rounded bg-[#0f0e0e] text-white dark:bg-gray-700" />

        <div className="size-full animate-pulse  rounded bg-[#0f0e0e] text-white dark:bg-gray-700" />
      </div>
      <div className="row-span-2 h-[40px] w-full animate-pulse  rounded bg-[#0f0e0e] text-white dark:bg-gray-700" />
      <div className="row-span-2 h-[40px] w-full animate-pulse  rounded bg-[#0f0e0e] text-white dark:bg-gray-700" />
      <div className="row-span-2 mt-10 h-[40px] w-full animate-pulse  rounded bg-[#0f0e0e] text-white dark:bg-gray-700" />
    </div>
  );
};
