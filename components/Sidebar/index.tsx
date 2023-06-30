import React from "react";
import Logo from "../Logo";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <aside className="row-span-full bg-white py-8 px-6 border-r border-gray-100 flex flex-col gap-8">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
