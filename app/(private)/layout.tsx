"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Search, Plus, File, Folder, FileText, Home } from "lucide-react";
import ThemeToggleBtn from "@/components/share/themeToggle";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Redux Imports
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  createItem,
  selectCurrentFolderId,
  searchWorkspace,
  selectSearchResults,
  clearSearch,
  selectFolder,
  startEditingFile,
  selectFolderPath,
} from "@/state/features/workspace/workspaceSlice";

type CreateType = "File" | "Folder" | null;

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [createType, setCreateType] = React.useState<CreateType>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const folderPath = useAppSelector(selectFolderPath) || [];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setCreateType(null);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-slate-50/50 dark:bg-slate-950/50 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          {/* Left Header Section */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg p-2 transition-colors" />

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-slate-200 dark:bg-slate-800"
            />

            {/* Dynamic Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                {/* Root / Home Item */}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => dispatch(selectFolder(null))}
                    className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Home className="h-3.5 w-3.5" />
                    <span>Workspace</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {/* Dynamic Path Items */}
                {folderPath.map(
                  (item: { id: string; name: string }, index: number) => {
                    const isLast = index === folderPath.length - 1;

                    return (
                      <React.Fragment key={item.id}>
                        <BreadcrumbSeparator className="text-slate-400" />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="text-slate-900 dark:text-slate-100 font-semibold text-sm">
                              {item.name}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              onClick={() => dispatch(selectFolder(item.id))}
                              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 text-sm font-medium transition-colors cursor-pointer"
                            >
                              {item.name}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  },
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right Header Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              <span>Search files & folders...</span>
              <kbd className="ml-3 rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggleBtn />

            {/* Create Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="inline-flex items-center gap-1.5 h-8 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 text-xs font-medium shadow-sm transition-all active:scale-95 cursor-pointer">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Create</span>
                  </button>
                }
              />

              <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={6}
                className="w-48"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Create Content
                  </DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={() => setCreateType("File")}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <File className="h-3.5 w-3.5" />
                    </div>
                    <span>File</span>
                    <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setCreateType("Folder")}
                    className="gap-2 p-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <Folder className="h-3.5 w-3.5" />
                    </div>
                    <span>Folder</span>
                    <DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Workspace Main Content */}
        <main className="flex flex-1 flex-col p-2 md:p-3 space-y-2">
          <div className="flex-1 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 p-4 md:p-6 shadow-sm backdrop-blur-sm min-h-[calc(100vh-6rem)]">
            {children}
          </div>
        </main>
      </SidebarInset>

      {/* Create Dialog Component */}
      <CreateDialog
        type={createType}
        open={createType !== null}
        onOpenChange={handleDialogChange}
      />

      {/* Search Dialog Component */}
      <SearchDialog
        open={isSearchOpen}
        onOpenChange={(open) => setIsSearchOpen(open)}
      />
    </SidebarProvider>
  );
}

/* =========================================================
   Create Dialog Component (Redux Integrated)
========================================================= */

interface CreateDialogProps {
  type: CreateType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateDialog({ type, open, onOpenChange }: CreateDialogProps) {
  const dispatch = useAppDispatch();
  const currentFolderId = useAppSelector(selectCurrentFolderId);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  if (!type) return null;

  const isFile = type === "File";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    dispatch(
      createItem({
        name: name.trim(),
        type: isFile ? "file" : "folder",
        parentId: currentFolderId,
      }),
    );

    setName("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New {type}</DialogTitle>
            <DialogDescription>
              {isFile
                ? "Create a new text file in the current folder."
                : "Create a new folder in the current workspace."}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">
                {isFile ? "File Name" : "Folder Name"}
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder={isFile ? "e.g., notes.txt" : "e.g., New Folder"}
                autoFocus
              />
              {error && (
                <span className="text-xs text-red-500 mt-1">{error}</span>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setName("");
                setError("");
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create {type}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================
   Search Dialog Component (Redux Integrated)
========================================================= */

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const [query, setQuery] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    dispatch(searchWorkspace(val));
  };

  interface SearchResultItem {
    id: string;
    name: string;
    type: "file" | "folder";
  }

  const handleSelectItem = (item: SearchResultItem) => {
    if (item.type === "folder") {
      dispatch(selectFolder(item.id));
    } else {
      dispatch(startEditingFile(item.id));
    }
    dispatch(clearSearch());
    setQuery("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(clearSearch());
          setQuery("");
        }
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <div className="flex items-center border-b px-3 dark:border-slate-800">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search all files and folders..."
            value={query}
            onChange={handleSearchChange}
            autoFocus
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {query.trim() !== "" && searchResults.length === 0 && (
            <p className="p-4 text-center text-sm text-slate-500">
              No results found.
            </p>
          )}

          {searchResults.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              {item.type === "folder" ? (
                <Folder className="h-4 w-4 text-blue-500" />
              ) : (
                <FileText className="h-4 w-4 text-emerald-500" />
              )}
              <div className="flex flex-col">
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {item.name}
                </span>
                <span className="text-xs text-slate-400 capitalize">
                  {item.type}
                </span>
              </div>
            </div>
          ))}

          {query.trim() === "" && (
            <p className="p-4 text-center text-xs text-slate-400">
              Type something to search across your workspace...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
