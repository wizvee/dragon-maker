import type { User } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useUserDetail(userId: string): UseQueryResult<User, Error> {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("name, level, focus_minutes")
        .single();

      if (profileError || !profile) throw profileError;
      return profile;
    },
  });
}
