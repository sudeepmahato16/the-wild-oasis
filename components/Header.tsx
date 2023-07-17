import React from "react";
import HeaderMenu from "./HeaderMenu";
import Avatar from "@/features/authentication/Avatar";
import { getSession } from "@/services/getSession";

const Header = async () => {
  const session = await getSession();
  const { name, image } = session?.user || {};

  return (
    <header className="py-4 px-12 bg-white border-b border-gray-100 flex gap-6 items-center justify-end">
      <Avatar name={name} image={image} />
      <HeaderMenu />
    </header>
  );
};

export default Header;
