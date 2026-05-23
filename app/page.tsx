"use client";
import { Navbar } from "@/components/Navbar";
import { FileNode } from "@/types/types";
import { useEffect, useState } from "react";
import { initialFileSystem } from "../mockData";
import { findNodeById } from "@/utils/fileUtils";
import SidebarItem from "@/components/SidebarItem";
import { Folder, File, Pencil, Trash } from "lucide-react";

export default function Home() {
  // Initializing the file tree state with injected dummy data
  const [fileTree, setFileTree] = useState<FileNode[]>(initialFileSystem);

  // Ensures client-only code/localStorage runs only after the initial mount
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Tracks the active folder ID, starting at "root" from dummy data and updating based on user clicks
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  //tracks the selected file , initialized with null
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  //Handle initial data load safely on client mount
  useEffect(() => {
    setHasMounted(true);
    const savedTree = localStorage.getItem("file_tree");
    if (savedTree) {
      try {
        setFileTree(JSON.parse(savedTree));
      } catch (e) {
        console.error(
          "Failed to parse saved file tree structures from localStorage:",
          e,
        );
      }
    }
  }, []);

  //Sync state updates to local storage automatically, but only after the component has
  // mounted
  useEffect(() => {
    if (!hasMounted) return;
    localStorage.setItem("file_tree", JSON.stringify(fileTree));
  }, [fileTree, hasMounted]);

  // Tracks which folder is clicked by the user to update the main workspace view
  const handleSelectFolder = (id: string) => {
    setCurrentFolderId(id);
    setIsMobileSidebarOpen(false);
  };

  const handleOpenFile = (file: FileNode) => {
    setSelectedFile(file);
    // setEditorContent(file.content || "");
  };

  //Get current folder
  const activeFolder = findNodeById(fileTree, currentFolderId) || fileTree[0];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800  overflow-hidden">
      {/* navbar */}
      <Navbar
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden relative">
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-10 md:hidden"
          />
        )}

        {/* left sidebar Item */}
        <aside
          className={`
    fixed md:static top-0 bottom-0 left-0 z-20
    w-64 bg-white border-r border-slate-200 
    flex flex-col overflow-y-auto p-4 gap-2
    transform transition-transform duration-700 ease-in-out
    ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
        >
          <div className="flex items-center justify-between md:block mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              File Tree Directory
            </p>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-sm md:hidden p-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            {fileTree.map((rootNode) => (
              <SidebarItem
                key={rootNode.id}
                node={rootNode}
                currentFolderId={currentFolderId}
                onSelectFolder={(id) => {
                  setCurrentFolderId(id);
                  setIsMobileSidebarOpen(false);
                }}
              />
            ))}
          </div>
        </aside>

        {/* main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeFolder.children?.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  item.type === "folder"
                    ? setCurrentFolderId(item.id)
                    : handleOpenFile(item)
                }
                className="group relative flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-200 transition-all cursor-pointer text-center select-none"
              >
                <span className="text-4xl mb-2">
                  {item.type === "folder" ? <Folder /> : <File />}
                </span>
                <span
                  className="text-xs font-semibold text-slate-700  w-full px-2"
                  title={item.name}
                >
                  {item.name}
                </span>

                <div
                  className="absolute top-2 right-2 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()} // Keeps management taps separate from row navigation
                >
                  <button
                    // onClick={() => handleRenameItem(item.id, item.name)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded text-xs transition border border-slate-200"
                    title="Rename"
                  >
                    <Pencil />{" "}
                  </button>
                  <button
                    // onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded text-xs transition border border-red-100 text-red-600"
                    title="Delete"
                  >
                    <Trash />
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
        </main>
      </div>
    </div>
  );
}
