import axios from "axios";
import { uploadImage } from "./uploadImage";

export const createUser = async (payload: { [x: string]: any }) => {
  try {
    const { data } = await axios.post("/api/auth/register", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUser = async (payload: { [x: string]: any }) => {
  try {
    if (!payload.password && typeof payload.image !== "string") {
      payload.image = await uploadImage(payload.image);
    }

    const { data } = await axios.patch("/api/user", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
