"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Cabin } from "@prisma/client";

import Table from "@/components/Table";
import Menus from "@/components/Menu";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";

const CabinTable = () => {
  const { isLoading, cabins=[] } = useCabins();
  const searchParams = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  let filterCabins: Cabin[];
  if (filterValue === "all") {
    filterCabins = cabins;
  } else {
    filterCabins = cabins.filter(({ discount = 0 }: Cabin) => {
      if (filterValue === "no-discount") {
        return discount === 0;
      } else if (filterValue === "with-discount") return discount > 0;
    });
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins =
    filterCabins &&
    filterCabins.sort((a: any, b: any) => (a[field] - b[field]) * modifier);
    
  return (
    <Menus>
      <Table
        className="bg-white dark:bg-black w-full"
        columns="75px 1.8fr 2.2fr 1fr 1fr 1fr"
      >
        <Table.Header>
          <div role="rowheader"></div>
          <h4 role="rowheader">Cabin</h4>
          <h4 role="rowheader">Capacity</h4>
          <h4 role="rowheader">Price</h4>
          <h4 role="rowheader">Discount</h4>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          isLoading={isLoading}
          emptyMessage="No cabins could be found"
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
