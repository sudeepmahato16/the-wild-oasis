import { useQuery, useQueryClient } from "@tanstack/react-query";
import queryString from "query-string";

import { getBookings } from "@/services/apiBooking";
import { PAGE_SIZE } from "@/utils/config";

export const useBookings = (query: queryString.ParsedQuery<string>) => {
  const queryClient = useQueryClient();
  const page = query.page || '1';
  
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", {...query, page}],
    queryFn: () => getBookings({...query, page}),
  });

  const { bookings, count } = data || {};

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (+page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", { ...query, page: String(+page + 1) }],
      queryFn: () => getBookings({ ...query, page: String(+page + 1) }),
    });
  }

  if (+page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", { ...query, page: String(+page - 1) }],
      queryFn: () => getBookings({ ...query, page: String(+page - 1) }),
    });
  }

  return { isLoading, bookings, count };
};
