import type { Stat } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useStatDetail(stat: string, userId: string) {
  return useQuery<Stat>({
    queryKey: ["stat", stat, userId],
    enabled: !!stat && !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_stats_with_level")
        .select("id, stat, level, xp, min_xp, max_xp")
        .eq("stat", stat)
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data;
    },
  });
}
