import { isFuture, isPast, isToday } from "date-fns";

import { db } from "@/lib/db";
import { cabins } from "@/data/data-cabins";
import { guests } from "@/data/data-guests";
import { bookings } from "@/data/data-bookings";
import { subtractDates } from "@/utils/helpers";

export const POST = async (req: Request) => {
  try {
    await db.booking.deleteMany();
    await db.guest.deleteMany();
    await db.cabin.deleteMany();

    await db.guest.createMany({
      data: guests,
    });

    await db.cabin.createMany({
      data: cabins,
    });

    const allCabins = await db.cabin.findMany();
    const allGuests = await db.guest.findMany();

    const finalBookings = bookings.map((booking, index) => {
      const cabin = allCabins.find(
        (cabin) => Number(cabin.name) === booking.cabinId
      )!;

      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * 15 * booking.numGuests
        : 0;
      const totalPrice = cabinPrice + extrasPrice;

      let status;

      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = "checked-out";
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = "unconfirmed";
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      ) {
        status = "checked-in";
      }

      return {
        ...booking,
        createdAt: new Date(booking.createdAt),
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        guestId: allGuests[index].id,
        cabinId: cabin.id,
        status: status!,
      };
    });

    await db.booking.createMany({
      data: finalBookings,
    });

    return new Response("success", { status: 200 });
  } catch (error: any) {
    // console.log(error.message);

    return new Response(error.message, { status: 500 });
  }
};
