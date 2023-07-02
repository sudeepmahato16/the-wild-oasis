import React from "react";

interface FormRowProps {
  label?: string;
  id?: string;
  children: React.ReactNode;
  error?: string;
  hasButton?:boolean
}

const FormRow: React.FC<FormRowProps> = ({ label, error, children, id, hasButton=false }) => {
  return (
    <div className={`${hasButton ? 'flex justify-end gap-3': "grid grid-cols-[240px_1fr_1.2fr] gap-6"} items-center  py-2 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b border-gray-100`}>
      {label && (
        <label className="font-medium cursor-pointer" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[14px] text-red-700">{error}</span>}
    </div>
  );
};

export default FormRow;
