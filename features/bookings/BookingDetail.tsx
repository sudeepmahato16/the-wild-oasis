"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";

import BookingDataBox from "./BookingDataBox";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import ConfirmDelete from "@/components/ConfirmDelete";

import { useMoveBack } from "@/hooks/useMoveBack";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { ExtendedBooking } from "./BookingRow";

interface BookingDetailProps {
  booking: ExtendedBooking;
}

const BookingDetail: FC<BookingDetailProps> = ({ booking }) => {
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const router = useRouter();

  const {
    status,
    cabin: { name },
    id,
  } = booking;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-[24px] font-semibold dark:text-gray-300">
            Booking #{name}
          </h1>
          <span
            className={`w-fit uppercase text-[11px] font-semibold py-1 px-3 rounded-full ${status}`}
          >
            {status.replace("-", " ")}
          </span>
        </div>

        <button
          className="text-indigo-600 text-[14px] font-medium text-center transition-all duration-300 bg-none rounded-md hover:text-indigo-700 active:text-indigo-700"
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex gap-3 justify-end">
        {status === "unconfirmed" && (
          <Button onClick={() => router.push(`/bookings/check-in/${id}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(id)}>
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
              onConfirm={(closeModal) => {
                deleteBooking(id, {
                  onSettled: () => {
                    closeModal?.();
                    router.back();
                  },
                });
              }}
              disabled={isDeleting}
              isLoading={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
};

export default BookingDetail;
