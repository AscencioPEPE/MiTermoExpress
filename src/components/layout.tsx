'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Avatar, Badge, Chip, Image, Link } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import useUserStore from '../zustand/user';
import useCartStore from '../zustand/cart';
import { classNames } from '../lib/classes';
import { Fragment, ReactNode } from 'react';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Products', href: '/products', current: true },
  { name: 'Your cart', href: '/cart', current: false },
  { name: 'My orders', href: '/orders', current: false },
];
const userNavigation = [
  { name: 'Products', href: '/products' },
  { name: 'Your cart', href: '/cart' },
  { name: 'My orders', href: '/orders' },
  { name: 'Logout', href: '/' },
];

const guestNavigation = [
  { name: 'Products', href: '/products' },
  { name: 'Your cart', href: '/cart' },
  { name: 'My orders', href: '/orders' },
  { name: 'Login', href: '/auth/login' },
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, removeCurrentUser } = useUserStore();
  const { currentCartItems } = useCartStore();

  return (
    <AnimatePresence>
      <div className="min-h-full bg-[url('/images/background.jpg')] bg-cover bg-fixed bg-no-repeat">
        <Disclosure as="nav">
          {({ open }) => (
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-transparent"
              // className={classNames(route !== '/' ? 'bg-black ' : 'bg-[#EDF0F4]')}
            >
              <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link href="/">
                      <div className="flex shrink-0 items-center justify-center gap-1">
                        <Image
                          className="z-1 size-6"
                          src="https://cdn-icons-png.flaticon.com/128/562/562031.png"
                          alt="Your Company"
                        />
                        <h2 className="text-softWhite">ArteTermos</h2>
                      </div>
                    </Link>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white hover:text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* CART */}

                      <Badge color="primary" content={currentCartItems?.length}>
                        <Link
                          href="/cart"
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1.5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View your cart</span>
                          <ShoppingCartIcon className="size-6" aria-hidden="true" />
                        </Link>
                      </Badge>
                      {/* Profile dropdown */}

                      {currentUser.isGuest && (
                        <div className="ml-3 flex gap-3">
                          <Chip variant="faded" color="warning" classNames={{ base: 'bg-white/15 border-white/30' }}>
                            GUEST
                          </Chip>
                          <span className="text-softWhite">{currentUser.name}</span>
                        </div>
                      )}
                      {/*
                      USER AUNTHENTICATED
                      */}
                      {currentUser?.token ? (
                        <Menu as="div" className="relative ml-3 bg-transparent">
                          <div>
                            <Menu.Button className="relative flex max-w-xs  items-center bg-transparent p-0 text-sm outline-none hover:border-0 focus:outline-none">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <Avatar
                                name={currentUser?.name || currentUser?.username || 'User'}
                                classNames={{
                                  base: 'bg-primary',
                                  icon: 'text-black/80',
                                }}
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-[#1A1A1A] py-1 shadow-lg ring-1 ring-white/15 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-[#282828] ' : '',
                                        'block px-4 py-2 text-sm text-white/80 hover:text-white/70'
                                      )}
                                      onClick={() => {
                                        if (item.name === 'Logout') removeCurrentUser();
                                      }}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex  max-w-xs items-center bg-transparent p-0 text-sm outline-none hover:border-transparent focus:outline-none">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <Avatar />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-[#1A1A1A] py-1 shadow-lg ring-1 ring-white/15 focus:outline-none">
                              {guestNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-[#282828] ' : '',
                                        'block px-4 py-2 text-sm text-white/80 hover:text-white/70'
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block size-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block size-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    {currentUser.token ? (
                      <>
                        <div className="shrink-0">
                          <Avatar
                            className="size-10 rounded-full"
                            src={currentUser?.name || currentUser?.username || 'USER'}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{user.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="shrink-0">
                          <Avatar className="size-10 rounded-full" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            <span>{currentUser?.name ? `Hello ${currentUser?.name || 'Guest'}` : 'Hey buddy'}</span>
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {currentUser?.email || 'You have not yet registered'}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="ml-auto">
                      <Badge color="primary" className="" content={currentCartItems?.length}>
                        <Link
                          href="/cart"
                          type="button"
                          className="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View your cart</span>
                          <ShoppingCartIcon className="size-6" aria-hidden="true" />
                        </Link>
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 px-2">
                    {currentUser?.token ? (
                      <>
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-[#1a1a1aa5] hover:text-white"
                            onClick={() => {
                              if (item.name === 'Logout') removeCurrentUser();
                            }}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </>
                    ) : (
                      <>
                        {guestNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-[#1a1a1aa5] hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </motion.div>
          )}
        </Disclosure>

        <main>
          <div className="min-h-100dvh-minus-4rem md:pb-10">{children}</div>
        </main>
      </div>
    </AnimatePresence>
  );
}
