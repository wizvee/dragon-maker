import { useLocation } from "react-router-dom";
import CreateDialog from "./CreateDialog";
import { statMeta } from "@/constants/statMeta";

export default function NavBar() {
  const location = useLocation();

  let title = "DASHBOARD";
  const statMatch = location.pathname.match(/^\/stat\/([^/]+)/);
  if (statMatch) {
    title = statMeta[statMatch[1]]?.label || statMatch[1].toUpperCase();
  }

  return (
    <nav className="p-4">
      <div className="flex h-16 flex-col items-center justify-center">
        <div className="self-end">
          <button className="bg-background/70 hover:bg-background cursor-pointer rounded-full p-1 transition-colors duration-300">
            <CreateDialog />
          </button>
        </div>
        <h1 className="text-background text-2xl font-bold tracking-wide">
          {title}
        </h1>
      </div>
    </nav>
  );
}
