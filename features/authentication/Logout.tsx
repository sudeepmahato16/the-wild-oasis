"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import {SpinnerMini} from "@/components/Loader";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className="border-none p-[6px] rounded-md dark:hover:bg-gray-800 duration-200 hover:bg-gray-100 "
      disabled={isLoading}
      onClick={logout}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="w-5 h-5 text-indigo-500" />
      ) : (
        <SpinnerMini className="dark:text-gray-400"/>
      )}
    </button>
  );
};

export default Logout;
