import { FileNode } from "@/types/types";

//Find the active folder
export const findNodeById = (
  nodes: FileNode[],
  id: string,
): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;

    // Run a recursive search if the node has nested children
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

//updating a specific file content recursively
export const updateFileContent = (
  nodes: FileNode[],
  fileId: string,
  content: string,
): FileNode[] => {
  return nodes.map((node) => {
    //if we find the targeted file return the new updated copy
    if (node.id === fileId && node.type === "file") return { ...node, content };

    //if the node has nested children dig dive and find the targeted file recursively
    if (node.children)
      return {
        ...node,
        children: updateFileContent(node.children, fileId, content),
      };
    return node;
  });
};

// find the node path (in which folder/ directory the user is right now)
export const findNodePath = (
  nodes: FileNode[],
  targetId: string,
  path: FileNode[] = [],
): FileNode[] | null => {
  for (const node of nodes) {
    // Build the current path including this node
    const currentPath = [...path, node];

    // If we found the target, return the path array
    if (node.id === targetId) return currentPath;

    // If it's a folder with children, recursively search deeper
    if (node.children) {
      const foundPath = findNodePath(node.children, targetId, currentPath);
      if (foundPath) return foundPath;
    }
  }
  return null;
};
