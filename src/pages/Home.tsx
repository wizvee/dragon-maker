import Profile from "@/components/UserProfile";
import { useUserStats } from "@/hooks/useUserStats";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();
  const { data, error, isLoading } = useUserStats(user?.id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No user data found.</div>;
  }

  return (
    <div>
      <Profile data={data} />
    </div>
  );
}
