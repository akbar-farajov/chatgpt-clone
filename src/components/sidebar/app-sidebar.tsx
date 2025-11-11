"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { Chat, Profile } from "@/lib/types";
import { FC } from "react";
import { NewChatButton } from "./new-chat-button";
import { NavUser } from "./nav-user";
import { AppSidebarHeader } from "./sidebar-header";
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
