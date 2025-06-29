import { useParams } from "react-router-dom";
import { PlusCircle } from "@phosphor-icons/react";

import { statMeta } from "@/constants/statMeta";
import { useUser } from "@supabase/auth-helpers-react";
import ProgressBar from "@/components/common/ProgressBar";
import { useStatDetail } from "@/hooks/useStatDetail";
// import { useEntitiesByStat } from "@/hooks/useEntitiesByStat";

export default function StatPage() {
  const user = useUser();
  const { statName } = useParams<{ statName: string }>();

  const { data: statDetail, isLoading: loadingStat } = useStatDetail(
    statName || "",
    user?.id || "",
  );

  // const { data: entities, isLoading: loadingEntities } = useEntitiesByStat(
  //   statName,
  //   user?.id ?? "",
  // );

  if (!user || !statDetail) {
    return <div className="p-6">해당 스탯 정보를 찾을 수 없습니다.</div>;
  }

  if (loadingStat) return <div className="p-6">로딩중...</div>;

  const meta = statMeta[statDetail.stat];
  const percent =
    statDetail.max_xp > statDetail.min_xp
      ? ((statDetail.xp - statDetail.min_xp) /
          (statDetail.max_xp - statDetail.min_xp)) *
        100
      : 0;

  return (
    <div>
      {/* Level & Progress */}
      <div className="-mt-12 px-6">
        <div className="bg-background mb-4 flex flex-col gap-2 rounded-xl border border-slate-400 p-4">
          <div className="flex items-center justify-between">
            <span className="font-bold">LEVEL {statDetail.level}</span>
            <span className="text-sm font-semibold">
              {statDetail.xp - statDetail.min_xp} /{" "}
              {statDetail.max_xp - statDetail.min_xp}
            </span>
          </div>
          <ProgressBar
            value={percent}
            colorClass={meta.color}
            heightClass="h-4"
          />
        </div>
      </div>

      {/* Projects */}
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="mt-2 mb-2 font-bold">PROJECTS</div>
          <div className="hover:text-foreground cursor-pointer text-slate-400 transition-colors duration-300">
            <PlusCircle size={20} weight="fill" />
          </div>
        </div>
        <ul className="mb-4 space-y-2">
          {/* {projects.map((project, i) => (
            <li key={i} className="flex items-center gap-2">
              {project.checked ? (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded border-2 border-[#22304a] bg-[#eaf3fd]">
                  <svg wstatNameth="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="2"
                      y="2"
                      wstatNameth="16"
                      height="16"
                      rx="4"
                      fill="#eaf3fd"
                    />
                    <path
                      d="M6 10.5l3 3 5-5"
                      stroke="#22304a"
                      strokeWstatNameth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded border-2 border-[#22304a] bg-white">
                  {project.icon}
                </span>
              )}
              <span>{project.name}</span>
            </li>
          ))} */}
        </ul>

        {/* Areas */}
        <div className="flex items-center justify-between">
          <div className="mt-2 mb-2 font-bold">AREAS</div>
          <div className="hover:text-foreground cursor-pointer text-slate-400 transition-colors duration-300">
            <PlusCircle size={20} weight="fill" />
          </div>
        </div>
        <ul className="mb-4 space-y-2">
          {/* {areas.map((area, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center">
                {area.icon}
              </span>
              <span>{area.name}</span>
            </li>
          ))} */}
        </ul>

        {/* Resources */}
        <div className="flex items-center justify-between">
          <div className="mt-2 mb-2 font-bold">RESOURCES</div>
          <div className="hover:text-foreground cursor-pointer text-slate-400 transition-colors duration-300">
            <PlusCircle size={20} weight="fill" />
          </div>
        </div>
        <ul className="mb-4 space-y-2">
          {/* {areas.map((area, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center">
                {area.icon}
              </span>
              <span>{area.name}</span>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
