import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl p-4  sm:px-6  lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          {/* 111111 */}
          <div className="aspect-h-1 aspect-w-2 sm:aspect-h-1 sm:aspect-w-1 group overflow-hidden rounded-lg sm:relative sm:row-span-2">
            <Image
              src="https://thermos.com/cdn/shop/products/F4100NY6_1000px_6ffa5fd6-4f51-4dca-b026-de8ed13b291a.png"
              alt="Two models wearing women's black cotton  tee and off-white cotton  tee."
              className="h-full object-cover object-center group-hover:opacity-75"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-[#393939] to-[#393939] opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-start p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="text-7xl font-semibold text-white">THE SIMPLE</h3>
                <h3 className="text-7xl font-semibold text-white">THERMOS</h3>
                <h3 className="text-7xl font-semibold text-white">DESIGN</h3>
                <button className="my-20  flex items-center justify-between gap-4 rounded-lg bg-white p-2 shadow-lg">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-thin">SHOP</span>
                    <span className="text-sm">All Products</span>
                  </div>
                  <Image
                    alt="thermo"
                    src="https://cdn-icons-png.flaticon.com/128/3737/3737372.png"
                    className="size-[20px]"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* 22222 */}
          <div className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:size-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    Accessories
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
          <div className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:size-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    Workspace
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
