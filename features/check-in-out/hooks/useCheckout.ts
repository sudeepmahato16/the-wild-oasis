import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/apiBooking";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id: string) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.cabin.name} successfully checked out`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("There was error while checking out");
    },
  });

  return { checkout, isCheckingOut };
};
