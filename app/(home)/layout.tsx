import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-[250px_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className=" bg-gray-50 pt-8 px-10 pb-12 ">
        <div className="container flex flex-col gap-6">
        {children}
          </div>
      </main>
    </div>
  );
};

export default Layout;
