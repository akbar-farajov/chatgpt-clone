"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Chat, Profile } from "@/lib/types";
import { useSelectedLayoutSegments } from "next/navigation";
import { FC } from "react";

interface DashboardLayoutClientProps {
  chatsPromise: Promise<Chat[]>;
  profilePromise: Promise<Profile | null>;
}

export const DashboardLayoutClient: FC<DashboardLayoutClientProps> = ({
  chatsPromise,
  profilePromise,
}) => {
  const segments = useSelectedLayoutSegments();

  const currentChatId =
    segments[1] === "chat" && segments[2] ? segments[2] : undefined;

  return (
    <AppSidebar
      chatsPromise={chatsPromise}
      currentChatId={currentChatId}
      currentTitle={undefined}
      profilePromise={profilePromise}
    />
  );
};
