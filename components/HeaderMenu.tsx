"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Logout from "@/features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";

const HeaderMenu = () => {
  const router = useRouter();
  return (
    <ul className="flex gap-1 items-center">
      <li>
        <button
          type="button"
          className="p-[6px] rounded-md transition-all duration-200 hover:bg-gray-100"
          onClick={() => router.push("/accounts")}
        >
          <HiOutlineUser className="w-5 h-5 text-indigo-600" />
        </button>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
};

export default HeaderMenu;
