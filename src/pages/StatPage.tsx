import {
  BookOpen,
  CalendarBlank,
  CheckSquare,
  PlusCircle,
  Square,
  Timer,
} from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";

import { statMeta } from "@/constants/statMeta";
import { useStatDetail } from "@/hooks/stats/useStatDetail";
import { useCreateEntity } from "@/hooks/entities/useCreateEntity";
import { useEntitiesByStat } from "@/hooks/entities/useEntitiesByStat";
import { ENTITY_TYPES, type Entity, type EntityType } from "@/types/entity";

import ProgressBar from "@/components/common/ProgressBar";

type EntitySectionProps = {
  title: string;
  entities?: Entity[];
  entityType: EntityType;
  onCreate: (type: EntityType) => void;
  renderItem: (entity: Entity) => React.ReactNode;
};

function EntitySection({
  title,
  entities,
  entityType,
  onCreate,
  renderItem,
}: EntitySectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="my-3 font-bold">{title}</div>
        <button
          className="hover:text-foreground cursor-pointer text-slate-400 transition-colors duration-300"
          onClick={() => onCreate(entityType)}
        >
          <PlusCircle size={20} weight="fill" />
        </button>
      </div>
      <ul className="mb-4 space-y-3">{entities?.map(renderItem)}</ul>
    </div>
  );
}

export default function StatPage() {
  const user = useUser();
  const { statName } = useParams<{ statName: string }>();

  const { data: statDetail, isLoading: loadingStat } = useStatDetail(
    statName || "",
    user?.id || "",
  );
  const { data: entities, isLoading: loadingEntities } = useEntitiesByStat(
    statName || "",
    user?.id || "",
  );
  const createEntity = useCreateEntity();

  if (!user || !statDetail) {
    return <div className="p-6">해당 스탯 정보를 찾을 수 없습니다.</div>;
  }

  if (loadingStat || loadingEntities) {
    return <div className="p-6">로딩중...</div>;
  }

  const meta = statMeta[statDetail.stat];
  const percent =
    statDetail.max_xp > statDetail.min_xp
      ? ((statDetail.xp - statDetail.min_xp) /
          (statDetail.max_xp - statDetail.min_xp)) *
        100
      : 0;

  const handleCreateEntity = (type: EntityType) => {
    if (!user?.id || !statDetail?.stat) return;
    createEntity.mutate({
      userId: user.id,
      stat: statDetail.stat,
      entityType: type,
    });
  };

  // 프로젝트 렌더 함수
  const renderProject = (project: Entity) => (
    <Link to={`/project/${project.id}`} key={project.id} className="block">
      <li className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-400/50 p-3 transition-colors duration-300 hover:bg-slate-100/50">
        <div className="self-start text-slate-400/80">
          {project.completion_date ? (
            <CheckSquare size={24} weight="fill" />
          ) : (
            <Square size={24} weight="fill" />
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <span className="text-sm">{project.title}</span>
          <div className="flex gap-1.5 text-xs">
            <div className="flex items-center gap-0.5">
              <CalendarBlank
                size={14}
                weight="duotone"
                className="text-slate-400"
              />
              <span>{project.start_date}</span>
              <span> - </span>
              <span>{project.due_date}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Timer size={14} weight="duotone" className="text-slate-400" />
              <span>1h 50min</span>
            </div>
          </div>
          <div className="flex items-center">
            <ProgressBar value={70} heightClass="h-2" />
            <span className="pl-4 text-xs">80%</span>
          </div>
        </div>
      </li>
    </Link>
  );

  return (
    <div>
      {/* Level & Progress */}
      <div className="mb-4 flex flex-col gap-2 rounded-xl border border-slate-400 p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <BookOpen size={20} weight="fill" className={meta.textColor} />
            <span className="font-bold">{meta.label} </span>
            <span className="text-sm font-semibold">LV.{statDetail.level}</span>
          </span>
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

      {/* Projects */}
      <EntitySection
        title="PROJECTS"
        entities={entities?.filter(({ type }) => type === ENTITY_TYPES.PROJECT)}
        entityType={ENTITY_TYPES.PROJECT}
        onCreate={handleCreateEntity}
        renderItem={renderProject}
      />

      {/* Areas */}
      <EntitySection
        title="AREAS"
        entities={[]} // 실제 데이터로 교체 필요
        entityType={ENTITY_TYPES.AREA}
        onCreate={handleCreateEntity}
        renderItem={() => null} // 실제 렌더 함수로 교체 필요
      />

      {/* Resources */}
      <EntitySection
        title="RESOURCES"
        entities={[]} // 실제 데이터로 교체 필요
        entityType={ENTITY_TYPES.RESOURCE}
        onCreate={handleCreateEntity}
        renderItem={() => null} // 실제 렌더 함수로 교체 필요
      />
    </div>
  );
}
