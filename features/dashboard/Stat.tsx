import React, { FC } from "react";
import { IconType } from "react-icons/lib";

interface StatProps {
  icon: IconType;
  title: string;
  value: number | string;
  color: string;
}

const Stat: FC<StatProps> = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 grid grid-cols-[64px_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1">
      <div
        className={`stat-icon  ${color} row-span-full aspect-[1] rounded-full flex items-center justify-center `}
      >
        {<Icon className={`w-6 h-6`} />}
      </div>
      <h5 className="self-end text-[11px] uppercase font-semibold text-gray-500 tracking-[0.4px]">
        {title}
      </h5>
      <p className="text-[18px] leading-[1] font-medium text-gray-800">{value}</p>
    </div>
  );
};

export default Stat;
