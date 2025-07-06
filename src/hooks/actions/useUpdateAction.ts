import { supabase } from "@/lib/supabase";
import type { UpdateActionInput } from "@/types/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAction() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateActionInput>({
    mutationFn: async ({ actionId, updates }) => {
      const { error } = await supabase
        .from("actions")
        .update(updates)
        .eq("id", actionId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["stats", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["used-focus", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["entity", variables.entityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["entities", "byStat", variables.stat, variables.entityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["actions", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["actions", "byEntity", variables.entityId, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-action", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-actions", variables.userId],
      });
    },
  });
}
