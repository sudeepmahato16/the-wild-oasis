import React from "react";
import Logo from "../Logo";
import MainNav from "./MainNav";
import Uploader from "@/data/Uploader";

const Sidebar = () => {
  return (
    <aside className="row-span-full bg-white dark:bg-black py-8 px-6 border-r dark:border-gray-900 border-gray-100 flex flex-col gap-8">
      <Logo />
      <MainNav />
      <Uploader />
    </aside>
  );
};

export default Sidebar;
