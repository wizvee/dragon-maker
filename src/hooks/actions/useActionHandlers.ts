import { useNavigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import type { Action, UpdateActionInput } from "@/types/action";

import { useUpdateAction } from "./useUpdateAction";
import { useActiveAction } from "./useActiveAction";

export function useActionHandlers() {
  const user = useUser();
  const navigate = useNavigate();
  const updateAction = useUpdateAction();
  const { data: activeAction } = useActiveAction(user?.id);

  const handleStartAction = async (action: Action) => {
    if (!action || activeAction) return;
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
