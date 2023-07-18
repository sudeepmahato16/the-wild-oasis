"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";

import Logout from "@/features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

const HeaderMenu = () => {
  const router = useRouter();
  return (
    <ul className="flex gap-1 items-center">
      <li>
        <button
          type="button"
          className="p-[6px] rounded-md duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => router.push("/accounts")}
        >
          <HiOutlineUser className="w-5 h-5 text-indigo-600" />
        </button>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
};

export default HeaderMenu;
