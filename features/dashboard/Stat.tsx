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
    <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-lg p-4 grid grid-cols-[64px_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1">
      <div
        className={`stat-icon  ${color} row-span-full aspect-[1] rounded-full flex items-center justify-center `}
      >
        {<Icon className={`w-7 h-7`} />}
      </div>
      <h5 className="self-end text-[11px] uppercase font-semibold text-gray-500  dark:text-gray-400 tracking-[0.4px]">
        {title}
      </h5>
      <p className="text-[18px] leading-[1] font-medium text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  );
};

export default Stat;
