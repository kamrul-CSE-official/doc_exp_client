"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Folder01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  selectFolder,
  toggleFolderExpand,
  startEditingFile,
  selectCurrentFolderId,
  deleteItem,
  updateItem,
} from "@/state/features/workspace/workspaceSlice";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NavMain({
  items,
}: {
  items: {
    id: string;
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    type?: "folder" | "file";
    items?: {
      id: string;
      title: string;
      url: string;
      type?: "folder" | "file";
    }[];
  }[];
}) {
  const dispatch = useAppDispatch();
  const currentFolderId = useAppSelector(selectCurrentFolderId);

  // Edit State
  const [editingItem, setEditingItem] = React.useState<{
    id: string;
    title: string;
  } | null>(null);
  const [newTitle, setNewTitle] = React.useState("");

  // Delete Action Handler
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id));
    }
  };

  // Edit Modal Open Handler
  const handleOpenEdit = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    setEditingItem({ id, title });
    setNewTitle(title);
  };

  // Update Action Handler
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && newTitle.trim()) {
      dispatch(
        updateItem({
          id: editingItem.id,
          name: newTitle.trim(),
        }),
      );
      setEditingItem(null);
      setNewTitle("");
    }
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.id}
              open={item.isActive}
              onOpenChange={() => dispatch(toggleFolderExpand(item.id))}
              className="group/collapsible group"
              render={<SidebarMenuItem />}
            >
              <div className="flex items-center w-full">
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={currentFolderId === item.id}
                      onClick={() => dispatch(selectFolder(item.id))}
                    />
                  }
                >
                  {item.icon}
                  <span className="truncate">{item.title}</span>

                  <div className="ml-auto flex items-center gap-1">
                    {/* Action Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-3.5 w-3.5 text-slate-500" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={(e) =>
                            handleOpenEdit(e, item.id, item.title)
                          }
                          className="gap-2 cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-blue-500" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleDelete(e, item.id)}
                          className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {item.items && item.items.length > 0 && (
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-data-open/collapsible:rotate-90"
                      />
                    )}
                  </div>
                </CollapsibleTrigger>
              </div>

              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.id}
                        className="group/sub"
                      >
                        <SidebarMenuSubButton
                          isActive={currentFolderId === subItem.id}
                          onClick={() => {
                            if (subItem.type === "file") {
                              dispatch(startEditingFile(subItem.id));
                            } else {
                              dispatch(selectFolder(subItem.id));
                            }
                          }}
                        >
                          <HugeiconsIcon
                            icon={
                              subItem.type === "file"
                                ? File01Icon
                                : Folder01Icon
                            }
                            className="mr-1.5 h-3.5 w-3.5 shrink-0"
                          />
                          <span className="truncate">{subItem.title}</span>

                          {/* Sub Item Action Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-auto h-5 w-5 p-0 opacity-0 group-hover/sub:opacity-100 transition-opacity cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-3 w-3 text-slate-500" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end" className="w-32">
                              <DropdownMenuItem
                                onClick={(e) =>
                                  handleOpenEdit(e, subItem.id, subItem.title)
                                }
                                className="gap-2 cursor-pointer"
                              >
                                <Edit2 className="h-3.5 w-3.5 text-blue-500" />
                                <span>Rename</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => handleDelete(e, subItem.id)}
                                className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Edit / Rename Dialog */}
      <Dialog
        open={editingItem !== null}
        onOpenChange={(open) => {
          if (!open) setEditingItem(null);
        }}
      >
        <DialogContent className="sm:max-w-[400px]">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Rename Item</DialogTitle>
            </DialogHeader>

            <div className="py-4 space-y-2">
              <Label htmlFor="rename">Name</Label>
              <Input
                id="rename"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new name"
                autoFocus
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
