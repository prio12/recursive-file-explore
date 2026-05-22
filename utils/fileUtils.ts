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
