import { supabase } from "@/lib/supabase";
import type { Action } from "@/types/action";
import { useQuery } from "@tanstack/react-query";

export function useActiveAction(userId?: string) {
  return useQuery<Action>({
    queryKey: ["active-action", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return Promise.reject(new Error("No userId provided"));
      const { data, error } = await supabase
        .from("actions")
        .select("*, entities(stat)")
        .eq("user_id", userId)
        .is("end_at", null)
        .not("start_at", "is", null)
        .single();

      if (error) throw error;
      if (!data) throw new Error("No data returned");
      return data;
    },
  });
}
