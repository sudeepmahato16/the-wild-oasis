import axios from "axios";
import queryString from "query-string";

export const getBookings = async (query: {}) => {
  const urlWithQuery = queryString.stringifyUrl({
    url: "/api/booking",
    query,
  });
  try {
    const { data } = await axios.get(urlWithQuery);
    return data;
  } catch (error) {
    throw new Error("failed to fetch bookings");
  }
};


export const getBooking = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/booking/${id}`);
    return data;
  } catch (error) {
    throw new Error("failed to fetch booking");
  }
}

export const updateBooking = async (id: string, payload: {}) => {
  try {
    const { data } = await axios.patch(`/api/booking/check-in/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}