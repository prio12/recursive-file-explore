"use client";
import { Navbar } from "@/components/Navbar";
import { FileNode } from "@/types/types";
import { useEffect, useState } from "react";
import { initialFileSystem } from "../mockData";
import { findNodeById } from "@/utils/fileUtils";
import SidebarItem from "@/components/SidebarItem";

export default function Home() {
  // Initializing the file tree state with injected dummy data
  const [fileTree, setFileTree] = useState<FileNode[]>(initialFileSystem);

  // Ensures client-only code/localStorage runs only after the initial mount
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Tracks the active folder ID, starting at "root" from dummy data and updating based on user clicks
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

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
    // setIsMobileSidebarOpen(false);
  };

  //Get current folder
  const activeFolder = findNodeById(fileTree, currentFolderId) || fileTree[0];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800  overflow-hidden">
      {/* navbar */}
      <Navbar />
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
          transform transition-transform duration-200 ease-in-out
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
      </div>
    </div>
  );
}
