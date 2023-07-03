"use client";
import React, { useState } from "react";

import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import Button from "@/components/Button";

const Cabins = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-semibold">All cabins</h1>
        <p>Filter</p>
      </div>

      <div className="flex flex-col gap-4">
        <CabinTable />
        <Button className="max-w-fit" onClick={() => setShowForm(true)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </div>
    </>
  );
};

export default Cabins;
