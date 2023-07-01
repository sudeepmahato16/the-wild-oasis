import { db } from "@/lib/db";

export const GET = async (_req: Request) => {
  try {
    const cabins = await db.cabin.findMany();
    return new Response(JSON.stringify(cabins), { status: 200 });
  } catch (error) {
    console.log(error)
    new Response("Fail to fetch cabins", { status: 500 });
  }
};
