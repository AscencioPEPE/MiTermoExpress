import { Metadata } from 'next';
import React from 'react';
import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Products',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
