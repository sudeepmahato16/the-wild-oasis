import axios from "axios";
import { uploadImage } from "./uploadImage";

export const getCabins = async () => {
  try {
    const { data } = await axios.get("/api/cabin");
    return data;
  } catch (error) {
    throw new Error("failed to fetch cabins");
  }
};

export const deleteCabin = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/cabin/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createEditCabin = async ({
  id,
  description,
  discount,
  image,
  maxCapacity,
  name,
  regularPrice,
}: {
  id?: string;
  description: string;
  discount: number;
  image: File | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}) => {
  try {
    let imageUrl = image;
    if (typeof image !== "string") {
      imageUrl = await uploadImage(image);
    }
    
    const payload = {
      description,
        discount: discount * 1,
        image: imageUrl,
        maxCapacity: maxCapacity * 1,
        name,
        regularPrice: regularPrice * 1,
    };

    if (!id) {
      const { data } = await axios.post(`/api/cabin`, payload);
      return data;
    }

    const { data } = await axios.patch(`/api/cabin/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
