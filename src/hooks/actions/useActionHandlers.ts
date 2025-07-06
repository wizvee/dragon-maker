import { useNavigate } from "react-router-dom";
import { useUpdateAction } from "./useUpdateAction";
import type { Action, UpdateActionInput } from "@/types/action";

export function useActionHandlers() {
  const navigate = useNavigate();
  const updateAction = useUpdateAction();

  const handleStartAction = async (action: Action) => {
    if (!action) return;
    if (action.status === "done") return;
    await updateAction.mutateAsync({
      stat: action.stat,
      userId: action.user_id,
      entityId: action.entity_id,
      actionId: action.id,
      updates: { start_at: new Date().toISOString(), end_at: null },
    });
    navigate(`/action/${action.id}`);
  };

  const handleUpdateAction = async (
    action: Action,
    fields: UpdateActionInput["updates"],
  ) => {
    if (!action) return;
    await updateAction.mutateAsync({
      stat: action.stat,
      userId: action.user_id,
      entityId: action.entity_id,
      actionId: action.id,
      updates: fields,
    });
  };

  return { handleStartAction, handleUpdateAction };
}
