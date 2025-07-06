import type { User } from "@/types/user";
import { supabase } from "@/lib/supabase";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useUserDetail(userId: string): UseQueryResult<User, Error> {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) throw new Error("userId 없음");
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .single();
      if (profileError || !profile) throw profileError;
      return profile;
    },
  });
}
