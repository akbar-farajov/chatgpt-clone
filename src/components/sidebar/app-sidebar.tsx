"use client";
import {
  Ellipsis,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { Chat, Profile } from "@/lib/types";
import { FC, useState } from "react";
import Link from "next/link";
import { NewChatButton } from "./new-chat-button";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { SidebarTrigger } from "../ui/sidebar";
import { AppSidebarHeader } from "./sidebar-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavChats } from "./nav-chats";
interface AppSidebarProps {
  chats: Chat[];
  currentChatId?: string;
  currentTitle?: string;
  profile: Profile | null;
}

export const AppSidebar: FC<AppSidebarProps> = ({
  chats,
  currentChatId,
  currentTitle,
  profile,
}) => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <NewChatButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavChats
          chats={chats}
          currentChatId={currentChatId}
          currentTitle={currentTitle}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
