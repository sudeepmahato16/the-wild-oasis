"use client";
import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "@/context/DarkModeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className="p-[6px] cursor-pointer rounded-md duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isDarkMode ? (
        <HiOutlineSun className="w-5 h-5 text-indigo-600" />
      ) : (
        <HiOutlineMoon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};

export default DarkModeToggle;
