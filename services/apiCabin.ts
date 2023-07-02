import { Cabin } from "@prisma/client";
import axios from "axios";

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

export const createCabin = async ({
  description,
  discount,
  image,
  maxCapacity,
  name,
  regularPrice,
}: {
  description: string;
  discount: number;
  image: File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "the-wild-oasis");

    const {data: {secure_url}} = await axios.post(
      `https://api.cloudinary.com/v1_1/dzxjgqfli/image/upload`,
      formData
    );

    const { data } = await axios.post(`/api/cabin`, {
      description,
      discount,
      image: secure_url,
      maxCapacity,
      name,
      regularPrice,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
