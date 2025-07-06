import PixelTomatoTimer from "@/components/PixelTomatoTimer";
import { useAction } from "@/hooks/actions/useAction";
import { useParams } from "react-router-dom";

export default function ActionPage() {
  const { id } = useParams<{ id: string }>();
  const { data: action, isLoading } = useAction(id);

  if (isLoading || !action) return <div>loading...</div>;
  return <PixelTomatoTimer value={action} />;
}
