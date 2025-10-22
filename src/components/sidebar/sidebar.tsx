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
} from "@/components/ui/sidebar";
import { Chat } from "@/types/chat";
import { FC } from "react";
import Link from "next/link";
import { NewChatButton } from "./new-chat-button";
import { NavUser } from "./nav-user";
interface AppSidebarProps {
  chats: Chat[];
  currentChatId?: string;
  currentTitle?: string;
}

export const AppSidebar: FC<AppSidebarProps> = ({
  chats,
  currentChatId,
  currentTitle,
}) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <NewChatButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>{" "}
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          {chats.map((chat) => {
            const displayTitle =
              currentChatId &&
              chat.id.toString() === currentChatId &&
              currentTitle
                ? currentTitle
                : chat.title || "New Chat";
            return (
              <SidebarMenuItem key={chat.id}>
                <Link href={`/chat/${chat.id}`} className="w-full">
                  <SidebarMenuButton
                    className="justify-between w-full"
                    isActive={currentChatId === chat.id.toString()}
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
