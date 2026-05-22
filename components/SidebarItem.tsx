import { FileNode } from "@/types/types";

interface SidebarItemProps {
  node: FileNode;
  currentFolderId: string;
  onSelectFolder: (id: string) => void;
  //   depth?: number;
}

export const SidebarItem = ({
  node,
  currentFolderId,
  onSelectFolder,
}: SidebarItemProps) => {
  const isFolder = node.type === "folder";

  // Handle clicking a line item row
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      onSelectFolder(node.id);
      // Toggle expand/collapse when clicking the row
      //   setIsOpen(!isOpen);
    }
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className={`cursor-pointer text-sm ${
          currentFolderId === node.id ? "text-blue-600 font-bold" : ""
        }`}
      >
        {isFolder ? "📁" : "📄"} {node.name}
      </div>

      {isFolder &&
        node.children?.map((child) => (
          <SidebarItem
            key={child.id}
            node={child}
            currentFolderId={currentFolderId}
            onSelectFolder={onSelectFolder}
          />
        ))}
    </div>
  );
};
