import { Folder, Menu } from "lucide-react";

interface NavbarItemProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onResetStorage: () => void;
}

export const Navbar = ({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  onResetStorage,
}: NavbarItemProps) => {
  return (
    <header className="flex items-center justify-between h-14 px-4 md:px-6 bg-white border-b border-slate-200 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-1.5 hover:bg-slate-100 rounded-md md:hidden text-slate-600 transition"
          aria-label="Toggle directory menu"
        >
          <Menu />
        </button>

        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-500 fill-blue-500" />

          <h1 className="font-bold text-slate-900 tracking-tight text-sm md:text-base">
            Mini File Explorer
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetStorage}
          className="text-[10px] bg-red-50 cursor-pointer hover:bg-red-100 text-red-600 border border-red-100 px-2 py-1 rounded-md font-medium transition"
        >
          Reset Data
        </button>

        <div className="text-[10px] md:text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-md font-medium">
          Storage Engine Active
        </div>
      </div>
    </header>
  );
};
