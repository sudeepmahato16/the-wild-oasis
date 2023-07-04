import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const settings = await db.settings.findFirst();
    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("Failed to fetch settings", { status: 500 });
  }
};
