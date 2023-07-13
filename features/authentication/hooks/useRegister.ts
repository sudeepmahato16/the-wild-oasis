import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUser } from "@/services/apiAuth";

export const useRegister = () => {
  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success(
        "Account successfully created!"
      );
    },
  });

  return { registerUser, isLoading };
};
