import { parse } from "url";
import { db } from "@/lib/db";
import { getToday } from "@/utils/helpers";

export const GET = async (req: Request) => {
  const query = parse(req.url, true).query;

  const { createdAt } = query;
  
  try {
    const bookings = await db.booking.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: new Date(String(createdAt)),
            },
          },
          {
            createdAt: {
              lte: getToday({ end: true }),
            },
          },
        ],
      },
      select: {
        id: true,
        createdAt: true,
        totalPrice: true,
        extrasPrice: true,
      },
    });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("Fail to fetch bookings", { status: 500 });
  }
};
