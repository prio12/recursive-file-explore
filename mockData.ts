import { FileNode } from "./types/types";


//injecting mockData , so the app doesn't feel empty for a new user when the app renders for the very 
// first time according to the FileNode interface
export const initialFileSystem: FileNode[] = [
  {
    id: 'root',
    name: 'Main Workspace',
    type: 'folder',
    children: [
      {
        id: 'docs-folder',
        name: 'Documents',
        type: 'folder',
        children: [
          {
            id: 'file-ideas',
            name: 'ideas.txt',
            type: 'file',
            content: '1. Learn recursive component design\n2. Master hierarchical state manipulation.'
          },
          {
            id: 'file-notes',
            name: 'project_notes.txt',
            type: 'file',
            content: 'Webbly Media evaluation assignment notes.'
          }
        ]
      },
      {
        id: 'projects-folder',
        name: 'App_Development',
        type: 'folder',
        children: [
          {
            id: 'sub-ui-folder',
            name: 'UI_Components',
            type: 'folder',
            children: []
          }
        ]
      },
      {
        id: 'file-todo',
        name: 'global_todo.txt',
        type: 'file',
        content: '- Build Sidebar Tree\n- Connect Main Panel Click Handlers\n- Add Text Editor Panel'
      }
    ]
  }
];