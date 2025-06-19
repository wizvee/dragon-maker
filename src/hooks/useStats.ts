import type { Stat } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useStats(userId: string): UseQueryResult<Stat[], Error> {
  return useQuery<Stat[]>({
    queryKey: ["stats", userId],
    queryFn: async () => {
      const { data: stats, error: statsError } = await supabase
        .from("user_stats_with_level")
        .select("id, stat, level, xp, min_xp, max_xp")
        .eq("user_id", userId);
      if (statsError) throw statsError;
      return stats;
    },
  });
}
