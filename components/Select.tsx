import React from "react";

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: {
    id: string;
    label: string;
    value: string;
  }[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select
      className={`text-[13px] py-2 px-3 border rounded-md bg-white font-medium shadow-sm ${className}`}
      {...props}
    >
      {options.map((option) => {
        return (
          <option value={option.value} key={option.id}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
