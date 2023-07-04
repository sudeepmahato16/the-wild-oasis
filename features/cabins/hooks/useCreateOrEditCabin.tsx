import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "@/services/apiCabin";

export const useCreateOrEditCabin = (isEditSession?: boolean) => {
    const queryClient = useQueryClient();
    const { mutate: createOrEditCabin, isLoading: isWorking } =
      useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
          toast.success(
            `${
              isEditSession
                ? "Cabin successfully edited!"
                : "New cabin successfully created!"
            }`
          );
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      });

      return {isWorking, createOrEditCabin}
}