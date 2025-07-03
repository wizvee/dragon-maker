import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarBlank, PlusCircle, Timer } from "@phosphor-icons/react";

import { useEntity } from "@/hooks/entities/useEntity";
import ProgressBar from "@/components/common/ProgressBar";
import { useUpdateEntity } from "@/hooks/entities/useUpdateEntity";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data: entity, isLoading, error } = useEntity(id);

  const { mutateAsync: updateEntity } = useUpdateEntity();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  const handleTitleBlur = async () => {
    setIsEditing(false);
    if (entity && title !== entity.title && id) {
      await updateEntity({
        id,
        fields: { title },
      });
    }
  };

  useEffect(() => {
    if (entity) setTitle(entity.title);
  }, [entity]);

  if (!id) return "not found";
  if (isLoading) return <div>Loading...</div>;
  if (!entity) return <div>Entity not found.</div>;
  if (error) return <div>Failed to load entity.</div>;

  return (
    <div>
      {isEditing ? (
        <input
          className="m-0 mb-4 bg-transparent text-4xl font-bold focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          autoFocus
        />
      ) : (
        <h2 className="m-0 mb-6 cursor-pointer text-4xl font-bold">{title}</h2>
      )}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-center gap-0.5">
            <CalendarBlank
              size={16}
              weight="duotone"
              className="text-slate-400"
            />
            <span>{entity.start_date}</span>
            <span> - </span>
            <span>{entity.due_date}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Timer size={16} weight="duotone" className="text-slate-400" />
            <span>1h 50min</span>
          </div>
        </div>
        <div className="flex items-center">
          <ProgressBar value={70} colorClass="bg-chart-4" heightClass="h-4" />
          <span className="pl-4 text-xs">80%</span>
        </div>
      </div>
      <div className="my-4">
        <div className="flex items-center justify-between">
          <div className="my-3 font-bold">ACTIONS</div>
          <button className="hover:text-foreground cursor-pointer text-slate-400 transition-colors duration-300">
            <PlusCircle size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
