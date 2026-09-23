import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
export interface WorkspaceItem {
  id: string;
  name: string;
  type: "folder" | "file";
  parentId: string | null;
  content?: string;
  createdAt: number;
  updatedAt: number;
}

export interface WorkspaceState {
  items: WorkspaceItem[];
  currentFolderId: string | null;
  editingFileId: string | null;
  editingFileContent: string;
  searchQuery: string;
  searchResults: WorkspaceItem[];
  expandedFolderIds: string[];
}

// Initial State
const initialState: WorkspaceState = {
  items: [
    {
      id: "root-1",
      name: "Projects",
      type: "folder",
      parentId: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "root-2",
      name: "Documents",
      type: "folder",
      parentId: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  currentFolderId: null,
  editingFileId: null,
  editingFileContent: "",
  searchQuery: "",
  searchResults: [],
  expandedFolderIds: ["root-1"],
};

// Helper Functions
const generateId = (): string => {
  return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const findItemById = (
  items: WorkspaceItem[],
  id: string,
): WorkspaceItem | undefined => {
  return items.find((item) => item.id === id);
};

const findChildrenRecursive = (
  items: WorkspaceItem[],
  parentId: string | null,
): WorkspaceItem[] => {
  const children = items.filter((item) => item.parentId === parentId);
  const allChildren: WorkspaceItem[] = [...children];

  children.forEach((child) => {
    if (child.type === "folder") {
      allChildren.push(...findChildrenRecursive(items, child.id));
    }
  });

  return allChildren;
};

const getItemsInFolder = (
  items: WorkspaceItem[],
  folderId: string | null,
): WorkspaceItem[] => {
  return items.filter((item) => item.parentId === folderId);
};

const validateItemName = (
  items: WorkspaceItem[],
  name: string,
  parentId: string | null,
  excludeId?: string,
): boolean => {
  if (!name || name.trim().length === 0) return false;

  const isDuplicate = items.some(
    (item) =>
      item.parentId === parentId &&
      item.name.toLowerCase() === name.toLowerCase() &&
      item.id !== excludeId,
  );

  return !isDuplicate;
};

const getParentPath = (
  items: WorkspaceItem[],
  folderId: string | null,
): WorkspaceItem[] => {
  if (!folderId) return [];

  const item = findItemById(items, folderId);
  if (!item) return [];

  if (item.parentId === null) {
    return [item];
  }

  return [...getParentPath(items, item.parentId), item];
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    // CREATE
    createItem: (
      state,
      action: PayloadAction<{
        name: string;
        type: "folder" | "file";
        parentId: string | null;
      }>,
    ) => {
      const { name, type, parentId } = action.payload;

      if (!validateItemName(state.items, name, parentId)) {
        console.error("Invalid item name or duplicate in parent folder");
        return;
      }

      const newItem: WorkspaceItem = {
        id: generateId(),
        name: name.trim(),
        type,
        parentId,
        content: type === "file" ? "" : undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      state.items.push(newItem);
    },

    // RENAME
    renameItem: (
      state,
      action: PayloadAction<{
        itemId: string;
        newName: string;
      }>,
    ) => {
      const { itemId, newName } = action.payload;
      const item = findItemById(state.items, itemId);

      if (!item) return;

      if (!validateItemName(state.items, newName, item.parentId, itemId)) {
        console.error("Invalid name or duplicate in parent folder");
        return;
      }

      item.name = newName.trim();
      item.updatedAt = Date.now();
    },

    // UPDATE CONTENT
    updateFileContent: (
      state,
      action: PayloadAction<{
        fileId: string;
        content: string;
      }>,
    ) => {
      const { fileId, content } = action.payload;
      const file = findItemById(state.items, fileId);

      if (!file || file.type !== "file") return;

      file.content = content;
      file.updatedAt = Date.now();
    },

    // DELETE
    deleteItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = findItemById(state.items, itemId);

      if (!item) return;

      if (item.type === "folder") {
        const childrenToDelete = findChildrenRecursive(state.items, itemId);
        const childIds = new Set(childrenToDelete.map((child) => child.id));
        childIds.add(itemId);

        if (state.currentFolderId && childIds.has(state.currentFolderId)) {
          state.currentFolderId = item.parentId;
        }

        state.items = state.items.filter((i) => !childIds.has(i.id));
      } else {
        state.items = state.items.filter((i) => i.id !== itemId);

        if (state.editingFileId === itemId) {
          state.editingFileId = null;
          state.editingFileContent = "";
        }
      }
    },

    // Update / Rename Item Reducer
    updateItem: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const { id, name } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.name = name;
      }
    },

    // SELECTION & TOGGLE
    selectFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
    },

    toggleFolderExpand: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      const index = state.expandedFolderIds.indexOf(folderId);

      if (index > -1) {
        state.expandedFolderIds.splice(index, 1);
      } else {
        state.expandedFolderIds.push(folderId);
      }
    },

    // EDITING
    startEditingFile: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      const file = findItemById(state.items, fileId);

      if (!file || file.type !== "file") return;

      state.editingFileId = fileId;
      state.editingFileContent = file.content || "";
    },

    updateEditingContent: (state, action: PayloadAction<string>) => {
      state.editingFileContent = action.payload;
    },

    stopEditingFile: (state) => {
      if (state.editingFileId) {
        const file = findItemById(state.items, state.editingFileId);
        if (file) {
          file.content = state.editingFileContent;
          file.updatedAt = Date.now();
        }
      }

      state.editingFileId = null;
      state.editingFileContent = "";
    },

    discardChanges: (state) => {
      state.editingFileId = null;
      state.editingFileContent = "";
    },

    // SEARCH
    searchWorkspace: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;

      if (!query.trim()) {
        state.searchResults = [];
        return;
      }

      state.searchResults = state.items.filter((item) =>
        item.name.toLowerCase().includes(query),
      );
    },

    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
    },

    // RESET ALL
    resetWorkspace: (state) => {
      state.items = initialState.items;
      state.currentFolderId = null;
      state.editingFileId = null;
      state.editingFileContent = "";
      state.searchQuery = "";
      state.searchResults = [];
      state.expandedFolderIds = ["root-1"];
    },
  },
});

