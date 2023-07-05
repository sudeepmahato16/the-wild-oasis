import React, { useState } from "react";

import CabinTable from "@/features/cabins/CabinTable";
import AddCabin from "@/features/cabins/AddCabin";

const Cabins = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-semibold">All cabins</h1>
        <p>Filter</p>
      </div>

      <div className="flex flex-col gap-4">
        <CabinTable />
        <AddCabin />
      </div>
    </>
  );
};

export default Cabins;
