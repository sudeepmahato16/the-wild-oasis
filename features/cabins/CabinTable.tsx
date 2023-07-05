"use client";
import React from "react";
import { Cabin } from "@prisma/client";

import Table from "@/components/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <p>loading..</p>;

  return (
    <Table className="bg-white" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div role="rowheader"></div>
        <h4 role="rowheader">Cabin</h4>
        <h4 role="rowheader">Capacity</h4>
        <h4 role="rowheader">Price</h4>
        <h4 role="rowheader">Discount</h4>
        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
