"use client";
import React from "react";
import Select from "react-select";

import useUrl from "@/hooks/useUrl";
import {useDarkMode} from '@/context/DarkModeContext';

interface SortByProps {
  options: {
    id: string;
    label: string;
    value: string;
  }[];
}

const SortBy: React.FC<SortByProps> = ({ options }) => {
  const {isDarkMode} = useDarkMode();
  const { addQueryToUrl, getValue } = useUrl();
  const currentValue = getValue("sortBy");

  const currentOption = currentValue
    ? options.find((option) => option.value === currentValue)
    : options[0];

  const handleChange = (val: string | undefined) => {
    addQueryToUrl({ sortBy: val });
  };

  return (
    <Select
      options={options}
      onChange={(option) => handleChange(option?.value)}
      value={currentOption}
      isSearchable={false}
      className=" "
      classNames={{
        control: () => "dark:bg-black bg-white !border-none shadow-sm",
        container: () => "min-w-[240px] bg-white dark:bg-black font-medium text-[13px] z-[10]  rounded-md ",
        menu: () => "dark:bg-black bg-white dark:text-gray-300 text-gray-600",
      }}

      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#4f46e5",
          primary25: isDarkMode ? "#4f46e5" :"#eef2ff",
        },
      })}
    />
  );
};

export default SortBy;
