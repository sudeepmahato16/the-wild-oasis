import { db } from "@/lib/db";

export const getSettings = async () => {
  try {
    const settings = await db.settings.findFirst();
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    throw new Error("Failed to fetch settings");
  }
};