// Selectors
export const selectAllItems = (state: { workspace: WorkspaceState }) =>
  state.workspace.items;

export const selectCurrentFolderId = (state: { workspace: WorkspaceState }) =>
  state.workspace.currentFolderId;

export const selectCurrentFolderContents = (state: {
  workspace: WorkspaceState;
}) => {
  const items = state.workspace.items;
  const folderId = state.workspace.currentFolderId;
  return getItemsInFolder(items, folderId);
};

export const selectCurrentFolderPath = (state: {
  workspace: WorkspaceState;
}) => {
  const items = state.workspace.items;
  const folderId = state.workspace.currentFolderId;
  return getParentPath(items, folderId);
};

export const selectEditingFile = (state: { workspace: WorkspaceState }) => {
  const file = findItemById(
    state.workspace.items,
    state.workspace.editingFileId || "",
  );
  return {
    file,
    content: state.workspace.editingFileContent,
  };
};

export const selectSearchResults = (state: { workspace: WorkspaceState }) =>
  state.workspace.searchResults;

export const selectFolderTree = (state: { workspace: WorkspaceState }) => {
  const items = state.workspace.items;
  const expandedIds = state.workspace.expandedFolderIds;

  return items
    .filter((item) => item.parentId === null)
    .map((rootItem) => buildFolderTree(rootItem, items, expandedIds));
};

export interface TreeItem extends WorkspaceItem {
  isExpanded: boolean;
  children: TreeItem[];
}
function buildFolderTree(
  item: WorkspaceItem,
  allItems: WorkspaceItem[],
  expandedIds: string[],
): TreeItem {
  const children = allItems.filter((i) => i.parentId === item.id);

  return {
    ...item,
    isExpanded: expandedIds.includes(item.id),
    children: children.map((child) =>
      buildFolderTree(child, allItems, expandedIds),
    ),
  };
}

export const selectFolderPath = (state: RootState) => {
  const items = state.workspace.items;
  const currentId = state.workspace.currentFolderId;

  if (!currentId) return [];

  const path = [];
  let currentItem = items.find((item) => item.id === currentId);

  while (currentItem) {
    path.unshift({ id: currentItem.id, name: currentItem.name });
    currentItem = items.find((item) => item.id === currentItem?.parentId);
  }

  return path;
};

export const {
  createItem,
  renameItem,
  updateFileContent,
  deleteItem,
  updateItem,
  selectFolder,
  toggleFolderExpand,
  startEditingFile,
  updateEditingContent,
  stopEditingFile,
  discardChanges,
  searchWorkspace,
  clearSearch,
  resetWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
