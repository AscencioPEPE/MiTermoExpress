export const SkeletonProductDetail = () => {
  return (
    <div className="grid h-dvhContainer w-full grid-cols-2 grid-rows-2 gap-2 rounded-xl px-10 py-5">
      <div className="row-span-2 animate-pulse  bg-[#0f0e0e] text-white dark:bg-gray-700"></div>
      <div className="animate-pulse  bg-[#0f0e0e] text-white dark:bg-gray-700"></div>
      <div className="animate-pulse  bg-[#0f0e0e] text-white dark:bg-gray-700"></div>
    </div>
  );
};
