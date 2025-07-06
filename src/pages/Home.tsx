import { Link } from "react-router-dom";
import { Lightning } from "@phosphor-icons/react";
import { useUser } from "@supabase/auth-helpers-react";

import type { Stat } from "@/types/user";
import { statMeta } from "@/constants/statMeta";
import { useStats } from "@/hooks/stats/useStats";
import { useUsedFocus } from "@/hooks/useUsedFocus";
import { useUserDetail } from "@/hooks/useUserDetail";
import { useActionHandlers } from "@/hooks/actions/useActionHandlers";
import { useActiveActions } from "@/hooks/actions/useActiveActions";

import ActionList from "@/components/actions/ActionList";
import ProgressBar from "@/components/common/ProgressBar";

function MpBar({
  usedFocus,
  focusMinutes,
}: {
  usedFocus: number;
  focusMinutes: number;
}) {
  const remainingMp = focusMinutes - usedFocus;
  const mpProgress = (remainingMp / focusMinutes) * 100;
  return (
    <div className="mb-4 rounded-xl border border-slate-400/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1 font-bold">
          <Lightning size={20} weight="fill" className="text-chart-4" />
          MP
        </div>
        <div className="text-sm font-semibold">
          {remainingMp} / {focusMinutes}
        </div>
      </div>
      <ProgressBar value={mpProgress} colorClass="bg-chart-4" />
    </div>
  );
}

function StatsList({ stats }: { stats: Stat[] }) {
  return (
    <div className="mb-6 rounded-xl border border-slate-400/50 bg-slate-100/50 p-4">
      <h3 className="mb-3 font-bold">STATS</h3>
      <div className="space-y-1">
        {stats.map((stat) => {
          const meta = statMeta[stat.stat];
          const percent =
            stat.max_xp > stat.min_xp
              ? ((stat.xp - stat.min_xp) / (stat.max_xp - stat.min_xp)) * 100
              : 0;
          return (
            <Link to={`/stat/${stat.stat}`} key={stat.stat}>
              <div className="flex items-center gap-2 py-1.5">
                <span className="flex w-20 items-center text-sm">
                  {meta.label}
                  <span
                    className={`ml-2 rounded-sm p-1 font-mono text-[8px] ${meta.background}`}
                  >
                    Lv.{stat.level}
                  </span>
                </span>
                <ProgressBar value={percent} colorClass={meta.color} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const user = useUser();
  const userId = user?.id || "";

  const { data: userDetail, isLoading: loadingUser } = useUserDetail(userId);
  const { data: stats, isLoading: loadingStats } = useStats(userId);
  const { data: usedFocus } = useUsedFocus(userDetail);

  const { data: todayActions } = useActiveActions(userId);
  const { handleStartAction, handleUpdateAction } = useActionHandlers();

  if (loadingUser || loadingStats) return <div>Loading...</div>;
  if (!userDetail || !stats) return <div>No user data found.</div>;

  return (
    <div>
      <MpBar
        usedFocus={usedFocus || 0}
        focusMinutes={userDetail.focus_minutes}
      />
      <div className="mb-4 rounded-xl border border-slate-400 p-4">
        <h2 className="mb-3 font-bold">TODAY’S TASKS</h2>
        <ActionList
          actions={todayActions || []}
          onStart={handleStartAction}
          onUpdate={handleUpdateAction}
        />
      </div>
      <StatsList stats={stats} />
    </div>
  );
}
