import React, { FC } from "react";
import Image from "next/image";
import { isToday, format } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "@/components/DataItem";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { ExtendedBooking } from "@/types";

interface BookingDataBoxProps {
  booking: ExtendedBooking;
}

const BookingDataBox: FC<BookingDataBoxProps> = ({ booking }) => {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guest: { fullName: guestName, email, country, nationality, nationalID },
    cabin: { name: cabinName },
  } = booking;

  return (
    <section className="bg-white border border-gray-100 rounded-md">
      <header className="bg-indigo-500 py-[18px] px-10 text-[#e0e7ff]  font-medium flex items-center justify-between">
        <div className="flex items-center gap-4 font-medium text-[16px]">
          <HiOutlineHomeModern className="h-[24px] w-[24px]" />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p className="text-[15px]">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(String(startDate))}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="pt-8 pb-3 px-10 text-[14px]">
        <div className="flex items-center gap-3 mb-4 text-gray-50">
          {country && (
            <Image
              className="rounded-sm block border border-gray-100"
              src={country}
              width={20}
              height={16}
              alt={`Flag of ${nationality}`}
            />
          )}
          <p className="font-medium text-gray-700">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={HiOutlineChatBubbleBottomCenterText}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={HiOutlineCheckCircle} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`flex items-center justify-between py-[12px] px-6 rounded-md mt-6 ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem icon={HiOutlineCurrencyDollar} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p className="uppercase text-[13.25px] font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="py-4 px-10 text-[12px] text-gray-500 text-right">
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
};

export default BookingDataBox;
