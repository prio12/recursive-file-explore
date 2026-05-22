"use client";
import { Navbar } from "@/components/Navbar";
import { FileNode } from "@/types/types";
import { useEffect, useState } from "react";
import { initialFileSystem } from "../mockData";
import { SidebarItem } from "@/components/SidebarItem";
import { findNodeById } from "@/utils/fileUtils";

export default function Home() {
  // Initializing the file tree state with injected dummy data
  const [fileTree, setFileTree] = useState<FileNode[]>(initialFileSystem);

  // Ensures client-only code/localStorage runs only after the initial mount
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Tracks the active folder ID, starting at "root" from dummy data and updating based on user clicks
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");

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
      <div>
        {fileTree?.map((rootNode) => (
          <SidebarItem
            key={rootNode?.id}
            node={rootNode}
            currentFolderId={currentFolderId}
            onSelectFolder={handleSelectFolder}
          />
        ))}
      </div>
    </div>
  );
}
