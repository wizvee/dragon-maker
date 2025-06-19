import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EntityType } from "@/types/entity";
import { supabase } from "@/lib/supabase";

type UpdateEntityInput = {
  id: string;
  fields: Partial<{
    title: string;
    content: string;
    stat: string;
    type: EntityType;
    due_date: string | null;
    archived: boolean;
  }>;
};

export function useUpdateEntity() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateEntityInput>({
    mutationFn: async ({ id, fields }) => {
      const { error } = await supabase
        .from("entities")
        .update(fields)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["entity", variables.id],
      });
    },
  });
}
