"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Chat, Profile } from "@/lib/types";
import { useSelectedLayoutSegments } from "next/navigation";
import { FC } from "react";

interface ChatLayoutClientProps {
  chats: Chat[];
  profile: Profile | null;
}

export const ChatLayoutClient: FC<ChatLayoutClientProps> = ({
  chats,
  profile,
}) => {
  const segments = useSelectedLayoutSegments();

  const currentChatId =
    segments[0] === "chat" && segments[1] ? segments[1] : undefined;

  return (
    <AppSidebar
      chats={chats}
      currentChatId={currentChatId}
      currentTitle={undefined}
      profile={profile}
    />
  );
};
