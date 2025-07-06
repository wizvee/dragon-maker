import type { User } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useUsedFocus(profile?: User): UseQueryResult<number, Error> {
  return useQuery<number>({
    queryKey: ["used-focus", profile?.user_id],
    queryFn: async () => {
      if (!profile) throw new Error("profile 없음");

      const resetTime = profile.mp_reset_time;
      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      const startAt = new Date(`${todayStr}T${resetTime}`);
      const endAt = new Date(startAt);
      endAt.setDate(startAt.getDate() + 1);

      const { data: actions, error: actionsError } = await supabase
        .from("actions")
        .select("duration_minutes")
        .eq("user_id", profile.user_id)
        // .eq("status", "done")
        .gte("end_at", startAt.toISOString())
        .lt("end_at", endAt.toISOString());

      if (actionsError) throw actionsError;

      return actions.reduce(
        (sum, action) => sum + (action.duration_minutes ?? 0),
        0,
      );
    },
    enabled: !!profile,
  });
}
