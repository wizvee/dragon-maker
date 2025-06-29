import CreateDialog from "./CreateDialog";

export default function NavBar() {
  return (
    <nav className="p-4">
      <div className="flex h-16 flex-col items-center justify-center">
        <div className="self-end">
          <button className="rounded-full bg-[#22304a] p-1 hover:bg-[#1a2234]">
            <CreateDialog />
          </button>
        </div>
        <h1 className="text-background text-2xl font-bold tracking-wide">
          DASHBOARD
        </h1>
      </div>
    </nav>
  );
}
