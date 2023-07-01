import { db } from "@/lib/db";

interface IParams {
  cabinId?: string;
}

export const DELETE = async (
  _req: Request,
  { params }: { params: IParams }
) => {
  const { cabinId } = params;
  try {
    const cabin = await db.cabin.delete({
      where: {
        id: cabinId,
      },
    });

    return new Response(JSON.stringify(cabin));
  } catch (error) {
    return new Response("Unable to delete cabin", { status: 500 });
  }
};
