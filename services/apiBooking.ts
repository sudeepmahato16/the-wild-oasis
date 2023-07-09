import axios from "axios";

export const getBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking");
      return data;
    } catch (error) {
      throw new Error("failed to fetch bookings");
    }
  };