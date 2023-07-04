import { db } from "@/lib/db";

export const GET = async (_req: Request) => {
  try {
    const cabins = await db.cabin.findMany();
    return new Response(JSON.stringify(cabins), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("Fail to fetch cabins", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const {
      description,
      discount = 0,
      image,
      maxCapacity,
      name,
      regularPrice,
    } = await req.json();
    if (!description || !image || !maxCapacity || !name || !regularPrice)
      return new Response("please provide us all data", { status: 400 });

    const cabin = await db.cabin.create({
      data: {
        description,
        discount,
        image,
        maxCapacity,
        name,
        regularPrice,
      },
    });

    return new Response(JSON.stringify(cabin), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("Fail to create new cabin", { status: 500 });
  }
};
