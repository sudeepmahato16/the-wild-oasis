import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "@/services/apiSettings";
import { toast } from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings successfully updated");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettings };
};
