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
    <section className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md overflow-hidden">
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
        <div className="flex items-center gap-3 mb-4 text-gray-500 dark:text-gray-400 ">
          {country && (
            <Image
              className="rounded-sm block border border-gray-100 dark:border-gray-800"
              src={country}
              width={20}
              height={16}
              alt={`Flag of ${nationality}`}
            />
          )}
          <p className="font-medium text-gray-700 dark:text-gray-300">
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
            <span className="dark:text-gray-300">{observations}</span>
          </DataItem>
        )}

        <DataItem icon={HiOutlineCheckCircle} label="Breakfast included?">
          <span className="dark:text-gray-300">
            {hasBreakfast ? "Yes" : "No"}
          </span>
        </DataItem>

        <div
          className={`flex items-center justify-between py-[12px] px-6 rounded-md mt-6 ${
            isPaid
              ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
          }`}
        >
          <DataItem
            icon={HiOutlineCurrencyDollar}
            label={`Total price`}
            iconStyle='!text-inherit'
            className="!text-inherit"
          >
            <span >
              {formatCurrency(totalPrice)}

              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                  extrasPrice
                )} breakfast)`}
            </span>
          </DataItem>

          <p className="uppercase text-[13.25px] font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="py-4 px-10 text-[12px] text-gray-500  dark:text-gray-400 text-right">
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
};

export default BookingDataBox;
