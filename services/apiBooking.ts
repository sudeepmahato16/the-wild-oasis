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
