import { useQuery } from "@tanstack/react-query";
import { Booking } from "@prisma/client";
import { getStaysTodayActivity } from "@/services/apiBooking";

export function useTodayActivity()
{
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}
