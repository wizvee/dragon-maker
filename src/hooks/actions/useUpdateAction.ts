import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateActionInput = {
  stat: string;
  userId: string;
  entityId: string;
  actionId: string;
  updates: Partial<{
    status: "pending" | "done" | "canceled";
    text: string;
    due_date: string; // 'YYYY-MM-DD'
    due_time: string; // 'HH:MM:SS'
    start_at: string; // ISO 형식
    end_at: string;
  }>;
};

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
    },
  });
}
