import { Link } from "react-router-dom";
import type { Stat, User } from "@/types/user";
import { Lightning } from "@phosphor-icons/react";

import { statMeta } from "@/constants/statMeta";
import ProgressBar from "./common/ProgressBar";

interface ProfileProps {
  user: User;
  stats: Stat[];
  usedFocus: number;
}

export default function UserProfile({ user, stats, usedFocus }: ProfileProps) {
  const remainingMp = user.focus_minutes - usedFocus;
  const mpProgress = (remainingMp / user.focus_minutes) * 100;

  return (
    <div>
      {/* MP Bar */}
      <div className="mb-4 rounded-xl border border-slate-400 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold">
            <Lightning size={20} weight="fill" className="text-chart-4" />
            MP
          </div>
          <div className="text-sm font-semibold">
            {remainingMp} / {user.focus_minutes}
          </div>
        </div>
        <ProgressBar value={mpProgress} colorClass="bg-chart-4" />
      </div>

      <div className="mb-4 rounded-xl border border-[#22304a] bg-white p-5">
        <h2 className="mb-3 text-lg font-bold text-[#22304a]">TODAY’S TASKS</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full border-2 border-[#22304a]"></span>
            <span>Read for 15 minutes</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full border-2 border-[#22304a]"></span>
            <span>Meditate</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full border-2 border-[#22304a]"></span>
            <span>Go to the gym</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#22304a]">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C7 2 2 7 2 12c0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  fill="#22304a"
                />
              </svg>
            </span>
            <span>Eat a healthy breakfast</span>
          </li>
        </ul>
      </div>

      {/* Stats */}
      <div className="mb-6 rounded-xl border border-slate-400 bg-slate-100/50 p-4">
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
    </div>
  );
}
