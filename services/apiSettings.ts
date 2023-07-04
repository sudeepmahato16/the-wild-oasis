import axios from "axios";

export const getSettings = async () => {
  try {
    const { data } = await axios.get("/api/settings");
    return data;
  } catch (error) {
    throw new Error("failed to fetch settings");
  }
};

export const updateSettings = async ({ id, ...payload }: any) => {
  try {
    const { data } = await axios.patch(`/api/settings/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error("failed to update settings");
  }
};
