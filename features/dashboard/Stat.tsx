import React, { FC } from "react";
import { IconType } from "react-icons/lib";
import {motion} from 'framer-motion'

import { SpinnerMini } from "@/components/Loader";
import {fadeIn} from '@/utils/motion'

interface StatProps {
  icon: IconType;
  title: string;
  value: number | string;
  color: string;
  isLoading: boolean;
}

const Stat: FC<StatProps> = ({
  icon: Icon,
  title,
  value,
  color,
  isLoading,
}) => {
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
      <div className="h-8 w-8">
      {isLoading ? (
        <SpinnerMini className="text-gray-700 dark:text-gray-400" />
        ) : (
          <motion.p variants={fadeIn(0.6, 0.4)} initial="hidden" animate="show" className="text-[18px] leading-[1] font-medium text-gray-800 dark:text-gray-200">
          {value}
        </motion.p>
      )}
      </div>
    </div>
  );
};

export default Stat;
