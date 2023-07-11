import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/apiBooking";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ id, breakfast }: { id: string; breakfast?: {} }) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.cabin.name} successfully checked in`);
      queryClient.invalidateQueries();
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("There was error while checking in");
    },
  });

  return { checkin, isCheckingIn };
};
