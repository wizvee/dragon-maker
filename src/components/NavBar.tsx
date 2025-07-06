import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "@supabase/auth-helpers-react";
import { useActiveAction } from "@/hooks/actions/useActiveAction";
import { DotsThree, ExclamationMark, House } from "@phosphor-icons/react";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const title =
    location.pathname.split("/")[1].toLocaleUpperCase() || "DASHBOARD";

  const user = useUser();
  const { data: action } = useActiveAction(user?.id);

  const startAt = new Date(action?.start_at + "Z").getTime();
  const [seconds, setSeconds] = useState(() =>
    Math.floor((Date.now() - startAt) / 1000),
  );

  useEffect(() => {
    if (!action) return;

    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [action, startAt]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <nav className="static flex flex-col p-4">
      <div className="flex items-center justify-between">
        <button
          className="bg-background/70 hover:bg-background cursor-pointer rounded-full p-1 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          <House size={16} />
        </button>
        <h1 className="text-background text-2xl font-bold tracking-wide">
          {title}
        </h1>
        <button className="bg-background/70 hover:bg-background cursor-pointer rounded-full p-1 transition-colors duration-300">
          <DotsThree size={16} />
        </button>
      </div>
      {action && (
        <div
          className="bg-background/70 mt-4 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2"
          onClick={() => navigate(`/action/${action.id}`)}
        >
          <div className="flex items-center gap-2">
            <ExclamationMark
              size={16}
              weight="fill"
              className="animate-pulse-sparkle text-[#9fc98f]"
            />
            <span className="text-sm">{action.text}</span>
          </div>
          <span className="text-sm">
            {mm} : {ss}
          </span>
        </div>
      )}
    </nav>
  );
}
