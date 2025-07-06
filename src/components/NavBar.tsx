import { useLocation, useNavigate } from "react-router-dom";
import { DotsThree, House } from "@phosphor-icons/react";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const title =
    location.pathname.split("/")[1].toLocaleUpperCase() || "DASHBOARD";

  return (
    <nav className="static flex h-16 items-center justify-between p-4 pt-5">
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
    </nav>
  );
}
