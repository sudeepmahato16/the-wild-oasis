"use client";
import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useGlobalContext } from "@/context/GlobalContext";


const Sidebar = () => {
  const { isSidebarOpen } = useGlobalContext();
  return (
    <aside
      className={`row-span-full w-[250px] ${
        isSidebarOpen ? "-ml-[250px] " : "m-0 "
      } bg-white dark:bg-black py-8 px-6 border-r dark:border-gray-900 transition-all duration-300 ease-in-out border-gray-100 flex flex-col gap-8 `}
    >
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
