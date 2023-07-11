import { useQuery } from "@tanstack/react-query";
import { getBooking } from "@/services/apiBooking";
import { ExtendedBooking } from "../BookingRow";


export const useBooking = (id: string): {isLoading: boolean, booking: ExtendedBooking} => {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { isLoading, booking };
};
