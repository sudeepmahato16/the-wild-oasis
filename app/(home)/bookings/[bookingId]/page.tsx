import React from "react";
import BookingDetail from "@/features/bookings/BookingDetail";
import { getBooking } from "@/services/getBooking";

interface IParams {
  bookingId?: string;
}

const Booking = async ({ params: { bookingId } }: { params: IParams }) => {
  const booking = await getBooking(bookingId!);
  return <BookingDetail booking={booking}/>;
};

export default Booking;
