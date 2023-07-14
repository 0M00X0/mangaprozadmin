import Nav from "./Nav";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <>
      <div className="bg-blue-900 min-h-screen flex">
        <Nav />
        <div className="bg-white w-6/7 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    </>
  );
}
