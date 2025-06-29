import { useLocation } from "react-router-dom";
import { DotsThree } from "@phosphor-icons/react";

export default function NavBar() {
  const location = useLocation();
  const title =
    location.pathname.split("/")[1].toLocaleUpperCase() || "DASHBOARD";

  return (
    <nav className="static flex h-16 flex-col items-center p-4 pt-5">
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
