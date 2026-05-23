import { FileNode } from "@/types/types";
import { File, Folder, Pencil, Trash } from "lucide-react";

interface FolderContentsProps {
  activeFolder: FileNode;
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  handleOpenFile: (file: FileNode) => void;
  onRenameItem: (id: string, currentName: string) => void;
  onDeleteItem: (id: string) => void;
}

export const FolderContents = ({
  activeFolder,
  setCurrentFolderId,
  handleOpenFile,
  onRenameItem,
  onDeleteItem,
}: FolderContentsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {activeFolder.children?.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            item.type === "folder"
              ? setCurrentFolderId(item.id)
              : handleOpenFile(item)
          }
          className="group relative flex flex-col items-center justify-center p-5 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-200 transition-all cursor-pointer text-center select-none"
        >
          <div className="mb-3 text-slate-400 transition-transform group-hover:scale-105 duration-200">
            {item.type === "folder" ? (
              <Folder className="w-10 h-10 text-blue-500 fill-blue-500/10" />
            ) : (
              <File className="w-10 h-10 text-slate-400" />
            )}
          </div>

          <span
            className="text-xs font-semibold text-slate-700 w-full px-2 "
            title={item.name}
          >
            {item.name}
          </span>

          <div
            className="absolute top-2 right-2 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onRenameItem(item.id, item.name)}
              className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 
              active:bg-slate-200 rounded-md transition border border-slate-200/60 shadow-sm cursor-pointer"
              title="Rename"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDeleteItem(item.id)}
              className="p-1 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600
               active:bg-red-200 rounded-md transition border border-red-100 shadow-sm cursor-pointer"
              title="Delete"
            >
              <Trash className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}

      {(!activeFolder.children || activeFolder.children.length === 0) && (
        <div className="col-span-full py-16 text-center text-xs text-slate-400 font-medium">
          This directory path is currently empty.
        </div>
      )}
    </div>
  );
};
