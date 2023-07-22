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

export const updateBooking = async (id: string, payload: {}) => {
  try {
    const { data } = await axios.patch(`/api/booking/check-in/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteBooking = async (id: string) => {
  try {
    const { data } = await axios.delete(`/api/booking/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBookingsAFterDate = async (date: string) => {
  try {
    const urlWithQuery = queryString.stringifyUrl({
      url: "/api/booking/recent-bookings",
      query: {
        createdAt: date,
      },
    });

    const { data } = await axios.get(urlWithQuery);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getStaysAFterDate = async (date: string) => {
  try {
    const urlWithQuery = queryString.stringifyUrl({
      url: "/api/booking/recent-stays",
      query: {
        startDate: date,
      },
    });

    const { data } = await axios.get(urlWithQuery);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function getStaysTodayActivity() {
  try {
    const { data } = await axios.get("/api/booking/today-activity");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
