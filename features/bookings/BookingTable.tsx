"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

import Menu from "@/components/Menu";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import BookingRow, { ExtendedBooking } from "./BookingRow";

import { useBookings } from "./hooks/useBookings";
import { usePrevious } from "@/hooks/usePrevious";

const BookingTable = () => {
  const params = useSearchParams();
  const query = queryString.parse(params.toString());
  const { bookings, isLoading, count } = useBookings(query);
  const previousCount = usePrevious(count);

  return (
    <Menu>
      <Table
        className="bg-white dark:bg-black w-full"
        columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"
      >
        <Table.Header>
          <h4 role="rowHeader">Cabin</h4>
          <h4 role="rowHeader">Guest</h4>
          <h4 role="rowHeader">Dates</h4>
          <h4 role="rowHeader">Status</h4>
          <h4 role="rowHeader">Amount</h4>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking: ExtendedBooking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
          isLoading={isLoading}
          emptyMessage="No bookings could be found"
        />

        <Table.Footer>
          <Pagination count={count || previousCount || 0} isLoading={isLoading}/>
        </Table.Footer>
      </Table>
    </Menu>
  );
};

export default BookingTable;
