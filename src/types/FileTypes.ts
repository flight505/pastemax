export interface FileData {
  name: string;
  path: string;
  content: string;
  tokenCount: number;
  size: number;
  isBinary: boolean;
  isSkipped: boolean;
  error?: string;
  fileType?: string;
  type?: "file" | "directory";
  excludedByDefault?: boolean;
  lastModified?: number;
  isAppDirectory?: boolean;
  excluded?: boolean;
}

export interface TreeNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  children?: TreeNode[];
  isExpanded?: boolean;
  isSelected?: boolean;
  depth: number;
  parentId?: string;
  fileData?: FileData;
}

export interface SidebarProps {
  selectedFolder: string | null;
  openFolder: () => void;
  allFiles: FileData[];
  selectedFiles: string[];
  toggleFileSelection: (filePath: string) => void;
  toggleFolderSelection: (folderPath: string, isSelected: boolean) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectAllFiles: () => void;
  deselectAllFiles: () => void;
  expandedNodes: Map<string, boolean>;
  toggleExpanded: (nodeId: string) => void;
}

export interface FileListProps {
  files: FileData[];
  selectedFiles: string[];
  toggleFileSelection: (filePath: string) => void;
}

export interface FileCardProps {
  file: FileData;
  isSelected: boolean;
  toggleSelection: (filePath: string) => void;
}

export interface TreeItemProps {
  node: TreeNode;
  selectedFiles: string[];
  toggleFileSelection: (filePath: string) => void;
  toggleFolderSelection: (folderPath: string, isSelected: boolean) => void;
  toggleExpanded: (nodeId: string) => void;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export type FileTreeMode = "none" | "selected" | "selected-with-roots" | "complete";

// Add SortOrder type for file tree sorting
export type SortOrder = "name-asc" | "name-desc" | "ext-asc" | "ext-desc" | "date-newest";

// Add IgnorePattern interface for ignore patterns feature
export interface IgnorePattern {
  pattern: string;
  isGlobal: boolean;
}
