import { useStats } from "@/hooks/stats/useStats";
import { useUserDetail } from "@/hooks/useUserDetail";
import { useUser } from "@supabase/auth-helpers-react";

import Profile from "@/components/UserProfile";

export default function Home() {
  const user = useUser();
  const { data: userDetail, isLoading: loadingUser } = useUserDetail(
    user?.id || "",
  );
  const { data: stats, isLoading: loadingStats } = useStats(user?.id || "");

  if (loadingUser || loadingStats) {
    return <div>Loading...</div>;
  }
  if (!userDetail || !stats) {
    return <div>No user data found.</div>;
  }

  return (
    <div>
      <Profile user={userDetail} stats={stats} />
    </div>
  );
}
