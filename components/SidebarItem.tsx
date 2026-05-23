"use client";

import { FileNode } from "@/types/types";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  FolderOpen,
} from "lucide-react";

interface SidebarItemProps {
  node: FileNode;
  currentFolderId: string;
  onSelectFolder: (id: string) => void;
  depth?: number; // Tracks nesting depth to calculate indentation (calculates the paddingLeft)
}

export default function SidebarItem({
  node,
  currentFolderId,
  onSelectFolder,
  depth = 0,
}: SidebarItemProps) {
  //local state to keep track if the folder is open or close
  const [isOpen, setIsOpen] = useState<boolean>(depth === 0); // Keep root open by default for better UI

  const isFolder = node.type === "folder";
  const isActive = currentFolderId === node.id;

  // Handle clicking a line item row
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      //to set current folderId
      onSelectFolder(node.id);
      // Toggle between open or close for a specific folder when clicking
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col w-full select-none">
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 12 + 8}px` }} // Dynamic progressive indentation
        className={`
          flex items-center gap-2 py-1.5 pr-2 rounded-md text-xs font-medium cursor-pointer transition-colors
          ${
            isActive
              ? "bg-blue-50 text-blue-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }
        `}
      >
        {/* Expand/Collapse Custom Indicator */}
        {isFolder ? (
          <span className="text-[10px] text-slate-400 w-4 text-center font-bold">
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500 mr-1 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500 mr-1 shrink-0" />
            )}
          </span>
        ) : (
          <span className="w-4" />
        )}

        <span className="text-sm mr-2 shrink-0">
          {isFolder ? (
            isOpen ? (
              <FolderOpen className="w-4 h-4 text-blue-500 fill-blue-500/10" />
            ) : (
              <Folder className="w-4 h-4 " />
            )
          ) : (
            <File className="w-4 h-4 text-slate-500" />
          )}
        </span>
        <span>{node.name}</span>
      </div>

      {/* if it's a folder & it's Open and it has children use React recursive component loop to 
      render it's children and in that case each children will get 0 + 1 depth to dynamically
      Indented */}
      {isFolder && isOpen && node.children && (
        <div className="flex flex-col w-full mt-0.5">
          {node.children.map((child) => (
            <SidebarItem
              key={child.id}
              node={child}
              currentFolderId={currentFolderId}
              onSelectFolder={onSelectFolder}
              depth={depth + 1} // Increment the depth level for padding calculations
            />
          ))}
        </div>
      )}
    </div>
  );
}
