import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { Chat } from "@/lib/types";
import { FC, useState } from "react";
import { ChatDeleteModal } from "./chat-delete-modal";

interface NavChatsProps {
  chats: Chat[];
  currentChatId?: string;
  currentTitle?: string;
}

export const NavChats: FC<NavChatsProps> = ({
  chats,
  currentChatId,
  currentTitle,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
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
              </SidebarMenuButton>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side="right"
                align="start"
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>Rename</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setDeleteModalOpen(true)}>
                  <Trash2 className="text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ChatDeleteModal
              open={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
              chatId={chat.id}
            />
          </SidebarMenuItem>
        );
      })}
    </SidebarGroup>
  );
};
