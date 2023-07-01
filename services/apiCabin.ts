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
    const {data} = await axios.delete(`/api/cabin/${id}`);
    return data;
  } catch (error) {
    throw new Error('failed to delete cabin')
  }
};
