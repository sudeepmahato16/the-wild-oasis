'use client'
import React from "react";

import BookingDataBox from "./BookingDataBox";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import ConfirmDelete from "@/components/ConfirmDelete";

import { useBooking } from "./hooks/useBooking";
import { useMoveBack } from "@/hooks/useMoveBack";

const BookingDetail = ({ id }: { id: string }) => {
  const { booking, isLoading } = useBooking(id);
  const moveBack = useMoveBack();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const { status, cabin: {name} } = booking;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-[24px] font-semibold">Booking #{name}</h1>
          <span
            className={`w-fit uppercase text-[11px] font-semibold py-1 px-3 rounded-full ${status}`}
          >
            {status.replace("-", " ")}
          </span>
        </div>

        <button className="text-indigo-600 text-[14px] font-medium text-center transition-all duration-300 bg-none rounded-md hover:text-indigo-700 active:text-indigo-700" onClick={moveBack}>
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex gap-3 justify-end">
        {status === "unconfirmed" && <Button>Check in</Button>}

        {status === "checked-in" && (
          <Button>
            <span> Check out</span>
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variant="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={function (): void {
                throw new Error("Function not implemented.");
              }}
              disabled={false}
            />
          </Modal.Window>
        </Modal>

        <Button variant="secondary" onClick={moveBack}>Back</Button>
      </div>
    </>
  );
};

export default BookingDetail;
