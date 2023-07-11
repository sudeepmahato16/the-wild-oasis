import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi} from "@/services/apiBooking";


export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking successfully deleted");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteBooking };
};
