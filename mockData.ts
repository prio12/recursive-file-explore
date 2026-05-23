import { FileNode } from "./types/types";

//injecting mockData , so the app doesn't feel empty for a new user when the app renders for the very
// first time according to the FileNode interface

export const initialFileSystem: FileNode[] = [
  {
    id: "root",
    name: "My_Anime_Vault",
    type: "folder",
    children: [
      {
        id: "docs-folder",
        name: "training_arcs",
        type: "folder",
        children: [
          {
            id: "file-ideas",
            name: "monk_routine.txt",
            type: "file",
            content:
              "1. Push past limits every single single day\n2. Block out social media notifications completely\n3. Code and grind silently until the transformation is undeniable",
          },
          {
            id: "file-notes",
            name: "favorite_tropes.txt",
            type: "file",
            content:
              "Zero-to-hero story arcs where a completely broken, weak character builds an unshakeable mind, undergoes an intense physical transformation, and returns completely unrecognizable.",
          },
        ],
      },
      {
        id: "projects-folder",
        name: "god_speed_mode",
        type: "folder",
        children: [
          {
            id: "sub-ui-folder",
            name: "unlocked_skills",
            type: "folder",
            children: [],
          },
        ],
      },
      {
        id: "file-todo",
        name: "watchlist_hype.txt",
        type: "file",
        content:
          "- Finish watching Solo Leveling rewatch\n- Search for heavy training-focused series on YT\n- Complete this project build like a absolute boss",
      },
    ],
  },
];
