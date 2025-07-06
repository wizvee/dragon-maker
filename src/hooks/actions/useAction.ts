import { supabase } from "@/lib/supabase";
import type { Action } from "@/types/action";
import { useQuery } from "@tanstack/react-query";

export function useAction(id?: string) {
  return useQuery<Action>({
    queryKey: ["action", id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return Promise.reject(new Error("No id provided"));
      const { data, error } = await supabase
        .from("actions")
        .select("*, entities(stat)")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("No data returned");
      return data;
    },
  });
}
