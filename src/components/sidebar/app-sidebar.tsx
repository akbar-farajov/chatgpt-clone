"use client";
import { Ellipsis } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
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
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          {chats.map((chat) => {
            const displayTitle =
              currentChatId && chat.id === currentChatId && currentTitle
                ? currentTitle
                : chat.title || "New Chat";
            return (
              <SidebarMenuItem key={chat.id}>
                <Link href={`/chat/${chat.id}`} className="w-full">
                  <SidebarMenuButton
                    className="justify-between w-full"
                    isActive={currentChatId === chat.id}
                  >
                    <span className="text-sm truncate">{displayTitle}</span>
                    <Ellipsis className="size-4 opacity-0 group-hover/menu-item:opacity-100 transition-opacity" />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
