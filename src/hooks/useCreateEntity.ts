import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EntityType } from "@/types/entity";
import { supabase } from "@/lib/supabase";

type CreateEntityInput = {
  entityType: EntityType;
  userId: string;
  stat: string;
};

type EntityRow = {
  id: string;
};

export function useCreateEntity() {
  const queryClient = useQueryClient();

  return useMutation<EntityRow, Error, CreateEntityInput>({
    mutationFn: async ({ userId, entityType, stat }: CreateEntityInput) => {
      const { data, error } = await supabase
        .from("entities")
        .insert([
          {
            user_id: userId,
            stat,
            type: entityType,
            title: `New ${entityType}`,
          },
        ])
        .select("id");
      if (error || !data) throw error;
      return data[0];
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["entities", variables.userId],
      });
    },
  });
}
