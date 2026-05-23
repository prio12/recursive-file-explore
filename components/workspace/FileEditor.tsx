import { FileNode } from "@/types/types";

interface FileEditorProps {
  selectedFile: FileNode | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileNode | null>>;
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  handleSaveFile: () => void;
}

export const FileEditor = ({
  selectedFile,
  setSelectedFile,
  editorContent,
  setEditorContent,
  handleSaveFile,
}: FileEditorProps) => {
  if (!selectedFile) return null;

  return (
    <section className="fixed lg:static top-0 bottom-0 right-0 z-40 w-full sm:w-80 bg-white border-l border-slate-200 shadow-2xl lg:shadow-none flex flex-col p-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="truncate pr-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            File Workspace
          </p>
          <h3 className="text-sm font-bold text-slate-700 truncate">
            {selectedFile.name}
          </h3>
        </div>

        <button
          onClick={() => setSelectedFile(null)}
          className="text-slate-400 hover:text-slate-600 text-lg font-medium p-1"
        >
          ✕
        </button>
      </div>

      <textarea
        className="flex-1 w-full p-3 border border-slate-200 rounded-lg text-xs bg-slate-50 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
        placeholder="Enter your custom content string structure details here..."
      />

      <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
        <button
          onClick={handleSaveFile}
          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
};
