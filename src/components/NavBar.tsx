import { useLocation } from "react-router-dom";
import { statMeta } from "@/constants/statMeta";
import { DotsThree } from "@phosphor-icons/react";

export default function NavBar() {
  const location = useLocation();

  let title = "DASHBOARD";
  const statMatch = location.pathname.match(/^\/stat\/([^/]+)/);
  if (statMatch) {
    title = statMeta[statMatch[1]]?.label || statMatch[1].toUpperCase();
  }
  const isDashboard = location.pathname === "/";

  return (
    <nav
      className={`static flex h-24 flex-col items-center p-4 ${isDashboard ? "justify-center" : "pt-5"}`}
    >
      <div className="absolute self-end">
        <button className="bg-background/70 hover:bg-background cursor-pointer rounded-full p-1 transition-colors duration-300">
          <DotsThree size={16} />
        </button>
      </div>
      <h1 className="text-background text-2xl font-bold tracking-wide">
        {title}
      </h1>
    </nav>
  );
}
