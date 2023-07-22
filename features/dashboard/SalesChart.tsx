import React, { FC } from "react";
import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import { Booking } from "@prisma/client";

import {useDarkMode} from '@/context/DarkModeContext';

interface SalesChartProps {
  bookings: Booking[];
  numDays: number;
  isLoading: boolean;
}

const SalesChart: FC<SalesChartProps> = ({ bookings=[], numDays=0, isLoading }) => {
  const {isDarkMode} = useDarkMode();
  

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDates: Date[] = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-lg p-8 flex flex-col gap-6 col-span-full">
      <h2 className="text-[18px] font-semibold text-gray-800 dark:text-gray-200">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}{" "}
      </h2>
      {isLoading ? <SalesChartLoader /> : <ResponsiveContainer height={300} width="100%" className="text-[14px]">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default SalesChart;


const SalesChartLoader = () => {
  const {isDarkMode} = useDarkMode();
  return  <SkeletonTheme
  baseColor={!isDarkMode ? "#efefef" : "#111827"}
  highlightColor={!isDarkMode ? "#f3f4f6" : "#1f2937"}
>
  <Skeleton height="300px" width="100%" className="!rounded-md"/>

 
  
  </SkeletonTheme>
}