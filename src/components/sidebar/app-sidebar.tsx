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
import { AppSidebarHeader } from "./sidebar-header";
import { NavChatsWrapper } from "./nav-chats-wrapper";
import { NavUserWrapper } from "./nav-user-wrapper";

interface AppSidebarProps {
  chatsPromise: Promise<Chat[]>;
  currentChatId?: string;
  currentTitle?: string;
  profilePromise: Promise<Profile | null>;
}

export const AppSidebar: FC<AppSidebarProps> = ({
  chatsPromise,
  currentChatId,
  currentTitle,
  profilePromise,
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

        <NavChatsWrapper
          chatsPromise={chatsPromise}
          currentChatId={currentChatId}
          currentTitle={currentTitle}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUserWrapper
          profilePromise={profilePromise}
          chatsPromise={chatsPromise}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
