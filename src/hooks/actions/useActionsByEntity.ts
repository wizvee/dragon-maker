import { supabase } from "@/lib/supabase";
import { type Action } from "@/types/action";
import { useQuery } from "@tanstack/react-query";

export function useActionsByEntity(entityId: string, userId: string) {
  return useQuery<Action[]>({
    queryKey: ["actions", "byEntity", entityId, userId],
    enabled: !!entityId && !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("actions")
        .select("*")
        .eq("entity_id", entityId)
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
  });
}
