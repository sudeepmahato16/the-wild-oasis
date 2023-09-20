import React from "react";
import Skeleton from "react-loading-skeleton";

const DashboardLoader = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton width="136px" height="34px" className="rounded-sm" />
        <Skeleton width="302px" height="34px" className="rounded-sm" />
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5">
        <Skeleton height="96px" className="rounded-lg" />
        <Skeleton height="96px" className="rounded-lg" />
        <Skeleton height="96px" className="rounded-lg" />
        <Skeleton height="96px" className="rounded-lg" />

        <div className="rounded-lg col-start-1 col-span-2">
          <Skeleton height="316px" />
        </div>
        <div className="rounded-lg col-start-3 col-span-2">
          <Skeleton height="316px" />
        </div>
        <div className="rounded-lg  col-span-full">
          <Skeleton height="76px" />
        </div>
      </div>
    </>
  );
};

export default DashboardLoader;
