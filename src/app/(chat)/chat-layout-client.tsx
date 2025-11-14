"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Chat, Profile } from "@/lib/types";
import { useSelectedLayoutSegments } from "next/navigation";
import { FC } from "react";

interface ChatLayoutClientProps {
  chatsPromise: Promise<Chat[]>;
  profilePromise: Promise<Profile | null>;
}

export const ChatLayoutClient: FC<ChatLayoutClientProps> = ({
  chatsPromise,
  profilePromise,
}) => {
  const segments = useSelectedLayoutSegments();

  const currentChatId =
    segments[0] === "chat" && segments[1] ? segments[1] : undefined;

  return (
    <AppSidebar
      chatsPromise={chatsPromise}
      currentChatId={currentChatId}
      currentTitle={undefined}
      profilePromise={profilePromise}
    />
  );
};
