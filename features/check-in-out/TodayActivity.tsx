"use client";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {motion} from 'framer-motion'

import TodayItem from "./TodayItem";
import { useTodayActivity } from "./hooks/useTodayActivity";
import { useDarkMode } from "@/context/DarkModeContext";
import {fadeIn} from '@/utils/motion'

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();
  const { isDarkMode } = useDarkMode();

  return (
    <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-l-none p-8 flex flex-col gap-6 col-span-2 col-start-1 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[18px] text-gray-800 dark:text-gray-200">
          Today
        </h2>
      </div>

      {!isLoading ? (
        activities?.length > 0 ? (
          <motion.ul variants={fadeIn(0.6, 0.4)} animate="show" initial="hidden" className="overflow-scroll overflow-x-hidden [&::-webkit-scrollbar]:!w-0 ">
            {activities.map((activity: any) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </motion.ul>
        ) : (
          <motion.div variants={fadeIn(0.6, 0.4)} animate="show" initial="hidden"  className="flex h-full w-full justify-center items-center">
            <p className="text-center text-[16px] font-medium mb-3 dark:text-gray-400">
              No activity today...
            </p>
          </motion.div>
        )
      ) : (
        <SkeletonTheme
          baseColor={!isDarkMode ? "#efefef" : "#111827"}
          highlightColor={!isDarkMode ? "#f3f4f6" : "#1f2937"}
        >
          <Skeleton height="46px" width="100%" className="rounded-md" />
          <Skeleton height="46px" width="100%" className="rounded-md" />
          <Skeleton height="46px" width="100%" className="rounded-md" />
        </SkeletonTheme>
      )}
    </div>
  );
};

export default TodayActivity;
