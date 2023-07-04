import { db } from "@/lib/db";

interface IParams {
  settingsId?: string;
}

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  const { settingsId } = params;
  try {
    const data = await req.json();
    const setting = await db.settings.update({
      where: {
        id: settingsId,
      },
      data,
    });

    return new Response(JSON.stringify(setting));
  } catch (error) {
    return new Response("Failed to update setting", { status: 500 });
  }
};
