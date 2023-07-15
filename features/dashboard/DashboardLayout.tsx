"use client";
import React from "react";

import Stats from "./Stats";

import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";
import { useCabins } from "../cabins/hooks/useCabins";

const DashboardLayout = () => {
  const { bookings, isLoading: bookingsIsLoading } = useRecentBookings();
  const {
    stays,
    isLoading: staysIsLoading,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: cabinIsLoading } = useCabins();

  if (bookingsIsLoading || staysIsLoading || cabinIsLoading)
    return <p>loading</p>;

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_340px_auto] gap-5">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
    </div>
  );
};

export default DashboardLayout;
