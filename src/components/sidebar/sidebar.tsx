import {
  Ellipsis,
  LogOutIcon,
  MessageCircleIcon,
  SquarePenIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Chat } from "@/types/chat";
import { FC } from "react";
import Link from "next/link";
import { createChat } from "@/actions/chat";
import { NewChatButton } from "./new-chat-button";
import { NavUser } from "./nav-user";
interface AppSidebarProps {
  chats: Chat[];
}

export const AppSidebar: FC<AppSidebarProps> = ({ chats }) => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NewChatButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <Link href={`/chat/${chat.id}`} className="w-full">
                <SidebarMenuButton className="justify-between w-full">
                  <span>{chat.title}</span>
                  <Ellipsis className="size-4 opacity-0 group-hover/menu-item:opacity-100 transition-opacity" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
