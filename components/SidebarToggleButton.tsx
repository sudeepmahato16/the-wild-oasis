"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const SidebarToggleButton = () => {
  const { toggleSidebar } = useGlobalContext();
  return (
    <button
      type="button"
      className="p-[6px] rounded-md mr-auto duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={toggleSidebar}
    >
      <AiOutlineMenu
        className="w-5 h-5 text-indigo-600"
       
      />
    </button>
  );
};

export default SidebarToggleButton;
