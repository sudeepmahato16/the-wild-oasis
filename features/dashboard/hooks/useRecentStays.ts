import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getStaysAFterDate } from "@/services/apiBooking";

export const useRecentStays = () => {
  const searchParams = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAFterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  const confirmedStays = stays?.filter(
    (stay: any) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
};
