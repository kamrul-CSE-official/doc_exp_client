"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LayoutBottomIcon,
  AudioWave01Icon,
  CommandIcon,
  CropIcon,
  PieChartIcon,
  MapsIcon,
  Folder01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { useAppSelector } from "@/state/hooks";
import { selectFolderTree } from "@/state/features/workspace/workspaceSlice";

type FolderTreeItem = {
  id: string;
  name: string;
  type: string;
  isExpanded: boolean;
  children?: FolderTreeItem[];
};

// Static sample data for Teams, Projects, and User
const data = {
  user: {
    name: "MD.Kamrul Hasan",
    email: "kamrul24.official@gmail.com",
    avatar: "/assets/images/Md.Kamrul PP.gif",
  },
  teams: [
    {
      name: "Doc Exp",
      logo: <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} />,
      plan: "Workspace",
    },
    {
      name: "Acme Corp.",
      logo: <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={2} />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <HugeiconsIcon icon={CropIcon} strokeWidth={2} />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <HugeiconsIcon icon={PieChartIcon} strokeWidth={2} />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <HugeiconsIcon icon={MapsIcon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const folderTree = useAppSelector(selectFolderTree);

  const dynamicNavItems = React.useMemo(() => {
    return folderTree.map(
      (item: {
        id: string;
        name: string;
        type: string;
        isExpanded: boolean;
        children?: FolderTreeItem[];
      }) => ({
        id: item.id,
        title: item.name,
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={item.type === "folder" ? Folder01Icon : File01Icon}
            strokeWidth={2}
          />
        ),
        isActive: item.isExpanded,
        items: item.children?.map(
          (child: { id: string; name: string; type: string }) => ({
            id: child.id,
            title: child.name,
            url: "#",
            type: child.type,
          }),
        ),
      }),
    );
  }, [folderTree]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            dynamicNavItems as React.ComponentProps<typeof NavMain>["items"]
          }
        />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
