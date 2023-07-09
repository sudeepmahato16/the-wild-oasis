import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/apiBooking";

export const useBookings = (query: {}) => {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", query],
    queryFn: () => getBookings(query),
  });

  return { isLoading, bookings };
};
