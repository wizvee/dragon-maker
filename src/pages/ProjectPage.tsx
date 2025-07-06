import { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "@supabase/auth-helpers-react";
import { CalendarBlank, PlusCircle, Timer } from "@phosphor-icons/react";

import type { Action } from "@/types/action";
import { useEntity } from "@/hooks/entities/useEntity";
import { useStartAction } from "@/hooks/actions/useStartAction";
import { useCreateAction } from "@/hooks/actions/useCreateAction";
import { useUpdateEntity } from "@/hooks/entities/useUpdateEntity";
import { useActionsByEntity } from "@/hooks/actions/useActionsByEntity";

import { Checkbox } from "@/components/ui/checkbox";
import ProgressBar from "@/components/common/ProgressBar";

type ActionListProps = {
  actions: Action[];
  onStart: (actionId: string) => Promise<void>;
};

const ActionList = memo(({ actions, onStart }: ActionListProps) => (
  <ul className="space-y-2">
    {actions?.map((action) => (
      <ActionListItem key={action.id} action={action} onStart={onStart} />
    ))}
  </ul>
));

type ActionListItemProps = {
  action: Action;
  onStart: (actionId: string) => Promise<void>;
};

const ActionListItem = memo(({ action, onStart }: ActionListItemProps) => (
  <li
    className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-100/50"
    onClick={() => onStart(action.id)}
  >
    <Checkbox />
    <div className="flex-1 text-sm">{action.text}</div>
  </li>
));

export default function ProjectPage() {
  const user = useUser();
  const { id } = useParams<{ id: string }>();
  const { data: entity, isLoading: loadingEntity } = useEntity(id);
  const { data: actions } = useActionsByEntity(id || "", user?.id || "");
  const { mutateAsync: updateEntity } = useUpdateEntity();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const startAction = useStartAction();
  const createAction = useCreateAction();

  useEffect(() => {
    if (entity) setTitle(entity.title);
  }, [entity]);

  const handleTitleBlur = async () => {
    setIsEditing(false);
    if (entity && title !== entity.title && id) {
      await updateEntity({
        id,
        fields: { title },
      });
    }
  };

  const handleCreateAction = () => {
    if (!user?.id || !id) return;
    createAction.mutate({
      userId: user.id,
      entityId: id,
    });
  };

  const handleStartAction = async (actionId: string) => {
    if (!user?.id || !id) return;
    await startAction.mutateAsync({
      id: actionId,
      userId: user.id,
      entityId: id,
    });
    navigate(`/action/${actionId}`);
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
        <h2
          className="m-0 mb-6 cursor-pointer text-4xl font-bold"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
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
            onClick={handleCreateAction}
          >
            <PlusCircle size={20} weight="fill" />
          </button>
        </div>
        <ActionList actions={actions || []} onStart={handleStartAction} />
      </div>
    </div>
  );
}
