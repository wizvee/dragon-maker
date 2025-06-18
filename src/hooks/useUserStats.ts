import type { User } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useUserStats(userId: string): UseQueryResult<User, Error> {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("name, level, focus_minutes")
        .single();

      if (profileError || !profile) throw profileError;

      const { data: stats, error: statsError } = await supabase
        .from("user_stats_with_level")
        .select("stat, level, xp, min_xp, max_xp");

      if (statsError) throw statsError;

      return {
        ...profile,
        stats,
      };
    },
  });
}
