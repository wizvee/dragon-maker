import CreateDialog from "./CreateDialog";

export default function NavBar() {
  return (
    <nav className="bg-muted fixed bottom-0 z-50 w-full md:top-0 md:bottom-auto">
      <div className="mx-auto flex items-center justify-center p-2">
        <CreateDialog />
      </div>
    </nav>
  );
}
