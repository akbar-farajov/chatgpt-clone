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
import { MoreHorizontal, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { Chat } from "@/lib/types";
import { FC, useTransition, useState } from "react";
import { ChatDeleteModal } from "./chat-delete-modal";
import { Input } from "../ui/input";
import { updateChat } from "@/actions/chat";

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
  const [deleteChatId, setDeleteChatId] = useState<string | null>(null);
  const [renameChatId, setRenameChatId] = useState<string | null>(null);
  const [renameChat, setRenameChat] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSaveRename = async (chatId: string) => {
    startTransition(async () => {
      await updateChat(chatId, { title: renameChat });
      setRenameChatId(null);
      setRenameChat("");
    });
  };

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
            {renameChatId === chat.id ? (
              <Input
                className="p-2"
                type="text"
                value={renameChat || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRenameChat(e.target.value)
                }
                disabled={isPending}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSaveRename(chat.id);
                  }
                }}
                onBlur={() => handleSaveRename(chat.id)}
              />
            ) : (
              <Link href={`/chat/${chat.id}`} className="w-full">
                <SidebarMenuButton
                  className="justify-between w-full"
                  isActive={currentChatId === chat.id}
                >
                  <span className="text-sm truncate">{displayTitle}</span>
                </SidebarMenuButton>
              </Link>
            )}

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
                <DropdownMenuItem
                  onSelect={() => {
                    setRenameChatId(chat.id);
                    setRenameChat(displayTitle);
                  }}
                >
                  <PencilIcon className="text-muted-foreground" />
                  <span>Rename</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setDeleteChatId(chat.id)}>
                  <Trash2 className="text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        );
      })}
      <ChatDeleteModal
        open={deleteChatId !== null}
        onOpenChange={(open) => !open && setDeleteChatId(null)}
        chatId={deleteChatId || ""}
        currentChatId={currentChatId}
      />
    </SidebarGroup>
  );
};
