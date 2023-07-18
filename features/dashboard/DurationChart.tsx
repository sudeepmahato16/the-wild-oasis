import React, { FC } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Booking } from "@prisma/client";

import {useDarkMode} from '@/context/DarkModeContext';
import { startDataDark, startDataLight } from "@/utils/constants";

function prepareData(startData: any[], stays: any[]) {
  function incArrayValue(arr: any[], field: string) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj: any) => obj.value > 0);

  return data;
}

interface DurationChartProps {
  confirmedStays: Booking[];
}

const DurationChart: FC<DurationChartProps> = ({ confirmedStays }) => {
  const {isDarkMode} = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <div className="col-start-3 col-span-2 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 py-6 px-8 first:mb-4 rounded-lg">
      <h2 className="text-[18px] font-semibold text-gray-800 dark:text-gray-200">
        Stay duration summary
      </h2>
      <ResponsiveContainer width="100%" height={240} className="text-[14px]">
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={75}
            outerRadius={100}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry: { color: string; duration: string }) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            widths="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DurationChart;
