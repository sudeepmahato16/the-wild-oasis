import React from "react";
import Skeleton from "react-loading-skeleton";

interface BookingLoaderProps {
  isCheckinPage?: boolean;
}

const BookingLoader: React.FC<BookingLoaderProps> = ({
  isCheckinPage = false,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Skeleton width="164px" height="32px" />
          <Skeleton width="104px" height="24px" className="!rounded-full" />
        </div>

        <Skeleton width="52px" height="21px" />
      </div>
      <Skeleton width="100%" height="351px" />
      {isCheckinPage && <><Skeleton width="100%" height="54px" /><Skeleton width="100%" height="54px" /></>}
      <div className="flex justify-end items-center gap-3">
        {!isCheckinPage && <Skeleton width="93px" height="40px" />}
        <Skeleton width="136px" height="40px" />
        <Skeleton width="68px" height="40px" />
      </div>
    </>
  );
};

export default BookingLoader;
