import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import "react-loading-skeleton/dist/skeleton.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900 pt-8 px-10 pb-12 overflow-x-auto">
        <div className="container flex flex-col gap-6">
        {children}
          </div>
      </main>
    </div>
  );
};

export default Layout;
