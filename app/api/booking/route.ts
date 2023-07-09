import { db } from "@/lib/db";

export const GET = async (_req: Request) => {
  try {
    const bookings = await db.booking.findMany({
      select: {
        id: true,
        createdAt: true,
        startDate: true,
        endDate: true,
        numGuests: true,
        numNights: true,
        status: true,
        totalPrice: true,
        cabin: {
          select: {
            name: true,
          },
        },
        guest: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("Fail to fetch bookings", { status: 500 });
  }
};
