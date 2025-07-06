import { supabase } from "@/lib/supabase";
import type { Action } from "@/types/action";
import { useQuery } from "@tanstack/react-query";

export function useActiveActions(userId?: string) {
  return useQuery<Action[]>({
    queryKey: ["active-actions", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return Promise.reject(new Error("No userId provided"));
      const { data, error } = await supabase
        .from("actions")
        .select("*, entities(stat)")
        .eq("user_id", userId)
        .neq("status", "done");

      if (error) throw error;
      if (!data) throw new Error("No data returned");
      return data;
    },
  });
}
