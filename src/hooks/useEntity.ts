import { useQuery } from "@tanstack/react-query";
import type { Entity } from "@/types/entity";
import { supabase } from "@/lib/supabase";

export function useEntity(id?: string) {
  return useQuery<Entity>({
    queryKey: ["entity", id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return Promise.reject(new Error("No id provided"));

      const { data, error } = await supabase
        .from("entities")
        .select("id, title, stat, type, content, due_date, archived")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return data;
    },
  });
}
