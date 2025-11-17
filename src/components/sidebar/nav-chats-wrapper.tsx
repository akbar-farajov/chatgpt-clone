"use client";

import { usePathname } from "next/navigation";
import { NavChats } from "./nav-chats";
import { NavChatsSkeleton } from "./nav-chats-skeleton";
import { useChats } from "@/hooks/use-chats";

interface NavChatsWrapperProps {
  currentTitle?: string;
}

export function NavChatsWrapper({ currentTitle }: NavChatsWrapperProps) {
  const pathname = usePathname();
  const currentChatId = pathname.split("/").pop();
  const { chats, isLoading } = useChats();

  if (isLoading) {
    return <NavChatsSkeleton />;
  }

  return (
    <NavChats
      chats={chats}
      currentChatId={currentChatId}
      currentTitle={currentTitle}
    />
  );
}
