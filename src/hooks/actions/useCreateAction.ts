import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateActionInput = {
  userId: string;
  entityId: string;
};

type ActionRow = {
  id: string;
  text: string;
};

export function useCreateAction() {
  const queryClient = useQueryClient();

  return useMutation<ActionRow, Error, CreateActionInput>({
    mutationFn: async ({ userId, entityId }: CreateActionInput) => {
      const { data, error } = await supabase
        .from("actions")
        .insert([{ user_id: userId, entity_id: entityId, text: "New action" }])
        .select("id, text");
      if (error || !data) throw error;
      return data[0];
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
