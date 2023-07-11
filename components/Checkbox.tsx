import React, { FC, ReactNode } from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
  children: ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}) => {
  return (
    <div className="flex items-center gap-4 ">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 outline-offset-2 origin-[0] accent-indigo-600 disabled:accent-indigo-600 cursor-pointer"
      />
      <label htmlFor={!disabled ? id : ""} className="cursor-pointer text-[14px] flex items-center gap-2 flex-1">{children}</label>
    </div>
  );
};

export default Checkbox;
