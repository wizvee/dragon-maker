import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return "not found";

  return <div>{id}</div>;
}
