import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionInput = {
  id: string;
  userId: string;
  entityId: string;
};

export function useEndAction() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ActionInput>({
    mutationFn: async ({ id }) => {
      const { error } = await supabase
        .from("actions")
        .update({ end_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["actions", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["actions", "byEntity", variables.entityId, variables.userId],
      });
    },
  });
}
