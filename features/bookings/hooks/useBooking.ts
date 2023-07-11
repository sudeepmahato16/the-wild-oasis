import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "@/services/apiBooking";
import { ExtendedBooking } from "../BookingRow";


export const useBooking = (): {isLoading: boolean, booking: ExtendedBooking} => {
  const {bookingId} = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false
  });

  return { isLoading, booking };
};
