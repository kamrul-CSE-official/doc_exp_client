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
} from "@/state/features/workspace/workspaceSlice";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export function NavMain({
  items,
}: {
  items: {
    id: string;
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
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

  return (
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
              <span>{item.title}</span>

              <div className="w-full flex items-center justify-end gap-1">
                <Button
                  className="hidden group-hover:block cursor-pointer"
                  variant="ghost"
                  size="icon"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                {item.items && item.items.length > 0 && (
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-data-open/collapsible:rotate-90"
                  />
                )}
              </div>
            </CollapsibleTrigger>
            {item.items && item.items.length > 0 && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.id}>
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
                            subItem.type === "file" ? File01Icon : Folder01Icon
                          }
                          className="mr-1.5 h-3.5 w-3.5"
                        />
                        <span>{subItem.title}</span>
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
  );
}
