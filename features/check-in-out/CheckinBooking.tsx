"use client";
import React, { useEffect, useState } from "react";

import BookingDataBox from "../bookings/BookingDataBox";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";

import { useBooking } from "../bookings/hooks/useBooking";
import { useMoveBack } from "@/hooks/useMoveBack";
import { formatCurrency } from "@/utils/helpers";
import { useCheckin } from "./hooks/useCheckin";
import { useSettings } from "../settings/hooks/useSettings";

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isCheckingIn, checkin } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  const { isPaid } = booking || { isPaid: false };

  useEffect(() => {
    setConfirmPaid(isPaid ?? false);
  }, [isPaid]);

  if (isLoading || isLoadingSettings) return <p>Loading...</p>;

  const handleCheckIn = () => {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        id: bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        },
      });
    } else {
      checkin({ id: bookingId });
    }
  };

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    cabin,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-semibold">
          Check in booking #{cabin.name}
        </h1>
        <button
          className="text-indigo-600 font-medium text-center transition-all duration-300 border-none rounded-md hover:text-indigo-700 active:text-indigo-700"
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="bg-white border border-gray-100 rounded-md py-5 px-8">
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-md py-5 px-8">
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </div>

      <div className="flex gap-3 justify-end">
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckIn}>
          Check in booking #{cabin.name}
        </Button>
        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
};

export default CheckinBooking;
