"use client";
import React, { ChangeEvent } from "react";

import Select from "./Select";
import useUrl from "@/hooks/useUrl";

interface SortByProps {
  options: {
    id: string;
    label: string;
    value: string;
  }[];
}

const SortBy: React.FC<SortByProps> = ({ options }) => {
  const { addQueryToUrl, getValue } = useUrl();
  const currentValue = getValue("sortBy") || options[0].value;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    addQueryToUrl({sortBy: e.target.value});
  };

  return (
    <Select
      options={options}
      className="bg-gray-100"
      onChange={handleChange}
      value={currentValue}
    />
  );
};

export default SortBy;
