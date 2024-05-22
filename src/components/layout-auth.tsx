import { Image, Link } from '@nextui-org/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { RouteProps } from 'wouter';

type LayoutAuthProps = {
  title: React.ReactNode | string;
  backHref: RouteProps['path'];
  children: React.ReactNode | string;
  coverImg?: string;
  reverseContent?: boolean;
};

export const LayoutAuth = ({ backHref, title, coverImg, children, reverseContent }: LayoutAuthProps) => {
  return (
    <div className="bg-red flex h-dvhContainer items-center justify-center ">
      <div className="flex h-[550px] w-full max-w-[1250px]  items-center justify-center ">
        <div
          className={`${reverseContent ? 'flex-row-reverse' : 'flex-row'} flex h-full w-5/6 items-center justify-center shadow-gray`}
        >
          <div className="z-2 absolute flex h-full w-full flex-col items-start justify-between rounded-lg bg-[#1A1A1A]  p-5 md:relative md:w-1/2">
            <Link className="m-0 cursor-pointer bg-transparent text-softWhite" href={backHref}>
              <ArrowLeftIcon className="w-[25px]" />
            </Link>
            <h3 className="w-full text-center text-2xl font-bold text-softWhite">{title}</h3>
            {children}
          </div>
          <div className="hidden h-full w-1/2 rounded-lg md:inline-block">
            <div className="size-full">
              <Image
                src={
                  coverImg ||
                  'https://static.vecteezy.com/system/resources/previews/033/133/268/large_2x/ai-generative-metal-thermos-on-the-background-of-autumn-lake-and-mountain-landscape-photo.jpg'
                }
                alt="Two models wearing women's black cotton  tee and off-white cotton  tee."
                classNames={{
                  wrapper: 'size-full',
                  img: 'opacity-100 z-0 group-hover:opacity-75 h-full object-cover ',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
