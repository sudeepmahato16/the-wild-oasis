import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container min-h-screen grid grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="flex flex-col gap-8 bg-red-200">{children}</main>
    </div>
  );
};

export default Layout;