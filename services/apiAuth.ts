import axios from "axios";

export const createUser = async (payload: { [x: string]: any }) => {
  try {
    const { data } = await axios.post("/api/register", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
