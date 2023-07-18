"use client";
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, ...props },
  ref
) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 dark:border-gray-600 dark:text-gray-300 bg-white dark:bg-black rounded-md py-2 px-3 shadow-sm outline-violet-700 ${className}`}
      {...props}
    />
  );
};

export default forwardRef(Input);
