import { FileNode } from "@/types/types";

interface WorkspacePathProps {
  nodePath: FileNode[];
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileNode | null>>;
}
export const WorkspacePath = ({
  nodePath,
  setCurrentFolderId,
  setSelectedFile,
}: WorkspacePathProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 mb-6 gap-3">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          Active Location Path
        </p>
        <div className="flex items-center flex-wrap gap-1 text-sm font-semibold text-slate-600">
          {nodePath.map((node, index) => {
            const isLast = index === nodePath.length - 1;
            return (
              <div key={node.id} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="text-slate-300 font-normal">/</span>
                )}
                <button
                  onClick={() => {
                    if (!isLast) {
                      setCurrentFolderId(node.id);
                      setSelectedFile(null); // Close active code viewer context
                    }
                  }}
                  disabled={isLast}
                  className={`
  transition-colors  max-w-27.5 sm:max-w-45 text-left
  ${isLast ? "text-blue-500 font-bold" : "text-slate-600 hover:text-slate-700 cursor-pointer"}
`}
                >
                  {node.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <button
          // onClick={() => handleCreateItem("folder")}
          className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-sm transition"
        >
          + New Folder
        </button>
        <button
          // onClick={() => handleCreateItem("file")}
          className="flex-1 sm:flex-none justify-center inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-semibold shadow-sm transition"
        >
          + New File
        </button>
      </div>
    </div>
  );
};
