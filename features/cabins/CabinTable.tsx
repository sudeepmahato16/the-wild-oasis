"use client";
import React from "react";
import { Cabin } from "@prisma/client";

import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";

const CabinTable = () => {
  const {isLoading, cabins} = useCabins();

  if (isLoading) return <p>loading..</p>;

  return (
    <div className="table text-[14px] bg-white">
      <div className="table-row transition-none py-4 px-6 bg-gray-50 border-b  border-gray-200 uppercase font-semibold text-[14px] text-gray-600 ">
        <div></div>
        <h4>Cabin</h4>
        <h4>Capacity</h4>
        <h4>Price</h4>
        <h4>Discount</h4>
        <div></div>
      </div>

      {cabins.map((cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />)}
    </div>
  );
};

export default CabinTable;
