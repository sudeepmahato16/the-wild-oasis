import React from "react";
import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import {
  status,
  bookingSortByOptions as sortByOptions,
} from "@/utils/constants";

const BookingTableOperations = () => {
  return (
    <div className="flex items-center gap-4">
      <Filter filterField="status" options={status} />

      <SortBy options={sortByOptions} />
    </div>
  );
};

export default BookingTableOperations;
