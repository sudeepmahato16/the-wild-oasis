import axios from "axios";

export const updateSettings = async ({ id, ...payload }: any) => {
  try {
    const { data } = await axios.patch(`/api/settings/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error("failed to update settings");
  }
};
