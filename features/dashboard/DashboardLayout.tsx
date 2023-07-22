"use client";
import React from "react";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import {Loader} from '@/components/Loader'

import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";
import { useCabins } from "../cabins/hooks/useCabins";


const DashboardLayout = () => {
  const { bookings, isLoading: bookingsIsLoading } = useRecentBookings();
  const {
    isLoading: staysIsLoading,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins=[], isLoading: cabinIsLoading } = useCabins();
    
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
        isLoading={bookingsIsLoading || staysIsLoading}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} isLoading={staysIsLoading} />
      <SalesChart bookings={bookings} numDays={numDays} isLoading={bookingsIsLoading || staysIsLoading} />
    </div>
  );
};

export default DashboardLayout;
