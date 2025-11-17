"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Profile } from "@/lib/types";
import { useSelectedLayoutSegments } from "next/navigation";
import { FC } from "react";

interface DashboardLayoutClientProps {
  profilePromise: Promise<Profile | null>;
}

export const DashboardLayoutClient: FC<DashboardLayoutClientProps> = ({
  profilePromise,
}) => {
  const segments = useSelectedLayoutSegments();

  const currentChatId =
    segments[1] === "chat" && segments[2] ? segments[2] : undefined;

  return (
    <AppSidebar
      currentChatId={currentChatId}
      currentTitle={undefined}
      profilePromise={profilePromise}
    />
  );
};
