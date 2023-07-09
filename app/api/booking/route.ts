import { db } from "@/lib/db";
import { parse } from "url";

export const GET = async (req: Request) => {
  const query = parse(req.url, true).query;

  const {status, sortBy} = query;

  let where: any = {};
  let orderBy: any = {};

  if(status && status !== 'all'){
    where.status = status;
  }

  if(sortBy){
    const [field, direction] = String(sortBy).split('-');
    orderBy[field] = direction;
  }
 
  try {
    const bookings = await db.booking.findMany({
      where,
      orderBy,
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
