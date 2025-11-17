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
import type { Profile } from "@/lib/types";
import { FC } from "react";
import { NewChatButton } from "./new-chat-button";
import { AppSidebarHeader } from "./sidebar-header";
import { NavChatsWrapper } from "./nav-chats-wrapper";
import { NavUserWrapper } from "./nav-user-wrapper";

interface AppSidebarProps {
  currentTitle?: string;
  profilePromise: Promise<Profile | null>;
}

export const AppSidebar: FC<AppSidebarProps> = ({
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

        <NavChatsWrapper currentTitle={currentTitle} />
      </SidebarContent>
      <SidebarFooter>
        <NavUserWrapper profilePromise={profilePromise} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
