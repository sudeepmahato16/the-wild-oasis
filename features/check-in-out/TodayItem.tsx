import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Booking } from "@prisma/client";
import CheckoutButton from "./CheckoutButton";

interface TodayItemProps {
  activity: Pick<Booking, "id" | "status" | "numNights"> & {
    guest: {
      fullName: string;
      country: string;
      nationality: string;
    };
  };
}

const TodayItem: FC<TodayItemProps> = ({ activity }) => {
  const { id, status, guest, numNights } = activity;

  return (
    <li className="grid grid-cols-[90px_20px_1fr_70px_90px] gap-2 items-center text-[14px] py-2 px-0 border-b border-gray-100 dark:border-gray-800 first:border-t">
      {status === "unconfirmed" && (
        <span className="w-fit uppercase text-[10px] font-medium py-1 px-3 rounded-full stat-icon green">
          Arriving
        </span>
      )}
      {status === "checked-in" && (
        <span className="w-fit uppercase text-[10px] font-medium py-1 px-3 rounded-full stat-icon blue">
          Departing
        </span>
      )}

      <Image
        width={20}
        height={10}
        className="rounded-s-sm border border-gray-100 dark:border-gray-800"
        src={guest.country}
        alt={`Flag of ${guest.nationality}`}
      />
      <span className="font-medium text-[12px] text-gray-600 dark:text-gray-300">{guest.fullName}</span>
      <span className="text-[13px] dark:text-gray-400">{numNights} nights</span>

      {status === "unconfirmed" && (
        <Link
          className="rounded-[5px] shadow-sm transition-all duration-300 text-[10px] py-[6px] px-2 uppercase font-semibold text-center text-[#eef2ff] bg-indigo-600 hover:bg-indigo-700"
          href={`/bookings/check-in/${id}`}
        >
          Check in
        </Link>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </li>
  );
};

export default TodayItem;
