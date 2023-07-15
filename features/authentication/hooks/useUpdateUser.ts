import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser as updateUserApi } from "@/services/apiAuth";

export const useUpdateUser = () => {
  const { mutate: updateUser, isLoading:isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("Account successfully updated!");
    },
  });

  return { updateUser, isUpdating };
};
