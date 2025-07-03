import { supabase } from "@/lib/supabase";
import type { Entity } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export function useEntitiesByStat(stat: string, userId: string) {
  return useQuery<Entity[]>({
    queryKey: ["entities", "byStat", stat, userId],
    enabled: !!stat && !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("entities")
        .select("*")
        .eq("stat", stat)
        .eq("user_id", userId)
        .eq("archived", false);

      if (error) throw error;
      return data;
    },
  });
}
