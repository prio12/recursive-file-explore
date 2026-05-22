export interface FileNode {
    id: string;
    name: string;
    type: "folder" | "file"; // using union to determine that the type might be folder or file , nothing else
    children?: FileNode[] ; // Only folder will use this and it might me used as recursive type to create new children
    content?:string; //Only file will use this    
}