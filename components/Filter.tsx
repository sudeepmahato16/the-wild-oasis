"use client";
import React from "react";
import useUrl from "@/hooks/useUrl";

interface FilterProps {
  options: {
    value: string;
    label: string;
    id?: string;
  }[];
  filterField: string;
}

const Filter: React.FC<FilterProps> = ({ options, filterField }) => {
  const { addQueryToUrl, getValue } = useUrl();
  const currentFilter = getValue(filterField) || options[0].value;

  const handleClick = (value: string) => {
    if (getValue("page")) {
      addQueryToUrl({ [filterField]: value, page: 1 });
    } else {
      addQueryToUrl({ [filterField]: value });
    }
  };

  return (
    <div className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-black shadow-sm rounded-md p-[4.5px] flex gap-1">
      {options.map((option) => (
        <button
          type="button"
          className={` border-none rounded-md font-medium text-[13px] py-[4px] px-2 transition-all duration-300 hover:bg-indigo-600 hover:text-indigo-50 ${
            option.value === currentFilter
              ? "bg-indigo-600 text-indigo-50"
              : "bg-white dark:bg-black dark:hover:bg-indigo-600 dark:text-gray-300 "
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
