"use client";
import React from "react";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./hooks/useTodayActivity";

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();
  return (
    <div className="bg-white border border-gray-100 rounded-l-none p-8 flex flex-col gap-6 col-span-2 col-start-1 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[18px] text-gray-800">Today</h2>
      </div>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className="overflow-scroll overflow-x-hidden [&::-webkit-scrollbar]:!w-0 ">
            {activities.map((activity: any) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-[16px] font-medium mt-2">
            No activity today...
          </p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TodayActivity;
