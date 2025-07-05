import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarBlank, PlusCircle, Timer } from "@phosphor-icons/react";

import { useUser } from "@supabase/auth-helpers-react";
import { useEntity } from "@/hooks/entities/useEntity";
import ProgressBar from "@/components/common/ProgressBar";
import { useUpdateEntity } from "@/hooks/entities/useUpdateEntity";
import { useCreateAction } from "@/hooks/actions/useCreateAction";
import { useActionsByEntity } from "@/hooks/actions/useActionsByEntity";

export default function ProjectPage() {
  const user = useUser();
  const { id } = useParams<{ id: string }>();
  const { data: entity, isLoading: loadingEntity } = useEntity(id);
  const { data: actions } = useActionsByEntity(id || "", user?.id || "");

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

  const createAction = useCreateAction();

  const handleCreateAction = () => {
    if (!user?.id || !id) return;
    createAction.mutate({
      userId: user.id,
      entityId: id,
    });
  };

  if (!id) return "not found";
  if (loadingEntity) return <div>Loading...</div>;
  if (!entity) return <div>Entity not found.</div>;

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
          <button
            className="hover:text-foreground cursor-pointer text-slate-400 transition-colors duration-300"
            onClick={() => handleCreateAction()}
          >
            <PlusCircle size={20} weight="fill" />
          </button>
        </div>
        <ul>
          {actions?.map((action) => <li key={action.id}>{action.text}</li>)}
        </ul>
      </div>
    </div>
  );
}
