import { useNavigate, useParams } from "react-router-dom";

import { useAction } from "@/hooks/actions/useAction";
import { useUpdateAction } from "@/hooks/actions/useUpdateAction";

import PixelTomatoTimer from "@/components/PixelTomatoTimer";

export default function ActionPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: action, isLoading } = useAction(id);

  const updateAction = useUpdateAction();
  const handleEndAction = async () => {
    if (!id || !action) return;
    await updateAction.mutateAsync({
      stat: action.stat,
      userId: action.user_id,
      entityId: action.entity_id,
      actionId: action.id,
      updates: { end_at: new Date().toISOString() },
    });
    // navigate(`/project/${action.entity_id}`);
    navigate("/");
  };

  if (isLoading || !action) return <div>loading...</div>;
  return <PixelTomatoTimer action={action} onEnd={handleEndAction} />;
}
